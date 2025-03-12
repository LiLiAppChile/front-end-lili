import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LoginUsers from "./components/Login/LoginUsers";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Routes> 
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<LoginUsers />} /> 
        </Routes>
      )}
    </div>
  );
};

export default App;