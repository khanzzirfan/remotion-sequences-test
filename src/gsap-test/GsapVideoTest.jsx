import React, { useState } from "react";
import { Flex, Icon, Text, Box, Button } from "@chakra-ui/react";
import { GsapContext } from "../context/GsapReactContext";
import { PlayerContext, PlayState } from "../context/PlayerContext";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";
import { isEmpty } from "lodash";
import GsapKonvaVideoAnimTest from "./GsapKonvaVideoAnimTest";
import { CurrentTime } from "./CurrentTime";
import { GsapKonvaGifTest } from "./GsapKonvaGifTest";

const resolveRedirect = async (video) => {
  const res = await fetch(video, {
    mode: "cors",
  });
  return res.url;
};

const preload = async (video) => {
  const url = await resolveRedirect(video);
  console.log(url);
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = "video";
  document.head.appendChild(link);
};

export default function Root() {
  const [data, setData] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [gifData, setGif] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const videoRefs = React.useRef([]);
  const videoGroupRefs = React.useRef([]);

  const { playerState } = React.useContext(PlayerContext);

  const {
    addToTimeline,
    addVideoToTimeline,
    timeline: ctxTimeLine,
    play: ctxPlay,
    parentElementRef,
    time: ctxTime,
    addTotalDuration: ctxSetTotalDuration,
    handleRestart: ctxRestart,
    handleRepeat: ctxRepeat,
    handleSeek: ctxSeek,
    handlePlay,
    handlePause,
    playerTimeRef,
  } = React.useContext(GsapContext);

  const src0 = "http://vjs.zencdn.net/v/oceans.mp4";
  const src1 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  const src2 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  const src3 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

  const gifMedia = "https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif";

  // src1, src2, src3
  const allVid = [src0, src1, src2, src3];

  const onStartVideo = (refId, startAt) => {
    console.log("onStartVideo id", refId);
    if (refId && !isEmpty(videoRefs.current[refId])) {
      console.log(videoRefs.current[refId]);
      videoRefs.current[refId].start(startAt);
    }
  };

  const onCompleteVideo = (refId) => {
    console.log("onCompleteVideo animation id", refId);
    if (refId && !isEmpty(videoRefs.current[refId])) {
      videoRefs.current[refId].pause();
      // ctxTimeLine.to(videoGroupRefs.current[refId], {
      //   opacity: 0,
      //   duration: 0.1,
      // });
    }
  };

  React.useEffect(() => {
    if (playerState === PlayState.PLAY) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [playerState, handlePlay, handlePause]);

  React.useEffect(() => {
    Promise.all([
      resolveRedirect(allVid[0]),
      resolveRedirect(allVid[1]),
      resolveRedirect(allVid[2]),
      resolveRedirect(allVid[3]),
    ]).then((vids) => {
      vids.forEach((vid) => preload(vid));
      console.log("vids", vids);
      // setResolvedUrls(vids);
      const videoObj = [
        {
          start: 0,
          x: 0,
          end: 5,
          width: 100,
          id: "eWRhpRV",
          vidStartAt: 1,
          vidEndAt: 6,
          src: vids[0],
        },
        {
          start: 5,
          end: 10,
          x: 50,
          y: 50,
          width: 100,
          id: "23TplPdS",
          vidStartAt: 0,
          vidEndAt: 5,
          src: vids[1],
        },
        {
          start: 10,
          end: 15,
          width: 100,
          x: 70,
          y: 200,
          id: "46Juzcyx",
          vidStartAt: 0,
          vidEndAt: 5,
          src: vids[2], //vids[0],
        },
        {
          start: 15,
          end: 20,
          x: 100,
          y: 300,
          width: 100,
          id: "2WEKaVNO",
          vidStartAt: 0,
          vidEndAt: 5,
          src: vids[3],
        },
      ];
      setData(videoObj);
      const shapesObj = [
        {
          start: 0,
          end: 2,
          id: "shapes",
          x: 200,
        },
        {
          start: 2,
          end: 6,
          id: "shapes2",
          x: -200,
        },
      ];
      setShapes(shapesObj);
      shapesObj.forEach((eachObj) => {
        addToTimeline(
          `#${eachObj.id}`,
          {
            x: eachObj.x,
            opacity: 1,
            duration: 1,
            onComplete: onCompleteVideo,
            onCompleteParams: [eachObj.id],
          },
          2,
        );
      });
      shapesObj.forEach((eachObj) => {
        addToTimeline(
          `#${eachObj.id}`,
          {
            x: 1,
            opacity: 0,
            duration: 1,
            // delay: 3,
            onComplete: onCompleteVideo,
            onCompleteParams: [eachObj.id],
          },
          6,
        );
      });
      setGif([gifMedia]);
      setIsReady(true);
      // ctxSetTotalDuration(50);
    });
  }, []);

  React.useEffect(() => {
    if (isReady) {
      data.forEach((ev) => {
        addVideoToTimeline(
          videoRefs.current[ev.id],
          videoGroupRefs.current[ev.id],
          {
            duration: ev.end - ev.start,
            onStart: onStartVideo,
            onComplete: onCompleteVideo,
            onStartParams: [ev.id, ev.vidStartAt],
            onCompleteParams: [ev.id],
          },
          ev.start,
          ev.end,
        );
      });
    }
  }, [data, isReady]);

  const width = 1200;
  const height = 800;

  //   console.log("contextPlaying", ctxPlay);
  // console.log("contexRef", videoRefs);
  return (
    <Flex flexDir={"column"}>
      <Box>
        <CurrentTime />
        <Box>
          <Button onClick={ctxRestart}>Play</Button>
          <Button onClick={handlePause}>Pause</Button>
          <Button onClick={handlePlay}>Resume</Button>
          <Button onClick={ctxSeek}>Seek</Button>
        </Box>
      </Box>
      <Flex flexDir={"row"}>
        <Flex flexDir={"column"}>
          <Flex style={{ width: "1200px", height: "800px" }}>
            <Stage width={width} height={height} ref={parentElementRef}>
              <Layer>
                <Group draggable x={1} y={1}>
                  {data &&
                    data.map((eachVid, idx) => (
                      <Group
                        key={eachVid.id}
                        ref={(vref) =>
                          (videoGroupRefs.current[eachVid.id] = vref)
                        }
                        x={eachVid.x}
                        y={eachVid.y}
                        width={eachVid.width}
                        opacity={idx === 0 ? 1 : 0}
                      >
                        <GsapKonvaVideoAnimTest
                          src={eachVid.src}
                          key={eachVid.id}
                          ref={(vref) => (videoRefs.current[eachVid.id] = vref)}
                        />
                      </Group>
                    ))}
                  {/* <KonvaVideoAnim src={val.src} play={play} /> */}
                </Group>
                <Group id="shapes">
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
                <Group id="shapes2">
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
                <Group id="giftest">
                  <Rect
                    width={width}
                    height={height}
                    fill="green"
                    shadowBlur={10}
                  />
                  <GsapKonvaGifTest src="https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif" />
                </Group>
              </Layer>
            </Stage>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
