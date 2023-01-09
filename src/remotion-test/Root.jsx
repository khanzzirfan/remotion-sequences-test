import { Player } from "@remotion/player";
import { PlayerContext, PlayState } from "../context/PlayerContext";
import React, { useState } from "react";
import { Flex, Icon, Text, Box, Button } from "@chakra-ui/react";
import { VideoCompositionThree } from "./VideoCompositionThree";

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
  const [gifData, setGifData] = useState([]);
  const [shapes, setShapes] = useState([]);
  const { playerState, togglePlay } = React.useContext(PlayerContext);

  const src0 = "http://vjs.zencdn.net/v/oceans.mp4";
  const src1 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  const src2 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  const src3 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

  const allVid = [src0, src1, src2, src3];
  const allGifs = [
    "https://media.giphy.com/media/3orieS4jfHJaKwkeli/giphy.gif",
    "https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif",
    "https://media.giphy.com/media/YrTJKOe0FhQJAUXTyp/giphy-downsized-large.gif",
    "https://media.giphy.com/media/kHsNGykRSXwhPw4Q7M/giphy.gif",
  ];

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

  React.useEffect(() => {
    Promise.all([
      resolveRedirect(allGifs[0]),
      resolveRedirect(allGifs[1]),
      resolveRedirect(allGifs[2]),
      resolveRedirect(allGifs[3]),
    ]).then((vids) => {
      const gifObj = [
        {
          start: 0,
          end: 50,
          id: 1,
          src: vids[0],
        },
        {
          start: 51,
          end: 100,
          id: 2,
          src: vids[1],
        },
        {
          start: 101,
          end: 300,
          id: 3,
          src: vids[2], //vids[0],
        },
        {
          start: 301,
          end: 500,
          id: 4,
          src: vids[3],
        },
      ];
      setGifData(gifObj);
    });
  }, []);

  const handleOnPlay = () => {
    togglePlay(PlayState.PLAY);
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
    };

    const handlePlay = () => {
      console.log("play triggered");
      togglePlay(PlayState.PLAY);
    };

    const handleOnEnd = () => {
      console.log("play end video");
      togglePlay(PlayState.STOP);
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
        <Flex flexDir={"column"}>
          <Box>
            <Text>Remotion: 00</Text>
          </Box>
          <Flex style={{ width: "1200px", height: "900px" }}>
            <Player
              ref={playerRef}
              style={{ width: "100%", height: "100%" }}
              component={VideoCompositionThree}
              durationInFrames={500}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={20}
              controls
              inputProps={{
                play: playerState === PlayState.PLAY,
                size,
                data,
                gifData,
                shapes,
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

/**
 * 
 * 
 * <Flex flexDir={"column"}>
          <Flex style={{ width: "600px", height: "600px" }}>
            <Boxes /> 
            <GsapVideoTest />
          </Flex>
        </Flex>
 */
