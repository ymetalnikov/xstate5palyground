import { assign, fromPromise, setup } from "xstate";

type Response = {
  addressId: string;
};

const apiSaveAddress = (_: string) =>
  new Promise<Response>((res) =>
    setTimeout(() => res({ addressId: `in${Math.random() * 100}` }), 500)
  );

export const shopShippingMachine = setup({
  types: {
    output: {} as { addressId: string },
    context: {} as { address: string; addressId: string },
    events: {} as 
      | { type: "change"; value: string }
      | { type: "submit"; value: string }
      ,
  },
  actors: {
    saveAddress: fromPromise<Response, { address: string }>(
      async ({ input }) => {
        return await apiSaveAddress(input.address);
      }
    ),
  },
  guards: {
    isFormValid: ({ context, event }) => !!context.address && !!event.value,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwBYHsAOBaVBLDGuAdlAHTG4AuAxLAK4BGAtlQNoAMAuoqBmrFVxoiPEAA9EARgBMAVlIA2WQA5lsyStkAWWdLkAaEAE9EyyaWVatATmuTrWudpkBfF4dSYcKfIRKl6ZipKYihqCGEwciIANzQAayjYAEMYsCxkiAgAJzhYDm4kED4BEOFRCQQFLQVSa3ZVBWkrAGZlFtkAdkMTBHbSFp0FJUsFaxa5aTd3ECI0CDhRT2w8AlDREsFyosqsBR7EPbcPdBWfNf8KSg3+LZEdxEcDhEl2LVJOls6Fdk7rZWssjsyk6xxAy28vlCAUYLEoIRIN1KQnuoEqLRa1lIWg0LR+kkkLV+o2eZgGehBGPYGM6NSmMwhqz8ZECcMokCRdwqpkx2OUbwUZmsekx1merxa2PqZmU0jMYwx9LcQA */
  id: "shop-shipping",
  initial: "init",
  context: {
    address: "",
    addressId: "",
  },
  states: {
    init: {
      on: {
        change: {
          actions: assign({ address: ({ event }) => event.value }),
        },
        submit: {
          guard: "isFormValid",
          actions: assign({ address: ({ event }) => event.value }),
          target: "submitting",
        },
      },
    },
    submitting: {
      invoke: {
        id: "save-address",
        src: "saveAddress",
        input: ({ context: { address } }) => ({ address }),
        onDone: {
          target: "submitted",
          actions: assign({ addressId: ({ event }) => event.output.addressId }),
        },
      },
    },
    submitted: {
      type: "final",
    },
  },
  output: ({ context }) => ({
    addressId: context.addressId,
  }),
});
