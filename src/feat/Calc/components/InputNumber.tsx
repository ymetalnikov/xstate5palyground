import { useState } from "react";
import { CalcContext } from "../CalcContext";
import { CalcMachineEventType } from "../const";

export function InputNumber() {
  const actorRef = CalcContext.useActorRef();
  const [num, setNum] = useState(0);
  const handleClick = () =>
    actorRef.send({
      type: CalcMachineEventType.InputNumber,
      value: num,
    });

  return (
    <>
      Input number:
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(+e.target.value)}
      />
      <button onClick={handleClick}>Next</button>
    </>
  );
}