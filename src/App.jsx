import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Dashboard/Profile/Profile";
import SettingsPage from "./components/Dashboard/SettingsPage/SettingsPage";
import Requests from "./components/Dashboard/Home/Requests/Requests";
import { useAuth, AuthProvider } from "./Context/AuthContext";
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
import QuotesList from "./components/SupportDashboard/Quotes/Quotes";
import UserProfileAdminView from "./components/SupportDashboard/UsersRecord/UserProfileAdminView";
import CalendarPage from "./components/Dashboard/Home/Calendar/CalendarPage";
import HistoryPage from "./components/Dashboard/Home/History/HistoryPage";
import JobDetailPage from "./components/Dashboard/Home/History/JobDetailPage";
import Promotion1 from "./components/Dashboard/Home/Promotion/Promotion1";
import RegisterPageClient from "./components/Client/RegisterClient/RegisterClient";
import LandingClient from "./components/Client/LangingClient";
import LoginClient from "./components/Client/LoginClient/LoginClient";
import HomeClient from "./components/Client/homeClient/HomeClient";
import ClientProfile from "./components/Client/Profile/ClientProfile";
import ClientRequests from "./components/Client/Request/RequestClient";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const RoleRedirect = () => {
    const { user, userData } = useAuth();

    if (!user) return <Navigate to='/login' replace />;

    switch (userData?.role) {
      case 'admin':
        return <Navigate to='/admin/home' replace />;
      case 'professional':
        return <Navigate to='/home' replace />;
      case 'client':
        return <Navigate to="/client/home" replace />;
      default:
        return <Navigate to='/login' replace />;
    }
  };

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AuthProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterPage />} />

            {/* Redirección automática según rol */}
            <Route index element={<RoleRedirect />} />
            <Route path='/redirect' element={<RoleRedirect />} />

            {/* Rutas de Professional */}
            <Route path='/home' element={<ProtectedRoute allowedRoles={['professional']}><HomePage /></ProtectedRoute>} />
            <Route path='/promotion1' element={<ProtectedRoute allowedRoles={['professional']}><Promotion1 /></ProtectedRoute>} />
            <Route path='/history/detail/:id' element={<ProtectedRoute allowedRoles={['professional']}><JobDetailPage /></ProtectedRoute>} />
            <Route path='/requests' element={<ProtectedRoute allowedRoles={['professional']}><Requests /></ProtectedRoute>} />
            <Route path='/calendar' element={<ProtectedRoute allowedRoles={['professional']}><CalendarPage /></ProtectedRoute>} />
            <Route path='/history' element={<ProtectedRoute allowedRoles={['professional']}><HistoryPage /></ProtectedRoute>}/>
            <Route path='/profile' element={<ProtectedRoute allowedRoles={['professional']}><Profile /></ProtectedRoute>}/>
            <Route path='/form' element={<ProtectedRoute allowedRoles={['professional']}><Form /></ProtectedRoute>}/>

            {/* Rutas de Admin */}
            <Route path="/admin/home" element={<ProtectedRoute allowedRoles={['admin']}><HomePageSupport /></ProtectedRoute>} />
            <Route path="/admin/postulaciones" element={<ProtectedRoute allowedRoles={['admin']}><SupportRequests /></ProtectedRoute>} />
            <Route path="/admin/postulaciones/detalles/:uid" element={<ProtectedRoute allowedRoles={['admin']}><ProfessionalDetail /></ProtectedRoute>} />
            <Route path="/admin/presupuestos" element={<ProtectedRoute allowedRoles={['admin']}><QuotesList /></ProtectedRoute>} />
            <Route path="/admin/users-record" element={<ProtectedRoute allowedRoles={['admin']}><RegisteredUsers /></ProtectedRoute>} />
            <Route path="/admin/users-record/details/:uid" element={<ProtectedRoute allowedRoles={['admin']}><UserProfileAdminView /></ProtectedRoute>} />
            <Route path="/admin/perfil" element={<ProtectedRoute allowedRoles={['admin']}><SupportProfile /></ProtectedRoute>} />
            <Route path="/admin/perfil/settings" element={<ProtectedRoute allowedRoles={['admin']}><SettingsPage /></ProtectedRoute>} />

            {/* Rutas de Cliente */}
            <Route path="/client" element={<LandingClient />} /> 
            <Route path="/client/register" element={<RegisterPageClient />} /> 
            <Route path="/client/login" element={<LoginClient />} /> 
            <Route path="/client/home" element={<ProtectedRoute allowedRoles={['client']}><HomeClient /> </ProtectedRoute>} /> 
            <Route path="/client/profile" element={<ProtectedRoute allowedRoles={['client']}><ClientProfile /> </ProtectedRoute>} /> 
            <Route path="/client/requests" element={<ProtectedRoute allowedRoles={['client']}><ClientRequests /> </ProtectedRoute>} /> 

            {/* Rutas compartidas */}
            <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><SettingsPage /></ProtectedRoute>} />
            <Route path="/laboral-info" element={<ProtectedRoute allowedRoles={['professional']}><LaboralInfo /></ProtectedRoute>} />
            <Route path="/bank-info" element={<ProtectedRoute allowedRoles={['professional']}><BankInfo /></ProtectedRoute>} />
            <Route path="/about-lili" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><AboutLili /></ProtectedRoute>} />
            <Route path="/how-it-works" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><HowItWorks /></ProtectedRoute>} />
            <Route path="/guarantees" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><Guarantees /></ProtectedRoute>} />
            <Route path="/contact-support" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><ContactSupport /></ProtectedRoute>} />
            <Route path="/terms" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><Terms /></ProtectedRoute>} />
            <Route path="/refund-policy" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><RefundPolicy /></ProtectedRoute>} />
            <Route path="/privacy-policy" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><PrivacyPolicy /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute allowedRoles={['admin', 'professional', 'client']}><Contact /></ProtectedRoute>} />

          </Routes>
        </AuthProvider>
      )}
    </div>
  );
};

export default App;
