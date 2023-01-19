import React, { Fragment, useState } from "react";
import { Flex, Icon, Text, Box, Button } from "@chakra-ui/react";
import { GsapContext } from "../context/GsapReactContext";
import { PlayerContext } from "../context/PlayerContext";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";
import { isEmpty } from "lodash";
import { Controls, PlayState, Timeline, Tween } from "react-gsap";
import { Boxes } from "./Boxes";

export default function Root() {
  const [data, setData] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [gifData, setGif] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const videoRefs = React.useRef([]);
  const videoGroupRefs = React.useRef([]);

  // Gif Refs
  const gifRefs = React.useRef([]);
  const gifGroupRefs = React.useRef([]);

  const src0 = "http://vjs.zencdn.net/v/oceans.mp4";
  const src1 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  const src2 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  const src3 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

  const allGifs = [
    "https://media.giphy.com/media/3orieS4jfHJaKwkeli/giphy.gif",
    "https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif",
    "https://media.giphy.com/media/YrTJKOe0FhQJAUXTyp/giphy-downsized-large.gif",
    "https://media.giphy.com/media/kHsNGykRSXwhPw4Q7M/giphy.gif",
  ];
  // src1, src2, src3
  const allVid = [src0, src1, src2, src3];

  const onStartVideo = (refId, startAt) => {
    console.log("onStartVideo id", refId);
    if (refId && !isEmpty(videoRefs.current[refId])) {
      console.log(videoRefs.current[refId]);
      videoRefs.current[refId].start(startAt);
    }
  };

  const onStartGif = (refId, startAt) => {
    console.log("onGifStarting id", refId);
    if (refId && !isEmpty(gifRefs.current[refId])) {
      console.log("ref gifref", gifRefs.current[refId]);
      gifRefs.current[refId].start(startAt);
    }
  };

  const onCompleteVideo = (refId) => {
    console.log("onCompleteVideo animation id", refId);
    if (refId && !isEmpty(videoRefs.current[refId])) {
      videoRefs.current[refId].pause();
      videoRefs.current[refId].onComplete();
    }
  };

  const onCompleteGif = (refId) => {
    console.log("onComplete Gif animation id", refId);
    if (refId && !isEmpty(gifRefs.current[refId])) {
      gifRefs.current[refId].pause();
      gifRefs.current[refId].onComplete();
    }
  };

  const onInterrupt = (refId) => {
    console.log("interrupting", refId);
  };

  const onUpdate = (refId) => {
    console.log("timeline paused", ctxTimeLine.paused());
    if (ctxTimeLine.paused()) {
      console.log("onUpdate", refId);
    }
  };

  const width = 1200;
  const height = 800;

  //   console.log("contextPlaying", ctxPlay);
  console.log("contexRef", gifGroupRefs);
  console.log("gifData", gifData);
  return (
    <Flex flexDir={"column"}>
      <Flex flexDir={"row"}>
        <Flex flexDir={"column"}>
          <Flex
            style={{ width: "1200px", height: "800px" }}
            data-testid="controltimeline"
            // sx={{
            //   "& > div": {
            //     display: "flex",
            //     flex: 1,
            //     width: "100%",
            //   },
            // }}
          >
            <Controls playState={PlayState.stop}>
              <Timeline
                target={
                  <Fragment>
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        background: "#ccc",
                      }}
                    />
                    <Boxes />
                  </Fragment>
                }
              >
                <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={2} />
                <Tween to={{ x: "200px" }} target="div1" />
                <Tween to={{ rotation: 180 }} target="div2" position="+=1" />
                <Tween
                  to={{ x: "200px", rotation: 180 }}
                  target="stageRef"
                  position="3"
                />
              </Timeline>
            </Controls>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
