import React from "react";
import { ThreeCanvas, useVideoTexture } from "@remotion/three";

export const ThreeCanvasAnim = ({ videoRef, width, height }) => {
  const videoTexture = useVideoTexture(videoRef);

  console.log("videoText", videoTexture);

  return (
    <>
      <ThreeCanvas linear width={width} height={height}>
        <ambientLight intensity={1.5} color={0xffffff} />
        <pointLight position={[10, 10, 0]} />
        <mesh position={[0, 0, 0]}>
          <planeBufferGeometry attach="geometry" args={[16, 9]} />
          {videoTexture ? (
            <meshBasicMaterial
              color={0xffffff}
              toneMapped={false}
              map={videoTexture}
            />
          ) : null}
        </mesh>
      </ThreeCanvas>
    </>
  );
};
