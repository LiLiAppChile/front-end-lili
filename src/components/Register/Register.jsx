import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    rut: "",
    specialties: [],
    commune: "",
    siiRegistered: false,
    hasTools: false,
    ownTransportation: false,
  });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const specialtiesOptions = [
    "Gasfitería",
    "Electricidad",
    "Cerrajería",
    "Limpieza",
    "Seguridad",
    "Climatización",
    "Carpintería",
    "Albañilería",
    "Pintura",
    "Jardinería",
    "Artefactos",
    "Control de plagas",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const addSpecialty = (e) => {
    const value = e.target.value;
    if (value && !formData.specialties.includes(value)) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, value],
      });
      setErrors((prevErrors) => ({ ...prevErrors, specialties: "" }));
    }
    e.target.value = "";
  };

  const handleSpecialtyClick = (specialty) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((item) => item !== specialty),
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email) newErrors.email = "El correo electrónico es obligatorio.";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria.";
    if (!formData.phone) newErrors.phone = "El teléfono es obligatorio.";
    if (!formData.rut) newErrors.rut = "El RUT es obligatorio.";
    if (formData.specialties.length === 0) newErrors.specialties = "Debes seleccionar al menos una especialidad.";
    if (!formData.commune) newErrors.commune = "La comuna es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");
    setFirebaseError("");

    if (!validateForm()) {
      return;
    }

    try {
      await register(formData.email, formData.password, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        rut: formData.rut,
        specialties: formData.specialties,
        commune: formData.commune,
        siiRegistered: formData.siiRegistered,
        hasTools: formData.hasTools,
        ownTransportation: formData.ownTransportation,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error en el registro:", error.message);

      if (error.message.includes("correo ya está en uso")) {
        setBackendError("El correo electrónico ya está en uso.");
      } else if (error.message.includes("auth/email-already-in-use")) {
        setFirebaseError("El correo electrónico ya está en uso, por favor inicia sesión.");
      } else {
        setFirebaseError("Error en el registro. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos del formulario */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              className="input-form"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="input-form"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="input-form"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="input-form"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <input
              type="text"
              name="rut"
              placeholder="RUT"
              value={formData.rut}
              onChange={handleChange}
              className="input-form"
            />
            {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}
          </div>
          <div>
            <label htmlFor="specialties" className="text-sm font-medium text-gray-700">
              Especialidades *
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                >
                  <span>{specialty}</span>
                  <button
                    type="button"
                    onClick={() => handleSpecialtyClick(specialty)}
                    className="ml-2 text-blue-800 hover:text-blue-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <select
              onChange={addSpecialty}
              className="input-form"
            >
              <option value="">Selecciona una especialidad</option>
              {specialtiesOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.specialties && <p className="text-red-500 text-sm mt-1">{errors.specialties}</p>}
          </div>
          <div>
            <input
              type="text"
              name="commune"
              placeholder="Comuna"
              value={formData.commune}
              onChange={handleChange}
              className="input-form"
            />
            {errors.commune && <p className="text-red-500 text-sm mt-1">{errors.commune}</p>}
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="siiRegistered"
              checked={formData.siiRegistered}
              onChange={handleChange}
              className="checkbox-form"
            />
            <span>Registrado en el SII</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasTools"
              checked={formData.hasTools}
              onChange={handleChange}
              className="checkbox-form"
            />
            <span>Tiene herramientas</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="ownTransportation"
              checked={formData.ownTransportation}
              onChange={handleChange}
              className="checkbox-form"
            />
            <span>Tiene transporte propio</span>
          </label>
          {backendError && <p className="text-red-500 text-sm text-center">{backendError}</p>}
          {firebaseError && <p className="text-red-500 text-sm text-center">{firebaseError}</p>}
          <button type="submit" className="btn-register mx-auto block border border-black">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;