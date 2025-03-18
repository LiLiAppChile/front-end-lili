import React from "react";
import { useAuth } from "../../../Context/AuthContext";

const SettingsPage = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default SettingsPage;