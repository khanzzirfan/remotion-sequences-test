import React from "react";
import { Flex, Icon, Text, Box, Button } from "@chakra-ui/react";
import { GsapContext } from "../context/GsapReactContext";
// import useDebounce from '../useDebounce';

export const CurrentTime = () => {
  const rafRef = React.useRef();
  const { playerTimeRef } = React.useContext(GsapContext);
  const [time, setTime] = React.useState(0);

  const animate = (time) => {
    if (playerTimeRef && playerTimeRef.current) {
      setTime(playerTimeRef.current);
    }
    rafRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // Make sure the effect runs only once

  return (
    <Flex flexDir={"row"}>
      <Text>CurrentGsapTime: {time}</Text>
    </Flex>
  );
};
