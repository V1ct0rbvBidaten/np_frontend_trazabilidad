import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { ChakraProvider } from "@chakra-ui/react";

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
            <App />
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    </NextUIProvider>
  </React.StrictMode>
);
