import { useSelector } from "@xstate/react";
import { CalcContext } from "../CalcContext";
import { getResult } from "../getResult";
import { CalcMachineEventType } from "../const";

export function Result() {
  const actorRef = CalcContext.useActorRef();
  const result = useSelector(actorRef, (state) =>
    getResult(state.context.numbers, state.context.operations)
  );
  const handleClick = () => {
    actorRef.send({
      type: CalcMachineEventType.Reset,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: '8px' }}>
      <div>Result: {result}</div>
      <div>
        <button onClick={handleClick}>Reset</button>
      </div>
    </div>
  );
}
