import { assign, setup } from "xstate";
import { shopShippingMachine } from "./shopShippingMachine";

export type Product = {
	id: number;
	img: string;
	title: string;
	price: number;
};

export enum ShopState {
	INIT = "INIT",
	SHIPPING = "SHIPPING",
	PAYMENT = "PAYMENT",
	PAY = "PAY",
	DONE = "DONE",
}

export enum ShopStatePayment {
	INIT = "PAYMENT_INIT",
	HIST = "PAYMENT_HIST",
	CREDIT_CARD = "PAYMENT_CARD",
	PAYPAL = "PAYMENT_PAYPAL",
}

export enum ShopEventType {
	ADD_TO_CART = "ADD_TO_CART",
	CART_CONFIRM = "CART_CONFIRM",

	PAYMENT__CHOOSE_CARD = "PAYMENT__CHOOSE_CARD",
	PAYMENT__CHOOSE_PAYPAL = "PAYMENT__CHOOSE_PAYPAL",
	PAYMENT__DONE = "PAYMENT__DONE",
	PAY_BACK_TO_PAYMENT = "PAY_BACK_TO_PAYMENT",
	DONE__BACK = "DONE__BACK",
}

type ShopMachineContext = {
	products: Product[];
	addressId: string | null;

	// payment
	paymentMethod: "creditcard" | "paypal";
};

type ShopMachineEvents =
	| {
			type: ShopEventType.ADD_TO_CART;
			value: Product;
	  }
	| {
			type: ShopEventType.CART_CONFIRM;
	  }
	| {
			type: ShopEventType.PAYMENT__CHOOSE_CARD;
	  }
	| {
			type: ShopEventType.PAYMENT__CHOOSE_PAYPAL;
	  }
	| {
			type: ShopEventType.PAYMENT__DONE;
	  }
	| {
			type: ShopEventType.PAY_BACK_TO_PAYMENT;
	  }
	| {
			type: ShopEventType.DONE__BACK;
	  };

export const shopMachine = setup({
	types: {
		context: {} as ShopMachineContext,
		events: {} as ShopMachineEvents,
	},
	actors: {
		shippingSubMachine: shopShippingMachine,
	},
	guards: {
		cartHasProducts: ({ context }) => context.products.length > 0,
	},
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5SwBYHsAOBaAxgQwCcAXAOgEkA5MgFQGIBBAEUYH1qB5FgYXoCVqA2gAYAuolAY0sAJZFpaAHbiQAD0QAmAMwB2EgA5tegJwBWAGxCLl9UL0AaEAE9EARgAs6kpstDtZ7ULe2h7aAL6hDqiYuISklDS0PPzc7BQAYmS8ALLCYkggkjJyispqCDYm+nr+lpomAW56dQ7O5R4kbi7qeu6aLnomOgbhkejY+MQkAMoAEmQACvOUAOK0EIpgJNIKAG5oANabqNIYGNtQucqFsvJK+WUm6i2I1ZVaRmY2dUbvbiMgUXGsRI83oAE0sgBRCjUEHgqEwljxOigiHQ6gsFLsKaQthg+aQy75a7FO6gMrqdpGNxuXyab4BExCNzPBAGPRVIRaMxGV5mFxhf4KNAQODKQExYhXKQ3Er3RBYMysxX-CUTOJUajSoq3UovTwuFyaIzeExGLnM9RGVmUzwmPS+XlctxmMx6P4RAFjSWkWYLJYUZba2Vk1SIeqspmaEhaJqPH42H56VXe9VwtEw4OkvUIFzUkjU2naelmxnM1naIwuEgmeol4wDAaC0bRNOohGw9vopGarO6+XlPR2gWfWk89SPbQmVkm6OM4tCKu183qFOt4GMVKQvty8mIDysnpedRWjz1dxmRrhcJAA */
	id: "shop-cart",
	initial: ShopState.INIT,
	context: {
		products: [],
		addressId: null,
		paymentMethod: "creditcard",
	},
	states: {
		[ShopState.INIT]: {
			on: {
				[ShopEventType.ADD_TO_CART]: {
					actions: assign({
						products: ({ context, event }) => [
							...context.products,
							event.value,
						],
					}),
				},
				[ShopEventType.CART_CONFIRM]: {
					guard: "cartHasProducts",
					target: ShopState.SHIPPING,
				},
			},
		},
		[ShopState.SHIPPING]: {
			invoke: {
				id: "shipping",
				src: "shippingSubMachine",
				onDone: {
					target: ShopState.PAYMENT,
					actions: assign({ addressId: ({ event }) => event.output.addressId }),
				},
			},
		},
		[ShopState.PAYMENT]: {
			initial: ShopStatePayment.INIT,
			states: {
				[ShopStatePayment.INIT]: {
					on: {
						[ShopEventType.PAYMENT__CHOOSE_CARD]: {
							target: ShopStatePayment.CREDIT_CARD,
						},
            [ShopEventType.PAYMENT__CHOOSE_PAYPAL]: {
							target: ShopStatePayment.PAYPAL,
						},
					},
				},
				[ShopStatePayment.CREDIT_CARD]: {
					on: {
						[ShopEventType.PAYMENT__DONE]: {
							target: `#shop-cart.${ShopState.PAY}`,
						},
            [ShopEventType.PAYMENT__CHOOSE_PAYPAL]: {
							target: ShopStatePayment.PAYPAL,
						},
					},
				},
				[ShopStatePayment.PAYPAL]: {
					on: {
						[ShopEventType.PAYMENT__DONE]: {
							target: `#shop-cart.${ShopState.PAY}`,
						},
            [ShopEventType.PAYMENT__CHOOSE_CARD]: {
							target: ShopStatePayment.CREDIT_CARD,
						},
					},
				},
				[ShopStatePayment.HIST]: { type: "history" },
			},
		},
		[ShopState.PAY]: {
			on: {
				[ShopEventType.PAY_BACK_TO_PAYMENT]: {
					target: `${ShopState.PAYMENT}.${ShopStatePayment.HIST}`,
				},
			},
		},
		[ShopState.DONE]: {
			on: {
				[ShopEventType.DONE__BACK]: {
					target: ShopState.PAYMENT,
				},
			},
			// type: "final",
		},
	},
});
