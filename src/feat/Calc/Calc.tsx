import { useSelector } from "@xstate/react";
import { match } from "ts-pattern";

import { Init } from "./components/Init";
import { InputNumber } from "./components/InputNumber";
import { InputOperation } from "./components/InputOperation";
import { Result } from "./components/Result";

import { CalcMachineState } from "./const";
import { getExpression } from "./getExpression";
import { CalcContext } from "./CalcContext";

export function CalcOne() {
  const actorRef = CalcContext.useActorRef();
  const value = useSelector(actorRef, (state) => state.value);
  const currentExpression = useSelector(actorRef, (state) =>
    getExpression(state.context.numbers, state.context.operations)
  );

  return (
    <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
      <div>{currentExpression}</div>
      <div>
        {match(value)
          .with(CalcMachineState.Init, () => <Init />)
          .with(CalcMachineState.InputNumber, () => <InputNumber />)
          .with(CalcMachineState.InputOperation, () => <InputOperation />)
          .with(CalcMachineState.ResultDisplayed, () => <Result />)
          .exhaustive()}
      </div>
    </div>
  );
}

export function Calc() {
  return (
    <CalcContext.Provider>
      <CalcOne />
    </CalcContext.Provider>
  );
}
