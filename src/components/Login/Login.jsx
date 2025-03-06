import React from 'react';
import Logo from '../../assets/image.webp';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">
      <div className="flex flex-col items-center justify-center space-y-8 w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Bienvenido a</h1>
          <img src={Logo} className="w-auto h-12 mx-auto" alt="Logo" />
        </div>

        <div className="w-64 space-y-4">
          <button
            className="btn-login"
          >
            Regístrate
          </button>
          <button
            className="btn-register">
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;