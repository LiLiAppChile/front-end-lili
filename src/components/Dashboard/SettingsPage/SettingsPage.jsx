import React from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Botón para volver a la pestaña anterior */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#6D28D9] text-2xl font-bold mr-2 cursor-pointer"
        >
          <span className="text-[#6D28D9] text-3xl font-medium">&lt;</span>
        </button>
        <button
          onClick={() => navigate(-1)}
          className="text-2xl font-bold text-black cursor-pointer"
        >
          Configuración
        </button>
      </div>

      {/* Borde inferior debajo de "Configuración" */}
      <div className="border-b border-[#d1d5db] mb-6"></div>

      {/* Grupos de opciones */}
      <div className="space-y-4">
        {/* Información laboral y bancaria */}
        <div className="bg-[#eaecf6] rounded-lg p-4 space-y-2">
          <button
            onClick={() => handleNavigation("/laboral-info")}
            className="w-full flex justify-between items-center py-2 border-b border-[#d1d5db] cursor-pointer"
          >
            <span className="font-semibold">Información laboral</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
          <button
            onClick={() => handleNavigation("/bank-info")}
            className="w-full flex justify-between items-center py-2 cursor-pointer"
          >
            <span className="font-semibold">Información bancaria</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
        </div>

        {/* LiLi App y cómo funciona */}
        <div className="bg-[#eaecf6] rounded-lg p-4 space-y-2">
          <button
            onClick={() => handleNavigation("/about-lili")}
            className="w-full flex justify-between items-center py-2 border-b border-[#d1d5db] cursor-pointer"
          >
            <span className="font-semibold">¿Qué es LiLi App?</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
          <button
            onClick={() => handleNavigation("/how-it-works")}
            className="w-full flex justify-between items-center py-2 cursor-pointer"
          >
            <span className="font-semibold">¿Cómo funciona?</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
        </div>

        {/* Garantías, coberturas, resolución de problemas, términos y condiciones, políticas de reembolso y privacidad */}
        <div className="bg-[#eaecf6] rounded-lg p-4 space-y-2">
          <button
            onClick={() => handleNavigation("/guarantees")}
            className="w-full flex justify-between items-center py-2 border-b border-[#d1d5db] cursor-pointer"
          >
            <span className="font-semibold">Garantías y coberturas</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
          <button
            onClick={() => handleNavigation("/contact-support")}
            className="w-full flex justify-between items-center py-2 border-b border-[#d1d5db] cursor-pointer"
          >
            <span className="font-semibold">Resolución de problemas</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
          <button
            onClick={() => handleNavigation("/terms")}
            className="w-full flex justify-between items-center py-2 border-b border-[#d1d5db] cursor-pointer"
          >
            <span className="font-semibold">Términos y condiciones</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
          <button
            onClick={() => handleNavigation("/refund-policy")}
            className="w-full flex justify-between items-center py-2 border-b border-[#d1d5db] cursor-pointer"
          >
            <span className="font-semibold">Políticas de reembolso</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
          <button
            onClick={() => handleNavigation("/privacy-policy")}
            className="w-full flex justify-between items-center py-2 cursor-pointer"
          >
            <span className="font-semibold">Políticas de privacidad</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
        </div>

        {/* Contáctanos */}
        <div className="bg-[#eaecf6] rounded-lg p-4">
          <button
            onClick={() => handleNavigation("/contact")}
            className="w-full flex justify-between items-center py-2 cursor-pointer"
          >
            <span className="font-semibold">Contáctanos</span>
            <span className="text-[#6D28D9] text-xl">&gt;</span>
          </button>
        </div>
      </div>

      {/* Botón de cerrar sesión */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={logout}
          className="bg-white border border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-red-50 transition font-bold cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
