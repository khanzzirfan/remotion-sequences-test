import React, { useState } from "react";
import { Sequence, useVideoConfig, AbsoluteFill, Video } from "remotion";
import VideoSequences from "../VideoSequences";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";
import { isEmpty } from "lodash";
import { PlayerContext, PlayState } from "../context/PlayerContext";
import { CanvasContext } from "../context/CanvasContext";
import KonvaImageContext from "../konvacontext/KonvaImageContext";
import { Flex, Icon, Text } from "@chakra-ui/react";
import GsapVideoTest from "./GsapVideoTest";

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
      <Flex>
        {/* <GsapKonvaGifTest
          src={"https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif"}
        /> */}
      </Flex>
      <AbsoluteFill>
        <GsapVideoTest />
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
