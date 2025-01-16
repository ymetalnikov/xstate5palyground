import { useEffect, useRef } from "react";
import { PlayerContext } from "./PlayerContext";
import { Progress } from "./components/Progress";
import { PlayerEventType } from "./playerMachine";

function PlayerOne() {
  const actorRef = PlayerContext.useActorRef();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const updatedTime = PlayerContext.useSelector(
    (state) => state.context.updatedTime
  );

  useEffect(() => {
    audioRef.current!.currentTime = updatedTime;
  }, [updatedTime]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleLoadedMetadata = () => {
        actorRef.send({
          type: PlayerEventType.LOADED,
          value: audioElement.duration,
        });
      };
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, []);

  const handleTimeUpdate = () => {
    actorRef.send({
      type: PlayerEventType.PROGRESS,
      value: audioRef!.current!.currentTime,
    });
  };

  const playAudio = () => {
    actorRef.send({ type: PlayerEventType.PLAY });
    audioRef.current!.play();
  };

  const pauseAudio = () => {
    actorRef.send({
      type: PlayerEventType.PAUSE,
      value: audioRef!.current!.currentTime,
    });
    audioRef.current!.pause();
  };

  const stopAudio = () => {
    actorRef.send({ type: PlayerEventType.STOP });
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="/audio/de.mp3"
        onTimeUpdate={handleTimeUpdate}
      />
      <Progress />
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={playAudio}>▶️</button>
        <button onClick={pauseAudio}>⏸️</button>
        <button onClick={stopAudio}>⏹️</button>
      </div>
    </div>
  );
}

export function Player() {
  return (
    <PlayerContext.Provider>
      <PlayerOne />
    </PlayerContext.Provider>
  );
}
