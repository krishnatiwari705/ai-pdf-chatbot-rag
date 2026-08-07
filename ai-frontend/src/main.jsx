import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { ConversationProvider } from "./context/ConversationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConversationProvider>
        <Toaster position="top-right" />
        <App />
      </ConversationProvider>
    </BrowserRouter>
  </React.StrictMode>
);