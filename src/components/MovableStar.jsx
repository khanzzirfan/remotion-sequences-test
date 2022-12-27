import React from "react";
import Moveable from "react-moveable";
import { setAlias, Frame } from "scenejs";
import StarSvg from "../assets/img/shapes/star-solid.svg";
import { ReactSVG } from "react-svg";
import { Box } from "@chakra-ui/react";
import MoveableHelper from "moveable-helper";
import LaunchImage from "../assets/splash/launch-640x1136.png";

setAlias("tx", ["transform", "translateX"]);
setAlias("ty", ["transform", "translateY"]);
setAlias("tz", ["transform", "translateZ"]);
setAlias("rotate", ["transform", "rotate"]);
setAlias("sx", ["transform", "scaleX"]);
setAlias("sy", ["transform", "scaleY"]);
setAlias("matrix3d", ["transform", "matrix3d"]);

export const MovableStar = () => {
  const [selectedTarget, setSelectedTarget] = React.useState(null);
  const [items, setItems] = React.useState({});
  const moveableRef = React.useRef(null);
  const boxRef = React.useRef(null);

  const [helper] = React.useState(() => {
    return new MoveableHelper();
  });

  // const [target, setTarget] = React.useState();
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: "50% 50%",
    scale: [1, 1],
  });

  const onWindowResize = React.useCallback(() => {
    moveableRef.current.updateTarget();
  }, []);

  //   React.useEffect(() => {
  //     const nextTargets = [].slice.call(document.querySelectorAll("#target1"));
  //     setSelectedTarget(nextTargets);
  //     setFrames(
  //       nextTargets.map(
  //         (frame) =>
  //           new Frame(
  //             "transform: translateX(0px) translateY(0px) rotate(0deg) scaleX(1), scaleY(1)",
  //           ),
  //       ),
  //     );
  //   }, []);

  const handleOnClickElement = React.useCallback(
    (e) => {
      const target = e.currentTarget;
      console.log(target);
      console.log(e.currentTarget);
      const id = e.currentTarget.dataset.key; // target.getAttribute("data-target");
      e.preventDefault();

      if (!id) {
        return;
      }

      let currentItems = { ...items };

      if (!items[id]) {
        currentItems = {
          ...items,
          [id]: new Frame({
            tz: "5px",
            tx: "0px",
            ty: "0px",
            rotate: "0deg",
            sx: 1,
            sy: 1,
          }),
        };
        setItems(currentItems);
      }
      if (!moveableRef.current.isMoveableElement(target)) {
        if (selectedTarget === target) {
          moveableRef.current.updateRect();
        } else {
          const nativeEvent = e.nativeEvent;
          setSelectedTarget(target);
          moveableRef.current.dragStart(nativeEvent);
        }
      }
    },
    [items, selectedTarget],
  );

  console.log(">>>> selected target <<<<<");
  console.log(selectedTarget);
  console.log(">>>> selected items <<<<<");
  console.log(frame);

  return (
    <>
      <Moveable
        ref={moveableRef}
        target={selectedTarget}
        scalable={true}
        keepRatio={false}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        rotatable={true}
        throttleRotate={0}
        rotationPosition={"top"}
        zoom={1}
        origin={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={(e) => {
          e.set(frame.translate);
        }}
        onDrag={(e) => {
          setFrame({
            ...frame,
            translate: e.beforeTranslate,
          });
        }}
        // onRotateStart={helper.onRotateStart}
        // onRotate={helper.onRotate}
        onRotateStart={(e) => {
          e.set(frame.rotate);
        }}
        onRotate={({ beforeRotate, dist }) => {
          setFrame({
            ...frame,
            rotate: beforeRotate,
          });
        }}
        onRotateEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onRotateEnd", target, isDrag);
        }}
        onScaleStart={(e) => {
          e.set(frame.scale);
          e.dragStart && e.dragStart.set(frame.translate);
        }}
        onScale={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;
          setFrame({
            ...frame,
            translate: beforeTranslate,
            scale: e.scale,
          });
          //   frame.translate = beforeTranslate;
          //   frame.scale = e.scale;
        }}
        onScaleEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onScaleEnd", target, isDrag);
        }}
        onRender={(e) => {
          const { translate, rotate, transformOrigin, scale } = frame;
          e.target.style.transformOrigin = transformOrigin;
          e.target.style.transform =
            `translate(${translate[0]}px, ${translate[1]}px)` +
            ` rotate(${rotate}deg) ` +
            ` scale(${scale[0]}, ${scale[1]})`;
        }}
      />
      <Box ref={boxRef}>
        <Box
          data-key="starsvg"
          style={{ width: 100, height: 100 }}
          onClick={handleOnClickElement}
          id="target1"
        >
          <ReactSVG src={StarSvg} />
        </Box>
        <Box
          data-key="starimage"
          style={{ width: 100, height: 100 }}
          onClick={handleOnClickElement}
          id="target1"
        >
          <img src={LaunchImage} alt={"image"} />
        </Box>
      </Box>
    </>
  );
};

MovableStar.whyDidYouRender = false;
