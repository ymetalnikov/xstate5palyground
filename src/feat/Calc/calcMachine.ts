import { assign, setup } from "xstate";
import {
  CalcMachineContext,
  CalcMachineEvents,
  CalcMachineEventType,
  CalcMachineState,
} from "./const";
import { defineValue } from "@shared/defineValue";

export const calcMachine = setup({
  types: {
    context: {} as CalcMachineContext,
    events: {} as CalcMachineEvents,
  },
  actions: {
    addNumber: assign({
      numbers: ({ context, event }) => {
        const { value } = defineValue(event, CalcMachineEventType.InputNumber);
        return [...context.numbers, value];
      },
    }),
    addOperation: assign({
      operations: ({ context, event }) => {
        const { value } = defineValue(
          event,
          CalcMachineEventType.InputOperation
        );
        return [...context.operations, value];
      },
    }),
    reset: assign({
      numbers: [],
      operations: [],
    }),
  },
}).createMachine({
  id: "calc",
  initial: CalcMachineState.Init,
  context: {
    numbers: [],
    operations: [],
    result: 0,
  },
  states: {
    [CalcMachineState.Init]: {
      on: {
        [CalcMachineEventType.InputNumber]: {
          target: CalcMachineState.InputNumber,
        },
      },
    },
    [CalcMachineState.InputNumber]: {
      on: {
        [CalcMachineEventType.InputNumber]: {
          actions: "addNumber",
          target: CalcMachineState.InputOperation,
        },
      },
    },
    [CalcMachineState.InputOperation]: {
      on: {
        [CalcMachineEventType.InputOperation]: {
          actions: "addOperation",
          target: CalcMachineState.InputNumber,
        },
        [CalcMachineEventType.Done]: {
          target: CalcMachineState.ResultDisplayed,
        },
      },
    },
    [CalcMachineState.ResultDisplayed]: {
      on: {
        [CalcMachineEventType.Reset]: {
          actions: "reset",
          target: CalcMachineState.Init,
        },
      },
    },
  },
});
