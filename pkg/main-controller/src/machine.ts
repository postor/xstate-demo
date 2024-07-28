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
const overall_workflow = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBuYBOBDANjg+gO7IYDWAZjsoQHQCWEOYAxLAC5YZsDaADALqJQAB2Sw6bOsgB2QkAA9EAWgBMATgCMNDSoCsvXgGYAHBoAsANjUB2DQBoQAT0QXr2vQcOGNasxusWAL6BDmiYuATEZJTUNFGkdNJQrGzIwnyCSCCi4pIycooIqvo0amXlFeUOzghmvGY0ZuX6dcZqhrqdwaHo2HhEJBRUtPGJUDTCnBFgBOxYbGAazBAyYDRzCzRhfZGDMSODYxNTeDP4G4sZcjkSUrJZhRZ1pSoqhrxlemYBKtWI1gEaB4jKZLDYVNZuiBthEBtFhnFDkljjszhctMIMMgAMZwWAafBYgBGyDYNCoWAgY2Wq3o0lQyFIa0xOLxBIwYAAtqSwITkCSeAJrmJbvkHog1CptLw2l59NZDLYjH9asZeI1dMY1SpjCp-LxdFCYf14vtEWQjpNUbMOAsMVjcbB8XyBeTkJTqZgsRgJjh5uQSJyJg62YSuTyXaSrlkbnl7qBCkpDCp1YqtRYnjqzIYzMYVRYDDRbJKzLpzPoM8Yjb1YaaEaNkVbpjb5otg6ynSp8NisJzwm6PUkadI1okGUz247YF2OdyFt3e+FoyIRXGCohS8YaAXdTrzBZ-OYVboIaUAbxrO0NJqylWQtCaya9vWkeMm6cW3bJ3iuz2+9gBypIcvRIX1-UDb9OzDOdeT-JchRjVc7nXBALHeGgL2vGVXDQyxdBVMFt2TYx3hI2x1GsQ172NXZ4ViBs3xOJhPzbFkp1-RcAI5CkIGYZdsiQsUExcMpSjQkwjANNQPkMFVDAPDDvksV5NVsCw7x6cInzog4LWRWAAFdsSnYdR3pRk1houEhno191iMqcEDHHF5juDJ+NjZDxQQDQMyBSVrFLSx1N4PQVVMQwMI+XMC0lNRd2rLTaJs3SEn0hy8WYECfWEP02ADDAgysutbL08ZDOMvEnPMns43chCV1yLzhKKEi1CBaxjECmwAjVbNwvaUpswzGVDDKE81ESnZrLNBjINgQx8CoHscFMulx2ZEMnUW5bcA8wT4wURAvHVNoAV0MwKLqfCnEQNp2rUVw-A0HRdAPbMptrZ9SrSt8toWpaXNW7KwPyiC2LxHagf2pqhKOopSJoXQFTG0xTA0bx7FunzeAxostVBF7swxoJqMfZKzWy5gOVgMBBUyRrRUOxM6ki+SlQVTQOmsX5sblM8LBPbNdHeCEc0+7SUpoGm6epFYR3WiytnJmaERlyQkmqhlarcgQYaZlClALKUbpqfxdBoLqmnaTqVCeswzAlim1bgWXgIwb1QYKoqVZK2h1bGLWXLqvWGoE2HmeUVwtwvdGFWsXgC06AidSLO2TwNEwTo0YJ72kZAIDgORiu+whhQjw2tTcCErZ6kL+ux1RU0ogwbETrrNDtp3VdiBgmHLg3vKUPCaEVa3KlvWTsdcdx9CMbxfH8UnNOmv3zV+ge1yHtQLe6nUAQVPUczMFVNG0YiNHqToZWi7u17m99mPOW1Fk35r4eHtw966gFkwxh2VT+C3GhHU9ROqlnkhoDSD4ko91SpaJiaIX72g7M6YkpI35w0KOqDw5FXjR0FgeDGKoxZIwCJoYw70yyX0dmTWB987KPyQa2FBU52T8lJIBMYmDI6qiBPKHQ+DOqELkgpC8VgdC+DGhmQwd9S7rwQdaZ+LD5rsNdPLMAPCUIYy0MjV45gjCUWUseZGQI1RWBsGWAIuY5E6QUY2RBLFWE-gXP+LAWjvJ+HVDuV4oIDy2BPtjO2Fhz4QjKC9MamgHa2Klg-RxyivwQygnBACPFuGIQrp4+KGFbD6EoQEHMgs5KdCIjqUiipJFoRibNRh8T0TzQ4m4mgGiPEtSaBbCwKYuqdITuYX+x42iWz1H4MoXiPiQjoaveRcSlH1KSdOVx-ZuLuggK0+GaotD-wMPk3CRS+Yi1KSRUa5FHqyMmV9Oxc0KpTjWSzdUnUUY+C6QEKwFhwpjUaF4FQfg3jI28LQleFzYmMP+lDFatyXAmEtqWVSHRvCdGsOFdSQ15KC0VJ0NUEzAWS0ph7EgEKijZjZtJA8HROjSTzNjXMFsZQi3UsjYwPyd7VJdrTDWUACXDxItuOogtOjmwBGoEhp4eaC2+XC0KCpaHBCAA */
  id: "overall_workflow",
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
                      target: "#overall_workflow.error"
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
          onDone: {
            target: "process3_local",
          }
        },

        success: {
          invoke: {
            src: ctx => ctx.stop_signal ? Promise.reject(`stop`) : Promise.resolve('repeat'),
            onDone: {
              target: 'parallel_state1'
            },
            onError: {
              target: "#overall_workflow.idle"
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
            onError: "#overall_workflow.error",
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
        onDone: 'idle',
        onError: 'error',
      }
    }
  }
});

export default overall_workflow


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