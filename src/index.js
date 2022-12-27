import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

import "./wdyr";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
  rootElement,
);
