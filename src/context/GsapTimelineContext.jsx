import React from "react";
import { Controls, PlayState, Timeline, Tween } from "react-gsap";
import gsap from "gsap";
import { Power4 } from "gsap";
// Context has been created
const GsapTimelineContext = React.createContext(false);

const PlayState = {
  PLAY: "play",
  STOP: "stop",
  PAUSE: "pause",
};

// Provider
const GsapTimelineContextProvider = ({ children }) => {
  const timeline = React.useCallback(gsap.timeline({ paused: true }), []);

  return (
    <GsapTimelineContext.Provider value={{ timeline }}>
      {children}
    </GsapTimelineContext.Provider>
  );
};

export { GsapTimelineContext, GsapTimelineContextProvider, PlayState };
