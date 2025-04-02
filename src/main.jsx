// src/main.jsx

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import TaskDetail from "./components/Dashboard/Home/Requests/TaskDetail";
import Profile from "./components/Dashboard/Profile/Profile";
import PendingTask from "./components/Dashboard/Home/Requests/PendingTask";
import JobsUsers from "./components/Dashboard/Home/Jobs/JobsUsers";
import Requests from "./components/Dashboard/Home/Requests/Requests";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Requests />
    </BrowserRouter>
  </StrictMode>
);
