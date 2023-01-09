import React, { useState } from "react";
import { Sequence, useVideoConfig, AbsoluteFill, Video } from "remotion";
import VideoSequences from "../VideoSequences";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";
import { isEmpty } from "lodash";
import { PlayerContext, PlayState } from "../context/PlayerContext";
import { CanvasContext } from "../context/CanvasContext";
import KonvaImageContext from "../konvacontext/KonvaImageContext";
import { Flex, Icon, Text } from "@chakra-ui/react";

export const GsapRemotionSyncTestWithKonva = ({ data }) => {
  // console.log("data", { data, play });
  const { width, height } = useVideoConfig();
  const imageRef = React.useRef([]);
  const { playerState } = React.useContext(PlayerContext);
  const { canvasRef } = React.useContext(CanvasContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const timeRender = (time) => {
    const float = (parseInt((time % 1) * 100 + "") + "").padStart(2, "0");
    const min = (parseInt(time / 60 + "") + "").padStart(2, "0");
    const second = (parseInt((time % 60) + "") + "").padStart(2, "0");
    return <>{`${min}:${second}.${float.replace("0.", "")}`}</>;
  };

  return (
    <Sequence from={0}>
      <AbsoluteFill>
        {!isEmpty(data) &&
          data.map((val, idx) => {
            return (
              <Sequence
                key={val.id}
                from={idx === 0 ? val.start : val.start}
                durationInFrames={val.end}
              >
                <AbsoluteFill>
                  <VideoSequences
                    width={width}
                    height={height}
                    startFrom={val.vidStartAt}
                    durationInFrames={val.vidEndAt}
                    canvasRef={canvasRef}
                    imageRef={imageRef}
                    src={val.src}
                  />
                  {/** Render a Konva Stage with Video Canvas */}
                  <Stage width={width} height={height}>
                    <CanvasContext.Provider value={value}>
                      <Layer>
                        <Group draggable x={1} y={1}>
                          <Rect
                            width={width}
                            height={height}
                            fill="red"
                            shadowBlur={10}
                          />
                          <KonvaImageContext />
                          {/* <Image ref={imageRef} image={canvasRef.current} /> */}
                          {/* <KonvaVideoAnim src={val.src} play={play} /> */}
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
                    </CanvasContext.Provider>
                  </Stage>
                </AbsoluteFill>
              </Sequence>
            );
          })}
      </AbsoluteFill>
      <AbsoluteFill>
        {playerState === PlayState.WAITING && (
          <p style={{ color: "white" }}>Waiting....</p>
        )}
      </AbsoluteFill>
      <AbsoluteFill>
        <Text fontSize={"2xl"}>Time Render: {timeRender(time)}</Text>
      </AbsoluteFill>
    </Sequence>
  );
};
