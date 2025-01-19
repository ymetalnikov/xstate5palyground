import { match } from "ts-pattern";

import { Products } from "./components/Shop/Products";
import { Shipping } from "./components/Shipping/Shipping";
import { Payment } from "./components/Payment/Payment";
import { Pay } from "./components/Pay/Pay";
import { ShopContext } from "./ShopContext";
import { ShopState, ShopStatePayment } from "./shopMachine";

function ShopOne() {
  const state = ShopContext.useSelector((state) => state.value);
  return (
    <div>
      {match(state)
        .with(ShopState.INIT, () => <Products />)
        .with(ShopState.SHIPPING, () => <Shipping />)
        .with({ [ShopState.PAYMENT]: ShopStatePayment.INIT }, () => <Payment />)
        .with({ [ShopState.PAYMENT]: ShopStatePayment.CREDIT_CARD }, () => <Payment />)
        .with({ [ShopState.PAYMENT]: ShopStatePayment.PAYPAL }, () => <Payment />)
        .with(ShopState.PAY, () => <Pay />)
        .with(ShopState.DONE, () => <div>Done</div>)
        .exhaustive()}
    </div>
  );
}

export function Shop() {
  return (
    <ShopContext.Provider>
      <ShopOne />
    </ShopContext.Provider>
  );
}
