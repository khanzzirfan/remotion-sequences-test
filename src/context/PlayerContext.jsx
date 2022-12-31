import React, { useState } from "react";
// Context has been created
const PlayerContext = React.createContext(false);

const PlayState = {
  PLAY: "play",
  STOP: "stop",
  PAUSE: "pause",
  WAITING: "waiting",
};

// Provider
const PlayerContextProvider = ({ children }) => {
  const [playerState, setPlayerState] = React.useState(PlayState.PAUSE);
  const [isWaiting, setIsWaiting] = useState(false);

  const togglePlay = (playstate) => {
    setPlayerState(playstate || !playerState);
  };

  const setPlayThrough = () => {
    if (playerState === PlayState.WAITING) {
      setPlayerState(PlayState.PLAY);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        playerState,
        togglePlay,
        setPlayerState,
        setIsWaiting,
        isWaiting,
        setPlayThrough,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerContextProvider, PlayState };
