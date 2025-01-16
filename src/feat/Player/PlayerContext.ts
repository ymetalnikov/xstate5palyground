import { createActorContext } from "@xstate/react";
import { playerMachine } from "./playerMachine";

export const PlayerContext = createActorContext(playerMachine);
