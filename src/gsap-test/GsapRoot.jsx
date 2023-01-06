import { Player } from "@remotion/player";
import { GsapRemotionSyncTestWithKonva } from "./GsapRemotionSyncTest";
import { PlayerContext, PlayState } from "../context/PlayerContext";
import React, { useState } from "react";
import { Flex, Icon, Text, Box, Button } from "@chakra-ui/react";
import { GsapTimelineContext } from "../context/GsapTimelineContext";
import { Boxes } from "./Boxes";
import GsapVideoTest from "./GsapVideoTest";

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
  const playerRef = React.useRef(null);
  const [data, setData] = useState([]);
  const [shapes, setShapes] = useState([]);
  const { playerState, togglePlay } = React.useContext(PlayerContext);
  const { setPlay, setTotalDuration, handleReset, getCurrentTime } =
    React.useContext(GsapTimelineContext);

  const src0 = "http://vjs.zencdn.net/v/oceans.mp4";
  const src1 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  const src2 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  const src3 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

  const allVid = [src0, src1, src2, src3];

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
          end: 50,
          id: 1,
          vidStartAt: 20,
          vidEndAt: 75,
          src: vids[0],
        },
        {
          start: 51,
          end: 100,
          id: 2,
          vidStartAt: 20,
          vidEndAt: 75,
          src: vids[1],
        },
        {
          start: 101,
          end: 300,
          id: 3,
          vidStartAt: 20,
          vidEndAt: 225,
          src: vids[2], //vids[0],
        },
        {
          start: 301,
          end: 500,
          id: 4,
          vidStartAt: 20,
          vidEndAt: 225,
          src: vids[3],
        },
      ];
      setData(videoObj);
      const shapesObj = [
        {
          start: 0,
          end: 200,
          id: 300,
        },
        {
          start: 200,
          end: 600,
          id: 500,
        },
      ];
      setShapes(shapesObj);
    });
  }, []);

  const handleOnPlay = () => {
    togglePlay(PlayState.PLAY);
    setPlay(true);
  };
  React.useEffect(() => {
    const { current } = playerRef;
    if (!current) {
      return;
    }
  }, []);

  React.useEffect(() => {
    const { current } = playerRef;
    if (!current) {
      return;
    }

    const handlePause = () => {
      console.log("paused");
      togglePlay(PlayState.Pause);
      setPlay(false);
    };

    const handlePlay = () => {
      console.log("play triggered");
      togglePlay(PlayState.PLAY);
      setPlay(true);
    };

    const handleOnEnd = () => {
      console.log("play end video");
      togglePlay(PlayState.STOP);
      setPlay(false);
      handleReset();
    };

    current.addEventListener("pause", handlePause);
    current.addEventListener("play", handlePlay);
    current.addEventListener("ended", handleOnEnd);
    return () => {
      current.removeEventListener("pause", handlePause);
      current.removeEventListener("play", handlePlay);
      current.removeEventListener("ended", handleOnEnd);
    };
  }, []);

  const size = { width: window.innerWidth, height: window.innerHeight };
  return (
    <Flex flexDir={"column"}>
      <Flex flexDir={"row"}>
        {/* <Flex flexDir={"column"}>
          <Box>
            <Text>Remotion: 00</Text>
          </Box>
          <Flex style={{ width: "600px", height: "600px" }}>
            <Player
              ref={playerRef}
              style={{ width: "100%", height: "100%" }}
              component={GsapRemotionSyncTestWithKonva}
              durationInFrames={500}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={20}
              controls
              inputProps={{
                play: playerState === PlayState.PLAY,
                size,
                data,
                shapes,
              }}
            />
          </Flex>
        </Flex> */}

        <Flex flexDir={"column"}>
          <Flex style={{ width: "600px", height: "600px" }}>
            {/* <Boxes /> */}
            <GsapVideoTest />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
