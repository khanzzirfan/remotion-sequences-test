import RemotionRoot from "./RemotionRoot";
import GsapRoot from "./gsap-test/GsapRoot";
import RemotionThreeRoot from "./remotion-test/Root";
import GsapVideoPlayer from "./gsap-test/GsapVideoTest";
import { PlayerContextProvider } from "./context/PlayerContext";
import { CanvasContextProvider } from "./context/CanvasContext";
import { GsapTimelineContextProvider } from "./context/GsapTimelineContext";
import { GsapContextProvider } from "./context/GsapReactContext";
import React from "react";

export default function App() {
  return (
    <CanvasContextProvider>
      <GsapTimelineContextProvider>
        <GsapContextProvider>
          <PlayerContextProvider>
            {/* <RemotionRoot /> */}
            {/* <GsapRoot /> */}
            <GsapVideoPlayer />
            {/* <RemotionThreeRoot /> */}
          </PlayerContextProvider>
        </GsapContextProvider>
      </GsapTimelineContextProvider>
    </CanvasContextProvider>
  );
}
