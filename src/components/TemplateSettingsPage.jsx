import React from "react";
import { useNavigate } from "react-router-dom";

const TemplateSettingsPage = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ffffff] p-4">
      {/* Botón para volver a la pestaña anterior */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)} // Navega a la página anterior
          className="flex items-center text-[#6D28D9] text-2xl font-bold mr-2 cursor-pointer"
        >
          <span className="text-[#6D28D9] text-3xl font-medium">&lt;</span>
        </button>
        <h1 className="text-2xl font-bold text-[#000000]">{title}</h1>
      </div>

      {/* Borde inferior debajo del título */}
      <div className="border-b border-[#d1d5db] mb-6"></div>

      {/* Contenido de la página */}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default TemplateSettingsPage;
