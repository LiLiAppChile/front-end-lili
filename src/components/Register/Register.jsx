import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import LogoCasa from "@/assets/logo.png";
import SuccessPopup from "./Succespopup";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre completo es obligatorio";
    } else if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError("");

    if (!validateForm()) return;

    try {
      const createdAt = new Date().toISOString();
      await register(formData.email, formData.password, {
        name: formData.name,
        email: formData.email,
        createdAt: createdAt,
        validUser: false
      });

      setShowSuccessPopup(true);

    } catch (error) {
      console.error("Error en el registro:", error.message);
      if (error.code === "auth/email-already-in-use") {
        setFirebaseError("Este correo ya está registrado. ¿Ya tienes una cuenta?");
      } else {
        setFirebaseError("Error en el registro. Inténtalo de nuevo.");
      }
    }
  };

  const handleContinueToForm = () => {
    setShowSuccessPopup(false);
    navigate("/form");
  };

  const handleLater = async () => {
    setShowSuccessPopup(false);

    navigate('/home'); // Redirige a la página principal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-white min-h-0 px-4 py-10 rounded-lg shadow-md">
        <img src={LogoCasa} alt="Logo" className="w-auto h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Regístrate</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre completo */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Correo electrónico */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* Términos y condiciones */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              />
            </div>
            <label htmlFor="acceptTerms" className="ml-2 text-sm">
              He leído y acepto los{" "}
              <Link to="/terminos" className="underline text-[#714dbf] hover:text-[#5a3da3]">
                Términos y Condiciones
              </Link>
            </label>
          </div>
          {errors.acceptTerms && <p className="mt-1 text-sm text-red-500">{errors.acceptTerms}</p>}

          {/* Mensaje de error de Firebase */}
          {firebaseError && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              {firebaseError}
            </div>
          )}

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#714dbf] text-white font-medium rounded-lg hover:bg-[#5a3da3] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#5a3da3] focus:ring-opacity-50"
          >
            Registrarme
          </button>

          {/* Enlace a inicio de sesión */}
          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-[#714dbf] hover:underline font-medium">
              Inicia sesión
            </Link>
          </div>
        </form>

        {/* Popup de éxito */}
        {showSuccessPopup && (
          <SuccessPopup
            onContinue={handleContinueToForm}
            onLater={handleLater}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
