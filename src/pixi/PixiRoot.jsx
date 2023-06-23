import React from "react-dom";
import { times } from "lodash";
import {
  Stage,
  Container,
  Text,
  withPixiApp,
  Sprite,
  Graphics,
  useTick,
} from "@pixi/react";
import * as PIXI from "pixi.js";

const Inner = () => {
  const [x, setX] = React.useState(0);
  const mask = React.useRef();
  const i = React.useRef(0);

  useTick((delta) => {
    i.current += 0.05 * delta;
    setX(Math.cos(i.current) * 100);
  });

  return (
    <Container position={[250, 250]}>
      <Sprite
        image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        scale={[4, 4]}
        anchor={0.5}
        mask={mask.current}
      />
      <Graphics
        x={x}
        preventRedraw={true}
        draw={(g) => {
          g.beginFill(0x000000);
          g.drawCircle(-25, -25, 50);
          g.endFill();
        }}
        ref={mask}
      />
    </Container>
  );
};

export const PixiRoot = () => {
  const count = 10;
  const width = 300;
  const height = 300;
  const stageProps = {
    height,
    width,
    options: {
      backgroundAlpha: 0,
      antialias: true,
    },
  };
  return (
    <Stage width={width} height={height}>
      <Inner />
    </Stage>
  );
};
