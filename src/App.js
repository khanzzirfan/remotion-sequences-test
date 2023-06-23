import RemotionRoot from "./RemotionRoot";
import GsapRoot from "./gsap-test/GsapRoot";
import RemotionThreeRoot from "./remotion-test/Root";
import GsapVideoPlayer from "./gsap-test/GsapVideoTest";
import { PlayerContextProvider } from "./context/PlayerContext";
import { CanvasContextProvider } from "./context/CanvasContext";
import { GsapTimelineContextProvider } from "./context/GsapTimelineContext";
import { GsapContextProvider } from "./context/GsapReactContext";
import ReactNativeGsapRoot from "./react-gsap-test/ReactGsapRoot";
// import { PixiRoot } from "./pixi/PixiRoot";
import React from "react";

export default function App() {
  return (
    <>
      {/* <PixiRoot /> */}
      <CanvasContextProvider>
        <GsapTimelineContextProvider>
          <GsapContextProvider>
            <PlayerContextProvider>
              {/* <RemotionRoot /> */}
              {/* <GsapRoot /> */}
              <GsapVideoPlayer />
              {/* <RemotionThreeRoot /> */}
              {/* <ReactNativeGsapRoot /> */}
            </PlayerContextProvider>
          </GsapContextProvider>
        </GsapTimelineContextProvider>
      </CanvasContextProvider>
    </>
  );
}
