import React, { useRef, useImperativeHandle } from "react";
import { Flex } from "@chakra-ui/react";
import { Stage, Layer, Group, Rect, Image, Star, Circle } from "react-konva";

export const Boxes = React.forwardRef(({ ...props }, ref) => {
  const div1 = useRef(null);
  const div2 = useRef([]);
  const div3 = useRef(null);
  const stageRef = useRef([]);

  useImperativeHandle(ref, () => ({
    div1,
    div2,
    div3,
    stageRef,
  }));

  return (
    <Flex flexDir={"column"}>
      <Flex
        sx={{ width: "100px", height: "100px", background: "#ccc" }}
        ref={div1}
      ></Flex>
      <Flex
        sx={{ width: "100px", height: "100px", background: "#000" }}
        ref={div2}
      ></Flex>
      <Flex
        sx={{ width: "100px", height: "100px", background: "#000" }}
        ref={div3}
      ></Flex>
      <Flex>
        <Stage
          width={500}
          height={500}
          ref={(ref) => stageRef.current.push(ref)}
        >
          <Layer>
            <Group id="shapes">
              <Circle x={200} y={100} radius={50} fill="green" />
              <Star
                x={400}
                y={400}
                numPoints={5}
                innerRadius={20}
                outerRadius={40}
                fill="#89b717"
                opacity={0.8}
              />
            </Group>
          </Layer>
        </Stage>
      </Flex>
    </Flex>
  );
});
