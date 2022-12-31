import RemotionRoot from "./RemotionRoot";
import { PlayerContextProvider } from "./context/PlayerContext";
import { CanvasContextProvider } from "./context/CanvasContext";
import React from "react";

export default function App() {
  return (
    <CanvasContextProvider>
      <PlayerContextProvider>
        <RemotionRoot />
      </PlayerContextProvider>
    </CanvasContextProvider>
  );
}
