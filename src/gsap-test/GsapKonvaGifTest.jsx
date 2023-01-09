import React, { useImperativeHandle, useRef, useLayoutEffect } from "react";
import { Image } from "react-konva";
import {
  useWorkerParser,
  usePlayerState,
  usePlayback,
} from "@react-gifs/tools";

const calcArgs = (fit, frameSize, canvasSize) => {
  switch (fit) {
    case "fill":
      return [
        0,
        0,
        frameSize.width,
        frameSize.height,
        0,
        0,
        canvasSize.width,
        canvasSize.height,
      ];

    case "contain": {
      const ratio = Math.min(
        canvasSize.width / frameSize.width,
        canvasSize.height / frameSize.height,
      );
      const centerX = (canvasSize.width - frameSize.width * ratio) / 2;
      const centerY = (canvasSize.height - frameSize.height * ratio) / 2;
      return [
        0,
        0,
        frameSize.width,
        frameSize.height,
        centerX,
        centerY,
        frameSize.width * ratio,
        frameSize.height * ratio,
      ];
    }

    case "cover": {
      const ratio = Math.max(
        canvasSize.width / frameSize.width,
        canvasSize.height / frameSize.height,
      );
      const centerX = (canvasSize.width - frameSize.width * ratio) / 2;
      const centerY = (canvasSize.height - frameSize.height * ratio) / 2;
      return [
        0,
        0,
        frameSize.width,
        frameSize.height,
        centerX,
        centerY,
        frameSize.width * ratio,
        frameSize.height * ratio,
      ];
    }

    default:
      return [0, 0];
  }
};

export const GsapKonvaGifTest = React.forwardRef(({ src, ...props }, ref) => {
  // default state
  const [state, update] = usePlayerState({ autoPlay: false });
  const imageRef = React.useRef(null);
  const { width = 0, height = 0 } = props;
  /// https://upload.wikimedia.org/wikipedia/commons/5/55/John_William_Waterhouse_A_Mermaid.jpg
  //   console.log("gif state", state);
  const { index, frames, length } = state;
  //   console.log("index", index);

  useImperativeHandle(
    ref,
    () => {
      // return our API
      return {
        start(startAt) {
          if (ref) {
            console.log("onGif the video now", startAt);
            const stopState = { ...state, playing: true };
            update(stopState);
          }
        },
        pause() {
          if (ref) {
            console.log("onGif pause the video now");
            const stopState = { ...state, playing: false };
            update(stopState);
          }
        },
        frameUpdate(frame = 1) {
          if (ref) {
            console.log("onGif pause the video now");
            const stopState = { ...state, playing: false };
            update(({ index }) => ({ index: frame }));
          }
        },
      };
    },
    [],
  );

  //  load and parse gif
  useWorkerParser(src, update);

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const canvasRef = React.useMemo(() => {
    const element = document.createElement("canvas");
    return element;
  }, []);

  React.useEffect(() => {
    // const canvas = document.createElement("canvas");
    var ctx = canvasRef.getContext("2d");
    if (length > 0) {
      const imageData = frames[index];
      if (imageData) {
        const width = imageData.width;
        const height = imageData.height;
        canvasRef.width = width;
        canvasRef.height = height;
        ctx.putImageData(imageData, 0, 0);
        // ctx.drawImage(imageData, 0, 0, width, height);
        imageRef.current.cache();
        imageRef.current.getLayer().batchDraw();
      }
    }
  }, [index, frames]);

  // render frames
  // return <Canvas {...state} ref={gifRef} />;
  // updates current index
  // usePlayback(state, () => update(({ index }) => ({ index: index + 1 })));
  usePlayback(state, () => update(({ index }) => ({ index: index + 1 })));

  return <Image x={10} y={20} ref={imageRef} image={canvasRef} {...props} />;
});
