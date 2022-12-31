import React from "react";
import { Image } from "react-konva";
import { CanvasContext } from "../context/CanvasContext";

// the first very simple and recommended way:
const KonvaImageContext = (props) => {
  const imageRef = React.useRef(null);
  const { canvasRef } = React.useContext(CanvasContext);
  const rafRef = React.useRef();

  const animate = (time) => {
    // The 'state' will always be the initial value here
    if (imageRef && imageRef.current && imageRef.current.getLayer) {
      const layer = imageRef.current.getLayer();
      // imageRef.current.cache();
      if (layer) layer.batchDraw();
    }
    rafRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // Make sure the effect runs only once

  return <Image ref={imageRef} image={canvasRef.current} {...props} />;
};

export default KonvaImageContext;
