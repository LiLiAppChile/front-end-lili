// src/pages/RegisterPage.jsx
import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    correo: "",
    contraseña: "",
    telefono: "",
    especialidad: "",
    ciudad: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // datos para enviar a Firebase o para ver la lógica del registro
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="input-form"
            required
          />
          <input
            type="text"
            name="rut"
            placeholder="RUT"
            value={formData.rut}
            onChange={handleChange}
            className="input-form"
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleChange}
            className="input-form"
            required
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="input-form"
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className="input-form"
            required
          />
          <input
            type="text"
            name="especialidad"
            placeholder="Especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            className="input-form"
            required
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className="input-form"
            required
          />
          <button
            type="submit"
            className="btn-register"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
