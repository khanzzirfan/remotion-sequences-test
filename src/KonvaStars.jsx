import React from "react";
import {
  Sequence,
  useVideoConfig,
  AbsoluteFill,
  useCurrentFrame,
} from "remotion";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";
import { isEmpty } from "lodash";
import { Controls, PlayState, Timeline, Tween } from "react-gsap";
import gsap from "gsap";
import KonvaImage from "./components/KonvaImage";

export const KonvaGsapElements = ({ data, play }) => {
  console.log("data play", data, play);
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const blueStarRef = React.useRef(null);
  const greenStarRef = React.useRef(null);
  const iconsRef = React.useRef([]);
  const el = React.useRef();
  const { width, height } = useVideoConfig();
  console.log("currentFrame", useCurrentFrame());

  const iconsArray = [
    {
      src: "https://www.greensock.com/_img/codepen/icon_robust.png",
      width: "83",
      height: "59",
      x: 0,
      y: 300,
    },
    {
      src: "https://www.greensock.com/_img/codepen/icon_overwrite.png",
      width: "43",
      height: "59",
      x: 150,
      y: 300,
    },
    {
      src: "https://www.greensock.com/_img/codepen/icon_compatible.png",
      width: "73",
      height: "59",
      x: 250,
      y: 300,
    },
    {
      src: "https://www.greensock.com/_img/codepen/icon_support.png",
      width: "83",
      height: "59",
      x: 350,
      y: 300,
    },
    {
      src: "https://www.greensock.com/_img/codepen/icon_plugin.png",
      width: "76",
      height: "59",
      x: 480,
      y: 300,
    },
  ];

  const [playState, setPlayState] = React.useState(PlayState.pause);
  const [totalProgress, setTotalProgress] = React.useState(0);

  const timeline = React.useCallback(gsap.timeline({ paused: true }), []);
  const q = React.useMemo(() => gsap.utils.selector(el), []);

  console.log("canvasRef", canvasRef);
  console.log("imageRef", imageRef);
  console.log("icons ref", iconsRef);

  // Run Tween based on Play  status
  React.useEffect(() => {
    if (play) {
      setPlayState(PlayState.play);
      timeline.play();
    } else {
      setPlayState(PlayState.stop);
      timeline.pause();
    }
  }, [play, timeline]);

  React.useEffect(() => {
    timeline
      .from(blueStarRef.current, {
        y: 50,
        autoAlpha: 0,
        duration: 0.25,
        stagger: 0.1,
        ease: "back",
      })
      .to(blueStarRef.current, {
        x: 300,
        duration: 1,
        delay: 2,
      })
      .fromTo(
        greenStarRef.current,
        {
          x: -100,
        },
        { duration: 2, x: 300 },
        2,
      )
      .set(greenStarRef.current, {
        opacity: 0,
        delay: 3,
      })
      .to(iconsRef.current, { x: 300, stagger: 0.2, autoAlpha: 0 }, 1);
    // .staggerFrom(iconsRef.current, 0.2, { scale: 0, autoAlpha: 0 }, 0.1);
  }, [timeline]);

  return (
    <Sequence from={0}>
      <AbsoluteFill>
        <Timeline
          playState={playState}
          totalProgress={totalProgress}
          target={
            <div
              style={{ width: "100px", height: "100px", background: "#ccc" }}
            />
          }
        >
          <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={2} />
          <Tween to={{ x: "200px" }} />
          <Tween to={{ rotation: 180 }} position="+=1" />
        </Timeline>
      </AbsoluteFill>
      <AbsoluteFill style={{ marginTop: "150px" }}>
        <AbsoluteFill>
          {/** Render a Konva Stage with Video Canvas */}
          <Stage width={width} height={height} key={`konvastage`}>
            <Layer>
              <Group draggable x={1} y={1}>
                <Rect
                  width={width}
                  height={height}
                  fill="red"
                  shadowBlur={10}
                />
                <Image image={canvasRef.current} ref={imageRef} />
              </Group>
              <Group>
                <Circle x={50} y={100} radius={50} fill="blue" />
                <Star
                  ref={blueStarRef}
                  x={100}
                  y={200}
                  numPoints={5}
                  innerRadius={20}
                  outerRadius={40}
                  fill="blue"
                  opacity={0.8}
                />
              </Group>

              <Group>
                <Circle x={200} y={300} radius={50} fill="green" />
                <Star
                  ref={greenStarRef}
                  x={300}
                  y={400}
                  numPoints={5}
                  innerRadius={20}
                  outerRadius={40}
                  fill="green"
                  opacity={0.8}
                />
              </Group>
              {true &&
                iconsArray.map((val, idx) => {
                  return (
                    <KonvaImage
                      {...val}
                      key={val.src}
                      ref={(img) => (iconsRef.current[idx] = img)}
                    />
                  );
                })}
            </Layer>
          </Stage>
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};
