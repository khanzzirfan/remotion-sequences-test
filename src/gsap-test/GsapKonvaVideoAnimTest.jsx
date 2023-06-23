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
  const videoElement = React.useRef(null);

  // we need to use "useMemo" here, so we don't create new video elment on any render
  videoElement.current = React.useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    element.crossOrigin = "anonymous";
    return element;
  }, [src]);

  const handlePause = () => {
    if (videoElement.current) {
      console.log("pause the video now");
      videoElement.current.pause();
      setPlay(() => false);
    }
  };

  const handleResume = () => {
    if (videoElement.current && current) {
      console.log("pause the video now");
      videoElement.current.play();
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
          if (videoElement.current) {
            console.log("onStart the video now", startAt);
            videoElement.current.currentTime = startAt;
            videoElement.current.play();
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
        width: videoElement.current.videoWidth,
        height: videoElement.current.videoHeight,
      });
    };

    const onCanPlay = function () {
      console.log("canPlaythroug runing");
      const cwidth = videoElement.current.videoWidth;
      const cheight = videoElement.current.videoHeight;
      if (imageRef.current) {
        const ctx = imageRef.current.getContext("2d");
        videoElement.current.currentTime = 0.1;
        // // ctx.putImageData(videoElement.current, 0, 0);
        // ctx.drawImage(videoElement, 0, 0, cwidth, cheight);
        // // imageRef.current.cache();
        // imageRef.current.getLayer().batchDraw();
      }
    };

    videoElement.current.addEventListener("loadedmetadata", onload);
    videoElement.current.addEventListener("loadeddata", onCanPlay);
    return () => {
      videoElement.current.removeEventListener("loadedmetadata", onload);
      videoElement.current.removeEventListener("loadeddata", onCanPlay);
    };
  }, []);

  // use Konva.Animation to redraw a layer
  React.useEffect(() => {
    const layer = imageRef.current.getLayer();
    anim.current = new Konva.Animation(() => {}, layer);
  }, []);

  const updateAnim = () => {
    const layer = imageRef.current.getLayer();
    if (layer) {
      if (layer) layer.batchDraw();
      anim.current = new Konva.Animation(() => {}, layer);
    }
  };

  React.useEffect(() => {
    if (play) {
      videoElement.current.play();
      anim.current.start();
    } else {
      videoElement.current.pause();
      if (anim.current) {
        anim.current.stop();
      }
    }
    return () => anim.current.stop();
  }, [play]);

  return (
    <Image
      ref={imageRef}
      image={videoElement.current}
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
