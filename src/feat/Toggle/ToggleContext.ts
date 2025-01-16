import { createActorContext } from "@xstate/react";
import { toggleMachine } from "./toggleMachine";

export const ToggleContext = createActorContext(toggleMachine);
