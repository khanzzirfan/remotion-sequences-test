import React, { useImperativeHandle, useState } from "react";
import { Image } from "react-konva";
import Konva from "konva";
import { useCustomEventListener } from "react-custom-events";
import { Events } from "../context/GsapReactContext";

const GsapKonvaVideoAnimTest = React.forwardRef(({ src }, ref) => {
  const imageRef = React.useRef(null);
  const [play, setPlay] = React.useState(false);
  const [size, setSize] = React.useState({ width: 50, height: 50 });
  const [current, setCurrent] = useState(false);
  const anim = React.useRef(null);

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    element.crossOrigin = "anonymous";
    return element;
  }, [src]);

  const handlePause = () => {
    if (videoElement) {
      console.log("pause the video now");
      videoElement.pause();
      anim.current.stop();
      setPlay(() => false);
    }
  };

  const handleResume = () => {
    if (videoElement && current) {
      console.log("pause the video now");
      videoElement.play();
      anim.current.start();
      updateAnim();
      setPlay(() => true);
    }
  };

  useCustomEventListener(Events.PAUSE, (data) => {
    handlePause(data);
  });

  useCustomEventListener(Events.RESUME, (data) => {
    handleResume(data);
  });

  //   const [playAnim, setPlayAnim] = React.useState(false);
  useImperativeHandle(
    ref,
    () => {
      // return our API
      return {
        start(startAt) {
          if (videoElement) {
            console.log("onStart the video now", startAt);
            videoElement.currentTime = startAt;
            videoElement.play();
            anim.current.start();
            updateAnim();
            setPlay(() => true);
            setCurrent(() => true);
          }
        },
        pause() {
          handlePause();
        },
        onComplete() {
          setCurrent(() => false);
        },
      };
    },
    [],
  );

  // when video is loaded, we should read it size
  React.useEffect(() => {
    const onload = function () {
      setSize({
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
      });
    };
    videoElement.addEventListener("loadedmetadata", onload);
    return () => {
      videoElement.removeEventListener("loadedmetadata", onload);
    };
  }, [videoElement]);

  // use Konva.Animation to redraw a layer
  React.useEffect(() => {
    const layer = imageRef.current.getLayer();
    anim.current = new Konva.Animation(() => {}, layer);
  }, [videoElement]);

  const updateAnim = () => {
    const layer = imageRef.current.getLayer();
    if (layer) {
      if (layer) layer.batchDraw();
      anim.current = new Konva.Animation(() => {}, layer);
    }
  };

  React.useEffect(() => {
    if (play) {
      videoElement.play();
      anim.current.start();
    } else {
      videoElement.pause();
      if (anim.current) {
        anim.current.stop();
      }
    }
    return () => anim.current.stop();
  }, [play]);

  return (
    <Image
      ref={imageRef}
      image={videoElement}
      x={20}
      y={20}
      stroke="red"
      width={size.width}
      height={size.height}
      draggable
    />
  );
});

export default GsapKonvaVideoAnimTest;
