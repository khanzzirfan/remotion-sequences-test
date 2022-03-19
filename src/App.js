import { Player } from "@remotion/player";
import { VideoComposition } from "./VideoComposition";
import { VideoCompositionOneRef } from "./videoCompositionOneRef";
import { VideoCompositionSeriesSequences } from "./VideoSeriesSequences";
import { VideoCompositionSeriesSequencesCallbackRef } from "./VideoSeriesSequencesCallbackRef";
import React, { useState } from "react";

const resolveRedirect = async (video) => {
  const res = await fetch(video);
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

export default function App() {
  const [play, setPlay] = useState(false);
  const playerRef = React.useRef(null);
  const [data, setData] = useState([]);
  const [shapes, setShapes] = useState([]);

  const src0 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const src1 =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  React.useEffect(() => {
    // const videoObj = [
    //   {
    //     start: 0,
    //     end: 50,
    //     id: 1,
    //     src: src1,
    //   },
    //   {
    //     start: 50,
    //     end: 100,
    //     id: 2,
    //     src: src1,
    //   },
    //   {
    //     start: 100,
    //     end: 200,
    //     id: 6,
    //     src: src1,
    //   },
    //   {
    //     start: 200,
    //     end: 300,
    //     id: 50,
    //     src: src1,
    //   },
    // ];
    // setData(videoObj);
    // const shapesObj = [
    //   {
    //     start: 0,
    //     end: 100,
    //     id: 300,
    //   },
    //   {
    //     start: 100,
    //     end: 300,
    //     id: 500,
    //   },
    // ];
    // setShapes(shapesObj);

    Promise.all([resolveRedirect(src1)]).then((vids) => {
      vids.forEach((vid) => preload(vid));
      console.log("vids", vids);
      // setResolvedUrls(vids);
      const videoObj = [
        {
          start: 0,
          end: 50,
          id: 1,
          src: vids[0],
        },
        {
          start: 50,
          end: 100,
          id: 2,
          src: vids[0],
        },
        {
          start: 100,
          end: 200,
          id: 3,
          src: vids[0],
        },
        {
          start: 200,
          end: 300,
          id: 4,
          src: vids[0],
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
    const { current } = playerRef;
    if (!current) {
      return;
    }

    const handlePause = () => {
      console.log("paused");
      setPlay(false);
    };

    const handlePlay = () => {
      console.log("play triggered");
      setPlay(true);
    };

    current.addEventListener("pause", handlePause);
    current.addEventListener("play", handlePlay);
    return () => {
      current.removeEventListener("pause", handlePause);
      current.removeEventListener("play", handlePlay);
    };
  }, []);

  // const onUpdate = React.useCallback(() => {
  //   const videoObj = [];
  //   setData(videoObj);
  // }, []);
  const size = { width: window.innerWidth, height: window.innerHeight };
  return (
    <div>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Player
          ref={playerRef}
          style={{ width: "100%", height: "100%" }}
          component={VideoCompositionSeriesSequencesCallbackRef}
          durationInFrames={300}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={20}
          controls
          inputProps={{ play, size, data, shapes }}
        />
      </div>
    </div>
  );
}
