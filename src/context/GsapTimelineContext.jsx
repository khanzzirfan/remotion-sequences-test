import React, { useState, useEffect, useCallback, useRef } from "react";
import { Controls, PlayState, Timeline, Tween } from "react-gsap";
import gsap from "gsap";
import { Power4 } from "gsap";
// Context has been created
const GsapTimelineContext = React.createContext(false);

// const PlayState = {
//   PLAY: "play",
//   STOP: "stop",
//   PAUSE: "pause",
// };

// Provider
const GsapTimelineContextProvider = ({ children }) => {
  const timeline = React.useCallback(gsap.timeline({ paused: true }), []);
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(false);
  const [progress, setProgress] = useState(0);
  const parentElementRef = useRef();
  // передаем предка анимируемых элементов
  const q = gsap.utils.selector(parentElementRef);

  useEffect(() => {
    if (!play) {
      timeline.pause();
    } else {
      timeline.resume();
    }
  }, [play, timeline]);

  const addToTimeline = (selector, data, startAt) => {
    timeline.to(q(selector), { opacity: 1, ...data }, startAt);
  };

  const handleReset = useCallback(() => {
    timeline.revert();
  }, [timeline]);

  const handleRestart = useCallback(() => {
    timeline.restart();
  }, [timeline]);

  const handleRepeat = useCallback(() => {
    timeline.repeat(1);
    timeline.restart();
  }, [timeline]);

  const handleSeek = useCallback(() => {
    timeline.seek(2);
  }, [timeline]);

  const handleProgress = useCallback(() => {
    // console.log("duration", timeline.duration());
    // console.log("totalduration", timeline.totalDuration());
    // console.log("progress", timeline.progress());
    // console.log("endtime", timeline.endTime(false));
    // console.log("time", timeline.time());
    // console.log("totaltime", timeline.totalTime());
  }, [timeline]);

  const getCurrentTime = () => {
    // console.log("duration", timeline.duration());
    // console.log("totalduration", timeline.totalDuration());
    // console.log("progress", timeline.progress());
    // console.log("endtime", timeline.endTime(false));
    // console.log("time", timeline.time());
    // console.log("totaltime", timeline.totalTime());
    return timeline.time();
  };

  const setTotalDuration = (seconds) => {
    timeline.totalDuration(seconds);
  };

  return (
    <GsapTimelineContext.Provider
      value={{
        timeline,
        setPlay,
        setPause,
        setProgress,
        play,
        pause,
        progress,
        handleSeek,
        handleProgress,
        getCurrentTime,
        setTotalDuration,
        handleReset,
        parentElementRef,
        addToTimeline,
      }}
    >
      {children}
    </GsapTimelineContext.Provider>
  );
};

export { GsapTimelineContext, GsapTimelineContextProvider, PlayState };
