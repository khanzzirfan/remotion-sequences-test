import React from "react";
// Context has been created
const PlayerContext = React.createContext(false);
// Provider
const PlayerContextProvider = ({ children }) => {
  const [playerState, setPlayerState] = React.useState(false);

  const togglePlay = (playstate) => {
    setPlayerState(playstate || !playerState);
  };

  return (
    <PlayerContext.Provider value={{ playerState, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerContextProvider };
