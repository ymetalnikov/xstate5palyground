import { ShopEventType } from "../../shopMachine";
import { ShopContext } from "../../ShopContext";

export function Pay() {
  const actorRef = ShopContext.useActorRef();
  return (
    <div>
      <button onClick={() => {
        actorRef.send({
          type: ShopEventType.PAY_BACK_TO_PAYMENT
        })
      }}>
        👈 Обратно
      </button>
    </div>
  )
}