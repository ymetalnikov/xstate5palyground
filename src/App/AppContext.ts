import { createActorContext } from "@xstate/react";
import { appMachine } from "./appMachine";

export const AppContext = createActorContext(appMachine);
