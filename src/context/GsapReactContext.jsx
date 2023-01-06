import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { Controls, PlayState, Timeline, Tween } from "react-gsap";
import gsap from "gsap";
// import { Power4 } from "gsap";

// Context has been created
const GsapContext = React.createContext(false);

// Provider
const GsapContextProvider = ({ children }) => {
  const tl = useRef();
  const gsapCtx = useRef();

  const timeline = React.useCallback(
    gsap.timeline({
      paused: true,
      defaults: { duration: 20, onUpdate: onUpdate },
    }),
    [],
  );

  const [play, setPlay] = useState(false);
  const [time, setTime] = useState(0.01);

  const parentElementRef = useRef();
  // передаем предка анимируемых элементов
  const q = gsap.utils.selector(parentElementRef);

  useEffect(() => {
    timeline.eventCallback("onUpdate", function () {
      console.log(timeline.progress());
      onUpdate();
    });
  }, []);

  useEffect(() => {
    if (!play) {
      timeline.pause();
    } else {
      timeline.resume();
    }
  }, [play]);

  const addToTimeline = (selector, data, startAt = 0, tweenType = "to") => {
    if (parentElementRef.current) {
      const shapeSelector = parentElementRef.current.findOne(selector);
      if (shapeSelector) {
        timeline.to(shapeSelector, { ...data }, startAt);
      }
    }
  };

  const addVideoToTimeline = (selector, data, startAt = 0) => {
    console.log("allParams", data);
    if (selector) {
      timeline.from(selector, { ...data }, startAt);
    }
  };

  const addTotalDuration = (duration) => {
    timeline.totalDuration(duration);
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
    timeline.seek(5);
  }, [timeline]);

  const setDurationTimeline = useCallback(() => {
    timeline.totalDuration(3);
  }, [timeline]);

  const handlePause = useCallback(() => {
    timeline.pause();
  }, [timeline]);

  const handlePlay = useCallback(() => {
    timeline.resume();
  }, [timeline]);

  //   useLayoutEffect(() => {
  //     gsapCtx.current = gsap.context(() => {
  //       // add a box and circle animation to our timeline and play on first render
  //       console.log("creating timeline");
  //       tl.current && tl.current.progress(0).kill();
  //       tl.current = gsap
  //         .timeline()
  //         .to(".box", {
  //           rotation: 360,
  //         })
  //         .to(".circle", {
  //           x: 100,
  //         });
  //     });
  //     return () => gsapCtx.revert();
  //   }, []);

  const onUpdate = useCallback(() => {
    console.log("update event callback");
    var now = timeline.time();
    var elapsedTime;
    if (time) {
      elapsedTime = now - time;
    }
    console.log(elapsedTime);
    //time = now;
    setTime(now);
  }, [timeline]);

  return (
    <GsapContext.Provider
      value={{
        gsapCtx,
        addToTimeline,
        timeline,
        play,
        parentElementRef,
        addTotalDuration,
        time,
        handleRestart,
        handleReset,
        handleSeek,
        handleRepeat,
        addVideoToTimeline,
        handlePlay,
        handlePause,
      }}
    >
      {children}
    </GsapContext.Provider>
  );
};

export { GsapContext, GsapContextProvider, PlayState };
