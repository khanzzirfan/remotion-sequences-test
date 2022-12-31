import React, { useEffect, useRef, useCallback, useState } from "react";
import { AbsoluteFill, Video } from "remotion";
import { PlayerContext, PlayState } from "./context/PlayerContext";
import { CanvasContext } from "./context/CanvasContext";

const PLAYING_DEBOUNCE_TIME = 20;
const WAITING_DEBOUNCE_TIME = 200;

const VideoSequences = ({
  height,
  width,
  startFrom,
  imageRef,
  durationInFrames,
  src,
  dataId,
}) => {
  // const [videoRef, setVideoRef] = useHookWithRefCallback();
  const videoRef = React.useRef(null);
  const innerCanvasRef = React.useRef(null);

  const { setIsWaiting, setPlayerState, setPlayThrough } =
    React.useContext(PlayerContext);

  const { canvasRef, setDimensions } = React.useContext(CanvasContext);

  const isWaitingTimeout = useRef(null);
  const isPlayingTimeout = useRef(null);

  /** video frame transformation */
  // Process a frame
  const onVideoFrame = useCallback(() => {
    if (!canvasRef.current || !videoRef.current) {
      return;
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }
    context.filter = "grayscale(100%)";
    context.drawImage(videoRef.current, 0, 0, width, height);

    // if (imageRef && imageRef.current) {
    //   imageRef.current.cache();
    // }

    /** Inner Canvas Ref */
    if (!innerCanvasRef.current) return;
    const innerCtx = innerCanvasRef.current.getContext("2d");
    if (!innerCtx) return;
    innerCtx.filter = "grayscale(100%)";
    innerCtx.drawImage(videoRef.current, 0, 0, width, height);
  }, [height, width]);

  useEffect(() => {
    setDimensions({ width, height });
  }, [width, height]);

  // Synchronize the video with the canvas
  useEffect(() => {
    const { current } = videoRef;
    if (!current?.requestVideoFrameCallback) {
      return;
    }
    let handle = 0;
    const callback = () => {
      onVideoFrame();
      handle = current.requestVideoFrameCallback(callback);
    };
    callback();
    return () => {
      current.cancelVideoFrameCallback(handle);
    };
  }, [onVideoFrame]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const waitingHandler = () => {
      console.log("waiting hhandler");
      clearTimeout(isWaitingTimeout.current);

      isWaitingTimeout.current = setTimeout(() => {
        setIsWaiting(true);
        setPlayerState(PlayState.WAITING);
      }, WAITING_DEBOUNCE_TIME);
    };

    const loadStartHandler = () => {
      console.log("loadStartHandler hhandler");
      clearTimeout(isWaitingTimeout.current);

      isWaitingTimeout.current = setTimeout(() => {
        setIsWaiting(true);
        setPlayerState(PlayState.WAITING);
      }, WAITING_DEBOUNCE_TIME);
    };

    const stalledHandler = () => {
      console.log("stalledHandler hhandler");
      clearTimeout(isWaitingTimeout.current);

      isWaitingTimeout.current = setTimeout(() => {
        setIsWaiting(true);
        setPlayerState(PlayState.WAITING);
      }, WAITING_DEBOUNCE_TIME);
    };

    const canplaythroughHandler = () => {
      console.log("canplaythroughHandler hhandler");
      clearTimeout(isWaitingTimeout.current);
      clearTimeout(isPlayingTimeout.current);

      isPlayingTimeout.current = setTimeout(() => {
        setPlayThrough(PlayState.PLAY);
        setIsWaiting(false);
      }, PLAYING_DEBOUNCE_TIME);
    };

    const playHandler = () => {
      console.log("playHandler hhandler");
      clearTimeout(isWaitingTimeout.current);
      clearTimeout(isPlayingTimeout.current);

      isPlayingTimeout.current = setTimeout(() => {
        setPlayThrough(PlayState.PLAY);
        setIsWaiting(false);
      }, PLAYING_DEBOUNCE_TIME);
    };

    const pauseHandler = () => {
      clearTimeout(isWaitingTimeout.current);
      clearTimeout(isPlayingTimeout.current);

      isPlayingTimeout.current = setTimeout(() => {
        setPlayerState(PlayState.PAUSE);
        setIsWaiting(false);
      }, PLAYING_DEBOUNCE_TIME);
    };

    const element = videoRef.current;

    element.addEventListener("waiting", waitingHandler);
    element.addEventListener("loadstart", loadStartHandler);
    element.addEventListener("stalled", stalledHandler);
    element.addEventListener("canplaythrough", canplaythroughHandler);

    element.addEventListener("play", playHandler);
    element.addEventListener("playing", playHandler);
    element.addEventListener("pause", pauseHandler);

    // clean up
    return () => {
      clearTimeout(isWaitingTimeout.current);
      clearTimeout(isPlayingTimeout.current);

      element.removeEventListener("waiting", waitingHandler);
      element.removeEventListener("play", playHandler);
      element.removeEventListener("playing", playHandler);
      element.removeEventListener("pause", pauseHandler);
      element.removeEventListener("loadstart", loadStartHandler);
      element.removeEventListener("stalled", stalledHandler);
      element.removeEventListener("canplaythrough", canplaythroughHandler);
    };
  }, [videoRef]);

  return (
    <AbsoluteFill key={`inner-video-seq-${dataId}`}>
      <Video
        ref={videoRef}
        // Hide the original video tag
        style={{ opacity: 0 }}
        startFrom={startFrom}
        endAt={durationInFrames}
        src={src}
        crossOrigin="anonymous"
        data-id={dataId}
        id={dataId}
      />

      {/* <div style={{ marginTop: 10 }}>
        <canvas ref={innerCanvasRef} width={500} height={500} id={dataId} />
      </div> */}
      <AbsoluteFill
        style={{
          opacity: 0,
        }}
        key={`inner-video-seq--canvas-${dataId}`}
      >
        <canvas ref={innerCanvasRef} id={dataId} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default VideoSequences;
// VideoSequences.whyDidYouRender = {
//   logOnDifferentValues: true,
//   customName: "VideoSequences",
// };
