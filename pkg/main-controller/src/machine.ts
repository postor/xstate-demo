import { createMachine } from 'xstate';

type CtxType = { error_msg: string, stop_signal: boolean }


// Mock fetch functions
const process1_remote_robot = promise_action({
  name: `process1_remote_robot`,
  fail: ctx => ctx.error_msg = 'process1_remote_robot error',
})

const process2_remote_camera = promise_action({
  name: `process2_remote_camera`,
  chance: 0.5,
})

const process3_local = promise_action({
  name: `process1_remote_robot`,
  fail: ctx => ctx.error_msg = 'process3_local error',
})


const process_reset_all = (ctx: CtxType) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        ctx.error_msg = ""
        ctx.stop_signal = false
        resolve('process_reset_all done')
      } else {
        ctx.error_msg = 'process3_local error'
        reject('process_reset_all error')
      };
    }, 1500);
  });
};

// Machine definition
const asyncMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QENYE8B2BjAssrAFgJYZgB0REANmAMSwAuyATgwNoAMAuoqAA4B7WEQZEBGXiAAeiALQAmAJwBGMsvkBWDhwDMADmUAWAGyKA7MoA0INImNm1m7Tp3LFh5WeMBfb9dSYuPjEpGQA7gLMANYkUPQMAnycPEgggsKi4pIyCApaZIqFRcVF1rYIhhyGZIZFWpV6ijoaLb7+6Nh4hCTkEdGxZHwsyFQ0VAD6jMgMYMq0EOLkUzNkAZ3BPeGRMRhQg8OjYBPLs8mS6SJiEqk5xhzyBTpmWl5KOu4aZYiKenpkxk5dBw9Bwim0QGsgt1Qn0dnshswRmNJkwZnMFqETqsOlCQr1tgMEUijijpqdlCl+EJLlkbnYnv8nPojKYzPI9F8EMpQQ8zLUfrUzIoAYoNODIV08Vt+rt9ojDsdUbNBswBFg4LBlONVQAjAQMMhUATICCxeaLCgYABuAii5D4qvVsE12rAAFt9WBtQI9exuOdqZlrqAcoZDJ8bIh3ooyE8xX4ITjJZtYYSDsiTqoHWqNVrdfrDcbTbtaGBmKrmIMqNMAGaRN0qnPOvPuz3e31nVIXIPZOwaVRKYy-eQi97hzkWaraaegjQ6eyGHTipMbGEE2VEhWktGNp2weTjLDIN1l5CFk1mjHkEg2u27jUH5itmaH4+nztUjJXXsIdwPO4GOyTxVPOiicu8qjAnOQ4aGYegeEoy6BMma4yvC6Ykpm97OgeR4noi57FnEZYVlWtb1th+6uh6L54e+-pdoG350lyHAAv8wLqHowGLmYnJ3JBejQUJcEeEuCYSqu+JoXKxKKmSWaOg+r74WeT5GiatAfmkTG0iGiDKMoOgPPyJTFBykYVIoDzxu0yFSdKcJkLAACuWB7uaoQ3ra5CSdC0lOa57kagg3lHkGyTad2zH6bkHBkPIZg6LxplFIuyjGJy3E6GQfJmSUSHrP5jkDEFHkkZEZEMHWzANn5UqprKZUhWF0xXJFDGfjSwbSHIzx-M8WXGMYCW2Ym9nFY18JKc6OjjEaR5UJ517Wj5lFzQtIxRbpPU5EYGhkHozzaK8TTuPYnLcpUhW4im67TU2sAbWqIyluWlV8NW1UUdme7PYt21fnpvUIPBZAaCYQnyIZygGMYi6coYzyHcd2iivOfLiXZRVShVzC0E+sBgH6lI6UDu1yIYQmxoobHQ7Dc73BG5T6H8SPGBo8iLoziXJTdKHkITxOXha3l3vVmxC6Iuyhat4XtdwgPdT+sjcQ4zMGcYOVPPyTx6COfJhvzDlS2aeNVTVdUrsVpsy61EWK51ZPKyxqsmKNiPQwlI4QyoVMtKKZi+AmGACBAcCSBLpABuTKuNNUmicgo8U64USNJfILheD4EnW1KlA0DHLuxbIJgHan+U-Do-EOOoWi6K47ieDn2O3ahcJFz2rtUwlSUpWZhiXey4NCfO7NPMoGha8bk33bJW6Zp3MUg1nZAzuv05WJZ0MjVBzQuG4AL6Fj4043dMmbhmSqKY9eY+vqS-Azk+gHRvG9byzhko-ymdmGxHAQyDrnCaDU56X0wtfSid9fSEViI-CmFQXBrzfjOD+iBajl2eDPUBF8MLyR3L9XM7YCxXngT+RcOUUGoJriNI6P9gJ3FaMAs+7c0zyivgpSiuE3yIjISxYcHFAJqxAnxSyOhdAj2gqCWoHBYZPGwefJy4D8HKkIThFSp5YG7D4bFJo8UAJcR4k8RGR016jxgqJdQigFGsI3Hg7cqiZpUTogRUhjFY4sT0YIwxf9eL8SHJI+c0jaaw0MDYgKbC5IOJvnubhqkyDqSLDokG6gkH2DpsIvxll-ZmOErBeCVjwklSam5PcyScgOCoZvQw8hOS02qHGIpU11rzRelQcpUYPBryaINSyhR4pc0KKYKmXNobWOYW3cgeMOm5CptrWmxgjItA0LTCy5QRnew5lzfe9w+5FNtlAGZpduL-EqBzFonhYJCk5FzP45gtnc3EbzMJwcgA */
  id: 'asyncMachine',
  predictableActionArguments: true,
  context: {
    error_msg: '',
    stop_signal: false
  } as CtxType,
  initial: 'idle',
  states: {
    idle: {
      on: {
        start: "working"
      },
      entry: ctx => (ctx.stop_signal = false)
    },

    working: {
      initial: 'parallel_state1',
      states: {
        parallel_state1: {
          type: 'parallel',

          states: {
            process1_robot: {
              initial: 'loading',
              states: {
                loading: {
                  invoke: {
                    id: 'process1_remote_robot',
                    src: process1_remote_robot,
                    onDone: {
                      target: "done",
                    },
                    onError: {
                      target: "#asyncMachine.error"
                    },
                  },
                },

                done: {
                  type: 'final',
                }
              },
            },

            process2_camera: {
              initial: 'loading',
              states: {
                loading: {
                  invoke: {
                    id: 'process2_remote_camera',
                    src: process2_remote_camera,
                    onDone: {
                      target: "done",
                    },
                    onError: "reload",
                  }
                },

                done: {
                  type: 'final',
                },

                reload: {
                  always: 'loading'
                }
              },
            }
          },
          onDone: [
            {
              target: "process3_local",
              cond: ctx => !ctx.error_msg
            }, {
              target: "#asyncMachine.error"
            }
          ]
        },

        success: {
          invoke: {
            src: ctx => ctx.stop_signal ? Promise.reject(`stop`) : Promise.resolve('repeat'),
            onDone: {
              target: 'parallel_state1'
            },
            onError: {
              target: "#asyncMachine.idle"
            }
          }

        },

        process3_local: {
          invoke: {
            id: 'process3_local',
            src: process3_local,
            onDone: {
              target: "success",
            },
            onError: "#asyncMachine.error",
          },
        }
      },

      on: {
        stop: {
          target: "working",
          internal: true,
          actions: [
            (ctx) => ctx.stop_signal = true
          ]
        }
      }
    },

    error: {
      on: {
        reset: {
          target: "reseting"
        }
      }
    },

    reseting: {
      invoke: {
        src: process_reset_all,
        onDone: {
          target: 'idle'
        },
        onError: {
          target: 'error'
        }
      }
    }
  }
});

export default asyncMachine


function promise_action({ name, sucess, fail, timeout = 1000, chance = 0.9 }: {
  name: string,
  sucess?: (ctx: CtxType) => void | any,
  fail?: (ctx: CtxType) => void | any,
  timeout?: number,
  chance?: number,
}) {
  return (ctx: CtxType) => new Promise((resolve, reject) => {
    console.log(`[${name}] begin chance=${chance} timeout=${timeout}`)
    setTimeout(() => {
      if (Math.random() < chance) {
        sucess && sucess(ctx)
        console.log(`[${name}] sucess`)
        resolve(name)
      } else {
        fail && fail(ctx)
        console.log(`[${name}] fail`)
        reject(name)
      };
    }, timeout);
  });
}