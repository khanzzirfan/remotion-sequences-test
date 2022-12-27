import React from "react";
import { Sequence, useVideoConfig, AbsoluteFill, Video } from "remotion";
import { isEmpty } from "lodash";
import useHookWithRefCallback from "./useRefWithCallback";
import { MovableStar } from "./components/MovableStar";

const container = {
  backgroundColor: "white",
};

export const VidCompositionWithHtml = ({ data, play, shapes }) => {
  //   console.log("data", { data, play, shapes });
  const { width, height } = useVideoConfig();
  const [videoRef, setVideoRef] = useHookWithRefCallback();

  return (
    <Sequence from={0}>
      <AbsoluteFill style={container}>
        {!isEmpty(data) &&
          data.map((val, idx) => {
            return (
              <Sequence
                key={val.id}
                from={idx === 0 ? val.start : val.start}
                durationInFrames={val.end}
              >
                <AbsoluteFill>
                  <Video
                    ref={setVideoRef}
                    // Hide the original video tag
                    src={val.src}
                    startFrom={val.start}
                    endAt={val.end}
                    crossOrigin="anonymous"
                  />
                </AbsoluteFill>
                <AbsoluteFill>
                  <MovableStar />
                </AbsoluteFill>
              </Sequence>
            );
          })}
      </AbsoluteFill>
    </Sequence>
  );
};
