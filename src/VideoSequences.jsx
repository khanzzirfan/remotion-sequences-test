import React, { useEffect, useRef, useCallback } from "react";
import { AbsoluteFill, Video } from "remotion";
import useHookWithRefCallback from "./useRefWithCallback";

const VideoSequences = ({
  height,
  width,
  startFrom,
  canvasRef,
  imageRef,
  durationInFrames,
  src,
  setCanvasRef,
}) => {
  // const video = useRef(null);
  const [videoRef, setVideoRef] = useHookWithRefCallback();

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
    // context.filter = "grayscale(100%)";
    context.drawImage(videoRef.current, 0, 0, width, height);
    imageRef.current.cache();
  }, [height, width]);

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

  return (
    <AbsoluteFill>
      <Video
        ref={setVideoRef}
        // Hide the original video tag
        style={{ opacity: 0 }}
        startFrom={startFrom}
        endAt={durationInFrames}
        src={src}
      />
      <AbsoluteFill style={{ display: "none" }}>
        <canvas ref={setCanvasRef} width={width} height={height} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default VideoSequences;
VideoSequences.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: "VideoSequences",
};
