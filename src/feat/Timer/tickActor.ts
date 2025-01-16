import { fromCallback } from "xstate";
import { TimerEvent } from "./constants";

export const tickActor = fromCallback(({ sendBack, receive }) => {
  const interval = setInterval(() => {
    sendBack({ type: TimerEvent.TICK });
  }, 1000);

  receive((event) => {
    if (event.type === "stopListening") {
      clearInterval(interval);
    }
  });

  return () => clearInterval(interval);
});
