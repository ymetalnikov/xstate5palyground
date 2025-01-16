import { PlayerContext } from "../PlayerContext";
import { PlayerEventType } from "../playerMachine";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
  margin: "8px 0",
} as const;

export function Progress() {
  const actorRef = PlayerContext.useActorRef();
  const currentTime = PlayerContext.useSelector(
    (state) => state.context.currentTime
  );
  const totalTime = PlayerContext.useSelector(
    (state) => state.context.totalTime
  );

  return (
    <div style={styles}>
      <div>
        <input
          style={{ width: "100%" }}
          type="range"
          min="0"
          max={totalTime}
          value={currentTime}
          onChange={(event) => {
            actorRef.send({
              type: PlayerEventType.CHANGE,
              value: +event.target.value,
            });
          }}
          onMouseUp={() => {
            actorRef.send({
              type: PlayerEventType.UPDATE,
              value: currentTime,
            });
          }}
        />
      </div>
      {Math.floor(currentTime)} / {Math.floor(totalTime)} seconds
    </div>
  );
}