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
import HomePageSupport from "./components/SupportDashboard/SupportHomePage/HomeSupport";
import FormSubmission from "./components/SupportDashboard/FormSubmissions/FormSubmissions";
import UsersRecord from "./components/SupportDashboard/UsersRecord/UsersRecord";
import SupportProfile from "./components/SupportDashboard/SupportProfile/SupportProfile";
import SupportRequests from "./components/SupportDashboard/FormSubmissions/Requests";
import ProfessionalDetail from "./components/SupportDashboard/FormSubmissions/RequestDetails";
import RegisteredUsers from "./components/SupportDashboard/UsersRecord/RegisteredUsers";
import QuotesList from "./components/SupportDashboard/Quotes/QuotesList";
import UserProfileAdminView from "./components/SupportDashboard/UsersRecord/UserProfileAdminView";
import CalendarPage from "./components/Dashboard/Home/Calendar/CalendarPage";
import HistoryPage from "./components/Dashboard/Home/History/HistoryPage";
import JobDetailPage from "./components/Dashboard/Home/History/JobDetailPage";
import RegisterPageClient from "./components/Client/RegisterClient/RegisterClient";
import LandingClient from "./components/Client/LangingClient";
import LoginClient from "./components/Client/LoginClient/LoginClient";
import HomeClient from "./components/Client/homeClient/HomeClient";

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
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} /> {/* Página principal (dashboard) */}
            <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} /> {/* Página Solicitudes */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* Página Perfil */}
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} /> {/* Página de configuración */}
            <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} /> {/* Página de formulario */}
            {/* Rutas de configuración */}
            <Route path="/laboral-info" element={<ProtectedRoute><LaboralInfo /></ProtectedRoute>} />
            <Route path="/bank-info" element={<ProtectedRoute><BankInfo /></ProtectedRoute>} />
            <Route path="/about-lili" element={<ProtectedRoute><AboutLili /></ProtectedRoute>} />
            <Route path="/how-it-works" element={<ProtectedRoute><HowItWorks /></ProtectedRoute>} />
            <Route path="/guarantees" element={<ProtectedRoute><Guarantees /></ProtectedRoute>} />
            <Route path="/contact-support" element={<ProtectedRoute><ContactSupport /></ProtectedRoute>} /> {/* Cambiado */}
            <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
            <Route path="/refund-policy" element={<ProtectedRoute><RefundPolicy /></ProtectedRoute>} />
            <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} /> {/* Página de historial */}
            <Route path="/history/job-detail/:jobId" element={<ProtectedRoute><JobDetailPage /></ProtectedRoute>} /> {/* Página de detalles del trabajo */}
            {/* Rutas de soporte */}
            <Route path="/admin/home" element={<ProtectedRoute><HomePageSupport /></ProtectedRoute>} /> {/* Página de soporte */}
            <Route path="/admin/postulaciones" element={<ProtectedRoute><SupportRequests /></ProtectedRoute>} /> {/* Página de postulaciones */}
            <Route path="/admin/postulaciones/detalles/:uid" element={<ProtectedRoute><ProfessionalDetail /></ProtectedRoute>} /> {/* Página de postulaciones */}
            <Route path="/admin/presupuestos" element={<ProtectedRoute><QuotesList /></ProtectedRoute>} /> {/* Página de presupuestos */}
            <Route path="/admin/users-record" element={<ProtectedRoute><RegisteredUsers /></ProtectedRoute>} /> {/* Página de lista de registro de usuarios*/}
            <Route path="/admin/users-record/details/:uid" element={<ProtectedRoute><UserProfileAdminView /></ProtectedRoute>} /> {/* Página de detalles de usuarios */}
            <Route path="/admin/perfil" element={<ProtectedRoute><SupportProfile /></ProtectedRoute>} /> {/* Página de perfil de soporte */}
            {/* Rutas de cliente */}
            <Route path="/client" element={<LandingClient />} /> {/* Página de inicio de cliente */}
            <Route path="/register-client" element={<RegisterPageClient />} /> {/* Página de registro de cliente */}
            <Route path="/login-client" element={<LoginClient />} /> {/* Página de inicio de sesión de cliente */}
            <Route path="/home-client" element={<HomeClient />} /> {/* Página principal de cliente */}
          </Routes>
        </AuthProvider>
      )}
    </div>
  );
};

export default App;
