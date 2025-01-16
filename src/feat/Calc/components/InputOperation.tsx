import { CalcContext } from "../CalcContext";
import { CalcMachineEventType, Operations, OperationsValues } from "../const";

export function InputOperation() {
  const actorRef = CalcContext.useActorRef();
  const getHandleClick = (operation: OperationsValues) => () => {
    actorRef.send({
      type: CalcMachineEventType.InputOperation,
      value: operation,
    });
  };

  return (
    <>
      <div>
        Choose operation:
      </div>
      <button onClick={getHandleClick(Operations.Plus)}>+</button>
      <button onClick={getHandleClick(Operations.Minus)}>-</button>
      <button onClick={getHandleClick(Operations.Multiply)}>*</button>
      <button onClick={getHandleClick(Operations.Divide)}>/</button>

      <div>
        <button
          style={{ width: "100%", margin: "8px 0" }}
          onClick={() => {
            actorRef.send({
              type: CalcMachineEventType.Done,
            });
          }}
        >
          Get result
        </button>
      </div>
    </>
  );
}
