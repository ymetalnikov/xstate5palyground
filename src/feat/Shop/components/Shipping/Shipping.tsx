import { ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "@xstate/react";
import { ShopContext } from "../../ShopContext";

interface FormElements extends HTMLFormControlsCollection {
  addressInput: HTMLInputElement;
}
interface AddressFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function Shipping() {
  const shippingActorRef = ShopContext.useSelector(
    (state) => state.children.shipping
  );
  const state = useSelector(shippingActorRef, (state) => state?.value);

  useEffect(() => {
    const sub = shippingActorRef?.subscribe((s) => console.log(s.context));
    return sub?.unsubscribe;
  }, [shippingActorRef]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    shippingActorRef?.send({ type: "change", value });
  };

  const handleSubmit = (event: FormEvent<AddressFormElement>) => {
    event.preventDefault();
    shippingActorRef?.send({
      type: "submit",
      value: event.currentTarget.elements.addressInput.value,
    });
  };

  return (
    <div>
      <div>Shipping</div>
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="addressInput">
          Address:
          <input id="addressInput" type="text" onChange={handleChange} />
        </label>
        {state === 'init' ? <button >Submit</button> : null}
        {state === 'submitting' ? <button disabled>Submitting...</button> : null}
      </form>
    </div>
  );
}
