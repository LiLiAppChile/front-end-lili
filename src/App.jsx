import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

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
        </Routes>
      )}
    </div>
  );
};

export default App;