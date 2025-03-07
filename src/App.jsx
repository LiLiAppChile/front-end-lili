import React, { useState, useEffect } from "react";
import Logo from './assets/image.webp'
import Login from './components/Login/Login';
import RegisterPage from "./components/Register/RegisterPage";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    setTimeout(onFinish, 2500); // Dura 2.5 segundos
  }, [onFinish]);

  return (
    <div className="splash">
      <img src={Logo} className="w-auto h-24 opacity-0 scale-90 animate-fadeIn " alt="Logo" />
    </div>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && <Login />}
      {!showSplash && <RegisterPage />}

    </div>
  );
};

const MainApp = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">¡Bienvenido a la App! 🎉</h1>
    </div>
  );
};

export default App;
