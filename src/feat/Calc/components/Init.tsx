import { CalcContext } from "../CalcContext";
import { CalcMachineEventType } from "../const";

export function Init () {
    const actorRef = CalcContext.useActorRef();
  return (
                <button
                  onClick={() => {
                    actorRef.send({
                      type: CalcMachineEventType.InputNumber,
                      value: 0,
                    });
                  }}
                >
                  Lets calculate something
                </button>
  )
}