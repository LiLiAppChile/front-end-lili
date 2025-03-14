import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 /* import { signInWithEmailAndPassword } from "firebase/auth"; */
/* import { auth } from "../../firebase"; */
import Logo from "../../assets/Logo.webp";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">
      <img src={Logo} alt="Logo" className="w-auto h-10 mb-4" />
      <h1 className="text-2xl font-bold mb-8 text-white">Inicia Sesión</h1>

      <form onSubmit={handleLogin} className="w-full max-w-xs space-y-6">
        <div className="relative">
          <MdEmail className="icons-login" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputs-login"
            required
          />
        </div>
        <div className="relative">
          <MdLock className="icons-login" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputs-login"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="btn-login">
          Ingresar
        </button>
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