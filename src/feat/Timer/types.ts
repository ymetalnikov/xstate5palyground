import type { TimerEventType } from "./constants";

export type Events = { type: TimerEventType };
export type Context = { elapsed: number };
