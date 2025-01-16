
export enum TimerState {
  STOPPED = "TIMER_STATE_STOPPED",
  RUNNING = "TIMER_STATE_RUNNING",
}

export const TimerEvent = {
  START: 'timer.start',
  TICK: 'timer.tick',
  STOP: 'timer.stop'
} as const

export type TimerEventType = GetValues<typeof TimerEvent>;
