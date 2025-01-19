import { useSelector } from "@xstate/react";
import { ShopEventType } from "../../shopMachine";
import { ShopContext } from "../../ShopContext";
import styles from "./styles.module.css";

export function Payment() {
  const actorRef = ShopContext.useActorRef();
  const value = useSelector(actorRef, (state) => state.value)

  return (
    <div>
      Payment state:{JSON.stringify(value)}
      <div style={{ display: "flex", gap: "4px", margin: "4px" }}>
        <div
          className={styles.item}
          onClick={() => {
            actorRef.send({
              type: ShopEventType.PAYMENT__CHOOSE_CARD,
            });
          }}
        >
          Credit card
        </div>
        <div className={styles.item}
          onClick={() => {
            actorRef.send({
              type: ShopEventType.PAYMENT__CHOOSE_PAYPAL,
            });
          }}
        >PayPal</div>
      </div>
      <div>
        <div
          className={styles.item}
          onClick={() => {
            actorRef.send({
              type: ShopEventType.PAYMENT__DONE,
            });
          }}
        >
          👉 Next
        </div>
      </div>
    </div>
  );
}
