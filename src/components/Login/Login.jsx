import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 /* import { signInWithEmailAndPassword } from "firebase/auth"; */
/* import { auth } from "../../firebase"; */
import LogoCasa from "../../assets/Logo.png";
import { MdEmail, MdLock } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario autenticado:", user);

      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError("Correo o contraseña incorrectos. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <img src={LogoCasa} alt="Logo" className="w-auto h-20" />
      <h1 className="text-[32px] font-bold mb-8 mt-5">Inicia Sesión</h1>

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
        <span className="text-[var(--text-primary)] underline justify-center">¿Olvidaste tu contraseña?</span>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="btn-login-sesion
        mt-20">
          Iniciar Sesión
        </button>
        </div>
      </form>

      <p className="text-center text-white mt-4">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default Login;