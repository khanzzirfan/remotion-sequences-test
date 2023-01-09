import React from "react";
import { Sequence, useVideoConfig, AbsoluteFill, Video } from "remotion";
import { isEmpty } from "lodash";
import { Gif } from "@remotion/gif";
import { ThreeCanvasAnim } from "../ThreeCanvas";

export const VideoCompositionThree = ({ data, gifData }) => {
  console.log("data", data);
  console.log("gifData", gifData);
  const { width, height } = useVideoConfig();
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const gifRef = React.useRef(null);

  const [canvasNodesRef, setCanvasNodesRef] = React.useState([]);
  const [imageNodesRef, setImageNodesRef] = React.useState([]);

  return (
    <Sequence from={0}>
      <AbsoluteFill>
        {!isEmpty(data) &&
          data.length > 0 &&
          data.map((val, idx) => {
            return (
              <Sequence
                key={val.id}
                from={idx === 0 ? val.start : val.start}
                durationInFrames={val.end}
              >
                <AbsoluteFill>
                  <Video
                    ref={videoRef}
                    // Hide the original video tag
                    style={{ opacity: 0 }}
                    src={val.src}
                    startFrom={val.vidStartAt}
                    endAt={val.vidEndAt}
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
      <AbsoluteFill>
        {gifData &&
          gifData.map((val, idx) => (
            <Sequence
              key={val.id}
              from={idx === 0 ? val.start : val.start}
              durationInFrames={val.end}
            >
              <Gif
                style={{ opacity: 0 }}
                src={val.src}
                durationInFrames={10}
                width={300}
                height={300}
                fit="fill"
                ref={gifRef}
              />
              <ThreeCanvasAnim
                width={width}
                height={height}
                videoRef={gifRef}
                startFrom={val.start}
                end={val.end}
              />
            </Sequence>
          ))}
      </AbsoluteFill>
    </Sequence>
  );
};
