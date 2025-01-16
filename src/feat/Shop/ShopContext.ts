import { createActorContext } from "@xstate/react";
import { shopMachine } from "./shopMachine";

export const ShopContext = createActorContext(shopMachine);
