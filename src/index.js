import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { NavContextProvider } from "./context/NavContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NavContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </NavContextProvider>
);
