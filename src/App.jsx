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
import Form from "./components/form/form";
import CalendarPage from "./components/Dashboard/Home/Calendar/CalendarPage";
import HistoryPage from "./components/Dashboard/Home/History/HistoryPage";
import JobDetailPage from "./components/Dashboard/Home/History/JobDetailPage";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />{" "}
            {/* Página de inicio */}
            <Route path="/login" element={<Login />} />{" "}
            {/* Página de inicio de sesión */}
            <Route path="/register" element={<RegisterPage />} />{" "}
            {/* Página de registro */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />{" "}
            {/* Página principal (dashboard) */}
            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <Requests />
                </ProtectedRoute>
              }
            />{" "}
            {/* Página Solicitudes */}
            <Route
              path="/details"
              element={
                <ProtectedRoute>
                  <TaskDetail />
                </ProtectedRoute>
              }
            />{" "}
            {/* Página Detalle Solicitudes*/}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />{" "}
            {/* Página Perfil */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />{" "}
            {/* Página de configuración */}
            <Route
              path="/form"
              element={
                <ProtectedRoute>
                  <Form />
                </ProtectedRoute>
              }
            />{" "}
            {/* Página de formulario */}
            {/* Rutas de configuración */}
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />{" "}
            {/* Página Historial */}
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />{" "}
            <Route path="/historial/detalle/:id" element={<JobDetailPage />} />
            {/* Página Calendario */}
            <Route
              path="/laboral-info"
              element={
                <ProtectedRoute>
                  <LaboralInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bank-info"
              element={
                <ProtectedRoute>
                  <BankInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-lili"
              element={
                <ProtectedRoute>
                  <AboutLili />
                </ProtectedRoute>
              }
            />
            <Route
              path="/how-it-works"
              element={
                <ProtectedRoute>
                  <HowItWorks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/guarantees"
              element={
                <ProtectedRoute>
                  <Guarantees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact-support"
              element={
                <ProtectedRoute>
                  <ContactSupport />
                </ProtectedRoute>
              }
            />{" "}
            {/* Cambiado */}
            <Route
              path="/terms"
              element={
                <ProtectedRoute>
                  <Terms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/refund-policy"
              element={
                <ProtectedRoute>
                  <RefundPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <ProtectedRoute>
                  <PrivacyPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      )}
    </div>
  );
};

{
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>;
}

export default App;
