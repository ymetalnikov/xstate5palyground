export const Operations = {
  Plus: "+",
  Minus: "-",
  Multiply: "*",
  Divide: "/",
} as const;

export const CalcMachineEventType = {
  InputNumber: "calc.input.number",
  InputOperation: "calc.input.operation",
  Done: "calc.done",
  Reset: "calc.reset",
} as const;

export const CalcMachineState = {
  Init: "init",
  InputNumber: "input_number",
  InputOperation: "input_operation",
  ResultDisplayed: "result_displayed",
} as const;

export type OperationsValues = GetValues<typeof Operations>;

export type CalcMachineContext = {
  numbers: number[];
  operations: OperationsValues[];
  result: number;
};

export type CalcMachineEvents =
  | {
      type: typeof CalcMachineEventType.InputNumber;
      value: number;
    }
  | {
      type: typeof CalcMachineEventType.InputOperation;
      value: OperationsValues;
    }
  | {
      type: typeof CalcMachineEventType.Done;
    }
  | {
      type: typeof CalcMachineEventType.Reset;
    };
