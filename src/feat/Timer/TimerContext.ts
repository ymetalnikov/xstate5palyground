import { createActorContext } from "@xstate/react";
import { timerMachine } from "./timerMachine";

export const TimerContext = createActorContext(timerMachine);
