import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Dashboard/Profile/Profile";
import SettingsPage from "./components/Dashboard/SettingsPage/SettingsPage";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AuthProvider>
          <Routes> 
            <Route path="/" element={<LandingPage />} /> {/* Página de inicio */}
            <Route path="/login" element={<Login />} /> {/* Página de inicio de sesión */}
            <Route path="/register" element={<RegisterPage />} /> {/* Página de registro */}
            <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>} /> {/* Página principal (dashboard) */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* Página principal (dashboard) */}
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} /> {/* Página de configuración */}
          </Routes>
        </AuthProvider>
      )}
    </div>
  );
};

{
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
}

export default App;