import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

// the first very simple and recommended way:
const KonvaImage = React.forwardRef(({ src, ...props }, ref) => {
  const [image] = useImage(src);
  return <Image ref={ref} image={image} {...props} />;
});

export default KonvaImage;
