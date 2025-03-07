import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.webp";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">
      <div className="flex flex-col items-center justify-center space-y-8 w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Bienvenido a</h1>
          <img src={Logo} className="w-auto h-12 mx-auto" alt="Logo" />
        </div>

        <div className="flex flex-col items-center space-y-4 w-64">
          <Link to="/register" className="btn-login">
            Regístrate
          </Link>
          <Link to="/login" className="btn-register">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;