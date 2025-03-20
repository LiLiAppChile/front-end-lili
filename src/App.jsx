import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Dashboard/Profile/Profile";
import SettingsPage from "./components/Dashboard/SettingsPage/SettingsPage";
import Requests from "./components/Dashboard/Home/Requests/Requests";
import TaskDetail from "./components/Dashboard/Home/Requests/TaskDetail";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LaboralInfo from "./components/Dashboard/SettingsPage/LaboralInfo";
import BankInfo from "./components/Dashboard/SettingsPage/BankInfo";
import AboutLili from "./components/Dashboard/SettingsPage/AboutLili";
import HowItWorks from "./components/Dashboard/SettingsPage/HowItWorks";
import Guarantees from "./components/Dashboard/SettingsPage/Guarantees";
import ContactSupport from "./components/Dashboard/SettingsPage/ContactSupport";
import Terms from "./components/Dashboard/SettingsPage/Terms";
import RefundPolicy from "./components/Dashboard/SettingsPage/RefundPolicy";
import PrivacyPolicy from "./components/Dashboard/SettingsPage/PrivacyPolicy";
import Contact from "./components/Dashboard/SettingsPage/Contact";

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
            <Route path="/requests" element={<ProtectedRoute><Requests/></ProtectedRoute>} /> {/* Página Solicitudes */}
            <Route path="/details" element={<ProtectedRoute><TaskDetail/></ProtectedRoute>} /> {/* Página Detalle Solicitudes*/}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* Página Perfil */}
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} /> {/* Página de configuración */}
            {/* Rutas de configuración */}
            <Route path="/laboral-info" element={<LaboralInfo />} />
            <Route path="/bank-info" element={<BankInfo />} />
            <Route path="/about-lili" element={<AboutLili />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/guarantees" element={<Guarantees />} />
            <Route path="/contact-support" element={<ContactSupport />} /> {/* Cambiado */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
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