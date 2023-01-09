import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";

export default ({ textureSrc, IconPosition, IconSize }) => {
  const spriteTexture = useLoader(THREE.TextureLoader, textureSrc);
  const animator = new PlainAnimator(spriteTexture, 4, 4, 10, 10);
  const texture = animator.init();

  const mesh = useRef();

  const animate = () => {
    animator.animate();
    requestAnimationFrame(animate);
  };

  return (
    <>
      <mesh ref={mesh} position={IconPosition}>
        <boxBufferGeometry attach="geometry" args={IconSize} />
        <meshStandardMaterial
          attach="material"
          map={texture}
          transparent={true}
        />
      </mesh>
      {animate()}
    </>
  );
};
