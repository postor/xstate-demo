import { interpret } from "xstate";
import readline from "readline";
import machine from "./machine";
import { inspect } from "@xstate/inspect";


inspect({
  // options
  // url: 'https://stately.ai/viz?inspect', // (default)
  iframe: false // open in new window
})

const service = interpret(machine, { devTools: true }).onTransition((state) => {
  console.log(`Current state: ${JSON.stringify(state.value)}`);
});

service.start();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = async (query: string) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const runMachine = async () => {
  while (true) {
    const state = service.state.value;
    console.log(`Machine is in state: ${JSON.stringify(state)}`);

    const input = await promptUser("Enter 1 to start, 2 to stop, 3 to reset, 0 to exit: \n");
    if (input === "1") {
      service.send("start");
    } if (input === "2") {
      service.send("stop");
    } if (input === "3") {
      service.send("reset");
    } else if (input === "0") {
      break;
    }
  }

  rl.close();
  service.stop();
};

runMachine();