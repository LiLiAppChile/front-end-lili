import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import LandingPage from './components/LandingPage/LandingPage';
import RegisterPage from './components/Register/Register';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/Dashboard/Profile/Profile';
import SettingsPage from './components/Dashboard/SettingsPage/SettingsPage';
import Requests from './components/Dashboard/Home/Requests/Requests';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LaboralInfo from './components/Dashboard/SettingsPage/LaboralInfo';
import BankInfo from './components/Dashboard/SettingsPage/BankInfo';
import AboutLili from './components/Dashboard/SettingsPage/AboutLili';
import HowItWorks from './components/Dashboard/SettingsPage/HowItWorks';
import Guarantees from './components/Dashboard/SettingsPage/Guarantees';
import ContactSupport from './components/Dashboard/SettingsPage/ContactSupport';
import Terms from './components/Dashboard/SettingsPage/Terms';
import RefundPolicy from './components/Dashboard/SettingsPage/RefundPolicy';
import PrivacyPolicy from './components/Dashboard/SettingsPage/PrivacyPolicy';
import Contact from './components/Dashboard/SettingsPage/Contact';
import Form from './components/form/form';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/requests'
              element={
                <ProtectedRoute>
                  <Requests />
                </ProtectedRoute>
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/settings'
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/form'
              element={
                <ProtectedRoute>
                  <Form />
                </ProtectedRoute>
              }
            />
            <Route
              path='/laboral-info'
              element={
                <ProtectedRoute>
                  <LaboralInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path='/bank-info'
              element={
                <ProtectedRoute>
                  <BankInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path='/about-lili'
              element={
                <ProtectedRoute>
                  <AboutLili />
                </ProtectedRoute>
              }
            />
            <Route
              path='/how-it-works'
              element={
                <ProtectedRoute>
                  <HowItWorks />
                </ProtectedRoute>
              }
            />
            <Route
              path='/guarantees'
              element={
                <ProtectedRoute>
                  <Guarantees />
                </ProtectedRoute>
              }
            />
            <Route
              path='/contact-support'
              element={
                <ProtectedRoute>
                  <ContactSupport />
                </ProtectedRoute>
              }
            />
            <Route
              path='/terms'
              element={
                <ProtectedRoute>
                  <Terms />
                </ProtectedRoute>
              }
            />
            <Route
              path='/refund-policy'
              element={
                <ProtectedRoute>
                  <RefundPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path='/privacy-policy'
              element={
                <ProtectedRoute>
                  <PrivacyPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path='/contact'
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

export default App;
