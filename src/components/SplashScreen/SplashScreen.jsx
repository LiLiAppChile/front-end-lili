import React, { useEffect } from "react";
import Logo from "../../assets/Logo.webp";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500); // Dura 2.5 segundos
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <img
        src={Logo}
        className="w-auto h-24 opacity-0 scale-90 animate-fadeIn"
        alt="Logo"
      />
    </div>
  );
};

export default SplashScreen;
