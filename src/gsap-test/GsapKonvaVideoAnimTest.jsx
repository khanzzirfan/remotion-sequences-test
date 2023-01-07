import React, { useImperativeHandle } from "react";
import { Image } from "react-konva";
import Konva from "konva";

const GsapKonvaVideoAnimTest = React.forwardRef(({ src, play }, ref) => {
  const imageRef = React.useRef(null);
  const [size, setSize] = React.useState({ width: 50, height: 50 });
  const anim = React.useRef(null);

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    element.crossOrigin = "anonymous";
    return element;
  }, [src]);

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
          }
        },
        pause() {
          if (videoElement) {
            console.log("pause the video now");
            videoElement.pause();
            anim.current.stop();
          }
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
