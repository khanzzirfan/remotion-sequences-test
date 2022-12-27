import React from "react";
import { Sequence, useVideoConfig, AbsoluteFill, Video } from "remotion";
import { isEmpty } from "lodash";
import { ThreeCanvasAnim } from "./ThreeCanvas";
import useHookWithRefCallback from "./useRefWithCallback";

const container = {
  backgroundColor: "white",
};

export const VCThreeCanvas = ({ data, play }) => {
  console.log("data", { data, play });
  const { width, height } = useVideoConfig();
  const [videoRef, setVideoRef] = useHookWithRefCallback();

  console.log("videoRef", videoRef);
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
                    style={{ opacity: 0 }}
                    src={val.src}
                    startFrom={val.start}
                    endAt={val.end}
                    crossOrigin="anonymous"
                  />
                </AbsoluteFill>
                {/** Render a three canvas */}
                <ThreeCanvasAnim
                  width={width}
                  height={height}
                  videoRef={videoRef}
                  startFrom={val.start}
                  end={val.end}
                />
              </Sequence>
            );
          })}
      </AbsoluteFill>
    </Sequence>
  );
};
