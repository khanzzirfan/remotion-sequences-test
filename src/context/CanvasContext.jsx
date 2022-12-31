import React, { useState } from "react";
// Context has been created
const CanvasContext = React.createContext(false);

// Provider
const CanvasContextProvider = ({ children }) => {
  const [dimension, setDimensions] = React.useState({
    width: 100,
    height: 100,
  });
  const canvasRef = React.useRef(null);
  return (
    <CanvasContext.Provider value={{ canvasRef, setDimensions }}>
      <>
        <div style={{ position: "absolute", opacity: 0, marginLeft: 200 }}>
          <canvas ref={canvasRef} {...dimension} />
        </div>
        {children}
      </>
    </CanvasContext.Provider>
  );
};

export { CanvasContext, CanvasContextProvider };
