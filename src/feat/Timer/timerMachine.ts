import { setup, assign } from "xstate";
import { tickActor } from "./tickActor";
import { TimerEvent, TimerState } from "./constants";
import { Context, Events } from "./types";

export const timerMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actors: {
    tickActor,
  },
  actions: {
    increment: assign({ elapsed: ({ context }) => context.elapsed + 1 }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgBcBLAWzACd8QAHLWI4rDKgD0QEYAmAOk4FYAnABYBABgEA2ThIDsnAMwz56AJ4d23GQPaiZE-fKF6Bk5GeRA */
  id: "timer",
  initial: TimerState.STOPPED,
  context: { elapsed: 0 },
  states: {
    [TimerState.STOPPED]: {
      on: {
        [TimerEvent.START]: { target: TimerState.RUNNING },
      },
    },
    [TimerState.RUNNING]: {
      invoke: {
        id: "tick",
        src: "tickActor",
      },
      on: {
        [TimerEvent.TICK]: {
          actions: "increment",
        },
        [TimerEvent.STOP]: {
          target: TimerState.STOPPED,
        },
      },
    },
  },
});
