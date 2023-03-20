import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RSWGlobalStyle } from "react-simple-widgets/dist/style";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RSWGlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
