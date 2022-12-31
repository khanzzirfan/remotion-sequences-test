import React, { useEffect, useRef, useCallback } from "react";
import { AbsoluteFill, Video } from "remotion";

const VideoSequencesV2 = ({ height, width, vidRef, canvasRef, dataId }) => {
  // const [videoRef, setVideoRef] = useHookWithRefCallback();
  const videoRef = React.useRef(null);

  useEffect(() => {
    videoRef.current = vidRef;
  }, [dataId, vidRef]);

  /** video frame transformation */
  // Process a frame
  const onVideoFrame = useCallback(() => {
    console.log("10000");
    if (!canvasRef.current || !videoRef.current) {
      return;
    }
    console.log("10001");
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }
    console.log("10002");
    context.filter = "grayscale(100%)";
    context.drawImage(videoRef.current, 0, 0, width, height);
  }, [height, width, dataId]);

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
    <AbsoluteFill
      style={{ opacity: 0 }}
      key={`inner-video-seq--canvas-${dataId}`}
    >
      <canvas ref={canvasRef} width={width} height={height} id={dataId} />
    </AbsoluteFill>
  );
};

export default VideoSequencesV2;
