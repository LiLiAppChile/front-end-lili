import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Routes> 
          <Route path="/" element={<LandingPage />} /> {/* Página de inicio */}
          <Route path="/login" element={<Login />} /> {/* Página de inicio de sesión */}
          <Route path="/register" element={<RegisterPage />} /> {/* Página de registro */}
          <Route path="/home" element={<HomePage />} /> {/* Página principal (dashboard) */}
        </Routes>
      )}
    </div>
  );
};

export default App;