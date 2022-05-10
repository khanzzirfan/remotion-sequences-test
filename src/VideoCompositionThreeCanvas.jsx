import React from "react";
import { Sequence, useVideoConfig, AbsoluteFill, Video } from "remotion";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";
import { isEmpty } from "lodash";
import { Html } from "react-konva-utils";
import { ThreeCanvasAnim } from "./ThreeCanvas";
import useHookWithRefCallback from "./useRefWithCallback";

const container = {
  backgroundColor: "white",
};

export const VideoCompositionThreeCanvas = ({ data, play }) => {
  console.log("data", { data, play });
  const { width, height } = useVideoConfig();
  const [videoRef, setVideoRef] = useHookWithRefCallback();

  return (
    <Sequence from={0}>
      <AbsoluteFill style={container}>
        {!isEmpty(data) &&
          data.map((val, idx) => {
            return (
              <Sequence
                key={val.id}
                from={idx === 0 ? val.start : val.start}
                durationInFrames={val.end}
              >
                <AbsoluteFill>
                  <Video
                    ref={setVideoRef}
                    // Hide the original video tag
                    style={{ opacity: 0 }}
                    src={val.src}
                    startFrom={val.start}
                    endAt={val.end}
                    crossOrigin="anonymous"
                  />
                </AbsoluteFill>

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
                      <Html divProps={{ style: { pointerEvents: "none" } }}>
                        <ThreeCanvasAnim
                          width={width}
                          height={height}
                          videoRef={videoRef}
                          startFrom={val.start}
                          end={val.end}
                        />
                      </Html>
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
              </Sequence>
            );
          })}
      </AbsoluteFill>
    </Sequence>
  );
};
