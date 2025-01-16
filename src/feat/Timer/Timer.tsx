import { useActorRef, useSelector } from '@xstate/react';

import { timerMachine } from './timerMachine'
import { TimerEvent, TimerState } from './constants';

export function Timer() {
  const actorRef = useActorRef(timerMachine, {});
  const elapsed = useSelector(actorRef, (state) => state.context.elapsed);
  const value = useSelector(actorRef, (state) => state.value);

  return (
    <>
      {elapsed}
      {value === TimerState.STOPPED ? <button onClick={() => {actorRef.send({ type: TimerEvent.START })}}>Start</button> : null}
      {value === TimerState.RUNNING ? <button onClick={() => {actorRef.send({ type: TimerEvent.STOP })}}>Stop</button> : null}
    </>
  )
}
