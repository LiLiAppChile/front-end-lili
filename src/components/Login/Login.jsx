import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoCasa from "../../assets/Logo.png";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message || "Correo o contraseña incorrectos. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f4f6] p-4">
      <div className="flex flex-col items-center justify-center bg-white min-h-0 px-4 py-10 rounded-lg shadow-md">
        <img src={LogoCasa} alt="Logo" className="w-auto h-16" />
        <h1 className="text-[32px] font-bold mb-8 mt-5">Inicia Sesión</h1>

        {error && (
          <div className="w-full max-w-xs mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-6">
          <div className="relative">
            <p className="mb-1">Correo</p>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-login-sesion"
              required
            />
          </div>
          <div className="relative">
            <p className="mb-1">Contraseña</p>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-login-sesion"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn-login bg-[#714dbf] text-white px-4 py-3 rounded-lg hover:bg-[#5a3c9f] transition">
              Ingresar
            </button>
            <span className="inline-block text-[var(--text-primary)] underline justify-center p-4">¿Olvidaste tu contraseña?</span>
          </div>
        </form>

        <p className="text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;