import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import "@radix-ui/themes/styles.css";

import { Provider } from "react-redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { ChakraProvider } from "@chakra-ui/react";
import { Theme } from "@radix-ui/themes";

import rootReducer from "./reducers";

const store = configureStore(
  { reducer: rootReducer }
  // { devTools: composeWithDevTools() }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <ChakraProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Theme>
              <App />
            </Theme>
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    </NextUIProvider>
  </React.StrictMode>
);
