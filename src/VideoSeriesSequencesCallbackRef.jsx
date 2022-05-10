import React from "react";
import { Series, useVideoConfig, AbsoluteFill } from "remotion";
import VideoSequences from "./VideoSequences";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";
import { isEmpty } from "lodash";
import useHookWithRefCallback from "./useRefWithCallback";

export const VideoCompositionSeriesSequencesCallbackRef = ({ data }) => {
  const { width, height } = useVideoConfig();

  // const [imageRef, setImageRef] = useHookWithRefCallback();
  const [canvasRef, setCanvasRef] = useHookWithRefCallback();
  const imageRef = React.useRef(null);
  console.log("canvas", canvasRef);
  console.log("image", imageRef);
  console.log("data", data);

  return (
    <AbsoluteFill>
      <Series>
        {data.map((val, idx) => {
          return (
            <Series.Sequence key={val.id} durationInFrames={val.end}>
              <AbsoluteFill>
                <VideoSequences
                  width={width}
                  height={height}
                  startFrom={val.start}
                  durationInFrames={val.end}
                  canvasRef={canvasRef}
                  imageRef={imageRef}
                  src={val.src}
                />

                {/** Render a Konva Stage with Video Canvas */}
                <Stage width={width} height={height}>
                  <Layer>
                    <Group draggable x={1} y={1}>
                      <Rect
                        width={width}
                        height={height}
                        fill="red"
                        shadowBlur={10}
                      />
                      {/* <Image image={canvasRef.current} ref={setImageRef} /> */}
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
                </Stage>
              </AbsoluteFill>
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
