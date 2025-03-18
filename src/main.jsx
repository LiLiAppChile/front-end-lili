// src/main.jsx

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import HomeUsers from "./components/Dashboard/Home/HomeUsers";
import Profile from "./components/Dashboard/Profile/Profile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HomeUsers />
    </BrowserRouter>
  </StrictMode>
);
