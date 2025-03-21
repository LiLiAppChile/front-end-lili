import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.webp";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center space-y-8 w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Bienvenido a</h1>
          <img src={Logo} className="w-auto h-12 mx-auto" alt="Logo" />
        </div>

        <div className="flex flex-col items-center space-y-4 w-64 mt-22">
          <button
            onClick={() => navigate("/login")}
            className="btn-register bg-white py-3 px-4 rounded-lg w-full border border-gray-300 hover:bg-gray-300 transition"
          >
            Inicia sesión
          </button>

          <button
            onClick={() => navigate("/register")}
            className="btn-login bg-white py-3 px-4 rounded-lg w-full border border-gray-300 hover:bg-gray-300 transition"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;