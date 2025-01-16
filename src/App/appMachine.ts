import { createMachine } from "xstate";

export const appMachine = createMachine({
  id: "app",
  initial: "start",
  states: {
    start: {
      on: {
        toggle: "toggle",
        timer: "timer",
        calc: "calc",
        player: "player",
        shop: "shop"
      },
    },
    toggle: {
      on: {
        back: "start",
      },
    },
    timer: {
      on: {
        back: "start",
      },
    },
    calc: {
      on: {
        back: "start",
      },
    },
    player: {
      on: {
        back: "start",
      },
    },
    shop: {
      on: {
        back: "start",
      }
    }
  },
});
