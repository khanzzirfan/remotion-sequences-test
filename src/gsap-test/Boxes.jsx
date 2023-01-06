import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Flex, Icon, Text, Box } from "@chakra-ui/react";
import { GsapTimelineContext } from "../context/GsapTimelineContext";

export const Boxes = () => {
  const boxesRef = useRef(null);
  const { timeline } = React.useContext(GsapTimelineContext);

  useEffect(() => {
    timeline.from(boxesRef.current.children, {
      y: 50,
      autoAlpha: 0,
      duration: 0.25,
      stagger: 0.1,
      ease: "back",
    });
    // .eventCallback("onUpdate", handleProgress);
  }, [timeline]);

  return (
    <Flex flexWrap={"wrap"} className="boxes" ref={boxesRef}>
      {Array(30)
        .fill()
        .map((item, index) => (
          <Box
            sx={{
              width: "100px",
              height: "100px",
              margin: "0 10px 10px 0",
              background: "#eee",
              border: "1px solid #ddd",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#777",
            }}
            key={`${index}-box`}
            className="box"
          >
            {index + 1}
          </Box>
        ))}
    </Flex>
  );
};
