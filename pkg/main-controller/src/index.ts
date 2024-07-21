import { createMachine, assign, fromPromise } from "xstate";

export const machine = createMachine({
  context: {
    stop: false,
    error: null,
    location: null,
  },
  id: "screw_drive_process",
  initial: "idle",
  states: {
    idle: {
      on: {
        start: {
          target: "working",
        },
      },
    },
    working: {
      initial: "reset_all",
      on: {
        stop: {
          target: "working",
          actions: {
            type: "set_stop",
          },
        },
      },
      always: [
        {
          target: "idle",
          actions: {
            type: "clear_stop",
          },
          guard: {
            type: "success",
          },
        },
        {
          target: "error",
        },
      ],
      states: {
        reset_all: {
          type: "parallel",
          initial: "error",
          onDone: [
            {
              target: "parallel_pick_and_convey",
              guard: {
                type: "success",
              },
            },
            {
              target: "parallel_pick_and_convey",
            },
          ],
          entry: {
            type: "clear_error",
          },
          states: {
            error: {
              type: "final",
              entry: {
                type: "set_error",
              },
            },
            reset_robot: {
              invoke: {
                input: {},
                onDone: [
                  {
                    target: "done",
                    guard: {
                      type: "success",
                    },
                  },
                  {
                    target: "error",
                  },
                ],
                src: "wait",
              },
            },
            done: {
              type: "final",
            },
          },
        },
        parallel_pick_and_convey: {
          type: "parallel",
          always: {
            target: "screw_drive",
          },
          entry: {
            type: "clear_error",
          },
          states: {
            convey_item: {
              initial: "cam_locate_screw_hole",
              states: {
                cam_locate_screw_hole: {
                  always: [
                    {
                      target: "start_conveyor",
                      guard: {
                        type: "not_found",
                      },
                    },
                    {
                      target: "screw_hole_located",
                    },
                  ],
                  invoke: {
                    input: {},
                    src: "wait_location",
                  },
                },
                start_conveyor: {
                  always: {
                    target: "cam_wait_till_item",
                  },
                  invoke: {
                    input: {},
                    src: "wait",
                  },
                },
                screw_hole_located: {
                  type: "final",
                },
                cam_wait_till_item: {
                  always: {
                    target: "stop_conveyor",
                  },
                  invoke: {
                    input: {},
                    src: "wait",
                  },
                },
                stop_conveyor: {
                  always: {
                    target: "cam_locate_screw_hole",
                  },
                  invoke: {
                    input: {},
                    src: "wait",
                  },
                },
              },
            },
            pick_screw: {
              initial: "cam_locate_screw",
              states: {
                cam_locate_screw: {
                  always: [
                    {
                      target: "feed_screw",
                      guard: {
                        type: "not_found",
                      },
                    },
                    {
                      target: "pick",
                    },
                  ],
                  invoke: {
                    input: {},
                    src: "wait_location",
                  },
                },
                feed_screw: {
                  always: [
                    {
                      target: "cam_locate_screw",
                      guard: {
                        type: "success",
                      },
                    },
                    {
                      target: "err_need_screws",
                    },
                  ],
                  invoke: {
                    input: {},
                    src: "wait",
                  },
                },
                pick: {
                  always: {
                    target: "screw_picked",
                  },
                  invoke: {
                    input: {},
                    src: "wait",
                  },
                },
                err_need_screws: {
                  type: "final",
                  entry: {
                    type: "set_error",
                  },
                },
                screw_picked: {
                  type: "final",
                },
              },
            },
          },
        },
        screw_drive: {
          always: {
            target: "clean_up",
          },
          invoke: {
            input: {},
            src: "wait",
          },
        },
        clean_up: {
          type: "parallel",
          always: [
            {
              target: "stop_conveyor",
              guard: {
                type: "stop_signal",
              },
            },
            {
              target: "parallel_pick_and_convey",
            },
          ],
          states: {
            reset_robot: {
              always: {
                target: "robot_reseted",
              },
              invoke: {
                input: {},
                src: "wait",
              },
            },
            robot_reseted: {
              type: "final",
            },
            conveyor_move_item_out: {
              always: {
                target: "item_is_out",
              },
              invoke: {
                input: {},
                src: "wait",
              },
            },
            item_is_out: {
              type: "final",
            },
          },
        },
        stop_conveyor: {
          always: {
            target: "stopped",
          },
          invoke: {
            input: {},
            src: "wait",
          },
        },
        stopped: {
          type: "final",
        },
      },
    },
    error: {},
  },
}).withConfig({
  actions: {
    clear_error: assign({
      error: false,
    }),
    set_error: assign({
      error: true,
    }),
    clear_stop: assign({
      stop: false,
    }),
    set_stop: assign({
      stop: true,
    }),
  },
  guards: {
    not_found: function (context, event) {
      // Add your guard code here
      return !context.location;
    },
    success: function (context, event) {
      // Add your guard code here
      return !context.error;
    },
    stop_signal: function (context, event) {
      // Add your guard code here
      return !!context.stop;
    },
  },
  services: {
    wait: fromPromise(async () => {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    }),
    wait_location: fromPromise(async () => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(Math.random() < 0.5 ? null : [1.0, 2.0, 3.0]);
        }, 500),
      );
    }),
  },
});