import { createActorContext } from "@xstate/react";
import { calcMachine } from "./calcMachine";

export const CalcContext = createActorContext(calcMachine);
