import React from "react";
import {
  Sequence,
  useVideoConfig,
  AbsoluteFill,
  useCurrentFrame,
} from "remotion";
import VideoSequences from "./VideoSequences";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";
import { isEmpty } from "lodash";
import useDeepEffect from "./useDeepEffect";
import useHookWithRefCallback from "./useRefWithCallback";

export const VideoCompositionWithKonvaImage = ({ data }) => {
  console.log("data", data);
  const { width, height } = useVideoConfig();
  //   const [imageRef, setImageRef] = useHookWithRefCallback();
  //   const [canvasRef, setCanvasRef] = useHookWithRefCallback();
  console.log("currentFrame", useCurrentFrame());
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  console.log("canvasRef", canvasRef);
  console.log("imageRef", imageRef);
  return (
    <Sequence from={0}>
      <AbsoluteFill>
        {true &&
          data.map((val, idx) => {
            return (
              <Sequence
                key={val.id}
                from={val.start}
                durationInFrames={val.end}
              >
                <AbsoluteFill>
                  <VideoSequences
                    width={width}
                    height={height}
                    startFrom={val.start}
                    durationInFrames={val.end}
                    canvasRef={canvasRef}
                    imageRef={imageRef}
                    src={val.src}
                    dataId={val.id}
                  />
                  {/** Render a Konva Stage with Video Canvas */}
                  {/* <Stage width={width} height={height}>
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
                        <Circle x={200} y={100} radius={50} fill="green" />
                        <Star
                          x={400}
                          y={400}
                          numPoints={5}
                          innerRadius={20}
                          outerRadius={40}
                          fill="#89b717"
                          opacity={0.8}
                        />
                      </Group>

                      <Group>
                        <Circle x={400} y={300} radius={50} fill="green" />
                        <Star
                          x={600}
                          y={500}
                          numPoints={5}
                          innerRadius={20}
                          outerRadius={40}
                          fill="#89b717"
                          opacity={0.8}
                        />
                      </Group>
                    </Layer>
                  </Stage> */}
                </AbsoluteFill>
              </Sequence>
            );
          })}
      </AbsoluteFill>
    </Sequence>
  );
};
