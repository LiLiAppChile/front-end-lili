import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPaperclip, FiChevronDown } from "react-icons/fi";
import { uploadToCloudinary } from "../Cloudinary/Services/upload.service";
import { useAuth } from "../../Context/AuthContext";
import FormSuccessPopup from "./FormSuccessPopUp";

// Datos para los selects
const regionesChile = [
  "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama",
  "Coquimbo", "Valparaíso", "Metropolitana", "O'Higgins",
  "Maule", "Ñuble", "Biobío", "Araucanía",
  "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
];

const comunasChile = [
  "Santiago", "Providencia", "Las Condes", "Ñuñoa",
  "Maipú", "La Florida", "Puente Alto", "Viña del Mar",
  "Valparaíso", "Concepción", "Temuco", "Antofagasta"
];

const especialidadesOptions = [
  "Gasfitería", "Electricidad", "Cerrajería", "Limpieza",
  "Seguridad", "Climatización", "Carpintería", "Albañilería",
  "Pintura", "Jardinería", "Artefactos", "Control de plagas"
];

const bancosChile = [
  "Banco de Chile", "Banco Estado", "Banco BCI",
  "Banco Santander", "Banco Itaú", "Banco Scotiabank",
  "Banco BBVA", "Banco BICE", "Banco Security"
];

const tiposCuenta = [
  "Cuenta Vista", "Cuenta Corriente", "Cuenta Ahorro",
  "Cuenta RUT"
];

const SquareCheckbox = ({ checked, onChange, label }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <div className={`w-4 h-4 border-2 ${checked ? 'bg-[#714dbf] border-[#714dbf]' : 'border-gray-400'} rounded-sm flex items-center justify-center`}>
      {checked && (
        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);

export default function FormularioPostulacion() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    // Datos personales
    rut: "",
    telefono: "",
    region: "",
    comuna: "",
    especialidades: [],
    registradoSII: null,
    inicioActividadesSII: null,
    movilizacion: null,
    herramientas: null,

    // Documentos
    cedulaFrente: { file: null, url: null, name: '', uploading: false, uploaded: false, error: null },
    cedulaReverso: { file: null, url: null, name: '', uploading: false, uploaded: false, error: null },
    certificadoAntecedentes: { file: null, url: null, name: '', uploading: false, uploaded: false, error: null },
    certificadoAdicional: { file: null, url: null, name: '', uploading: false, uploaded: false, error: null },

    // Datos bancarios
    banco: "",
    tipoCuenta: "",
    nombreTitular: "",
    numeroCuenta: ""
  });

  const [errors, setErrors] = useState({
    rut: false,
    telefono: false,
    region: false,
    comuna: false,
    especialidades: false,
    registradoSII: false,
    inicioActividadesSII: false,
    movilizacion: false,
    herramientas: false,
    cedulaFrente: false,
    cedulaReverso: false,
    certificadoAntecedentes: false,
    banco: false,
    tipoCuenta: false,
    nombreTitular: false,
    numeroCuenta: false
  });

  const [errorMessages, setErrorMessages] = useState({
    rut: '',
    telefono: '',
    region: '',
    comuna: '',
    especialidades: '',
    registradoSII: '',
    inicioActividadesSII: '',
    movilizacion: '',
    herramientas: '',
    cedulaFrente: '',
    cedulaReverso: '',
    certificadoAntecedentes: '',
    banco: '',
    tipoCuenta: '',
    nombreTitular: '',
    numeroCuenta: ''
  });

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });

    if (errors[field] && e.target.value) {
      setErrors(prev => ({ ...prev, [field]: false }));
      setErrorMessages(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSelectChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });

    if (errors[field] && e.target.value) {
      setErrors(prev => ({ ...prev, [field]: false }));
      setErrorMessages(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === prev[field] ? null : value
    }));

    if (errors[field] && value !== null && value !== undefined) {
      setErrors(prev => ({ ...prev, [field]: false }));
      setErrorMessages(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = async (event, field) => {
    const file = event.target.files[0];
    if (!file) return;

    // Estado inicial al seleccionar archivo
    setFormData(prev => ({
      ...prev,
      [field]: {
        file: file,
        url: null,
        name: file.name,
        uploading: true,
        uploaded: false,
        error: null
      }
    }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
      setErrorMessages(prev => ({ ...prev, [field]: '' }));
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const result = await uploadToCloudinary(file);


      setFormData(prev => ({
        ...prev,
        [field]: {
          file: null,
          url: result.url,
          name: file.name,
          uploading: false,
          uploaded: true,
          error: null
        }
      }));

      console.log(`Archivo ${field} subido:`, result.url);

    } catch (error) {
      console.error(`Error subiendo ${field}:`, error);
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          uploading: false,
          uploaded: false,
          error: 'Error al subir el archivo'
        }
      }));
    }
  };

  const addSpecialty = (e) => {
    const specialty = e.target.value;
    if (specialty && !formData.especialidades.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        especialidades: [...prev.especialidades, specialty]
      }));

      if (errors.especialidades) {
        setErrors(prev => ({ ...prev, especialidades: false }));
        setErrorMessages(prev => ({ ...prev, especialidades: '' }));
      }
    }
    e.target.value = "";
  };

  const removeSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades.filter(e => e !== specialty)
    }));

    if (formData.especialidades.length <= 1) {
      const hasError = formData.especialidades.length - 1 === 0;
      setErrors(prev => ({ ...prev, especialidades: hasError }));
      setErrorMessages(prev => ({
        ...prev,
        especialidades: hasError ? 'Debes seleccionar al menos una especialidad' : ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    const newErrorMessages = { ...errorMessages };

    if (!formData.rut) {
      newErrors.rut = true;
      newErrorMessages.rut = 'El RUT es requerido';
      isValid = false;
    } else {
      newErrors.rut = false;
      newErrorMessages.rut = '';
    }

    if (!formData.telefono) {
      newErrors.telefono = true;
      newErrorMessages.telefono = 'El teléfono es requerido';
      isValid = false;
    } else {
      newErrors.telefono = false;
      newErrorMessages.telefono = '';
    }

    if (!formData.region) {
      newErrors.region = true;
      newErrorMessages.region = 'La región es requerida';
      isValid = false;
    } else {
      newErrors.region = false;
      newErrorMessages.region = '';
    }

    if (!formData.comuna) {
      newErrors.comuna = true;
      newErrorMessages.comuna = 'La comuna es requerida';
      isValid = false;
    } else {
      newErrors.comuna = false;
      newErrorMessages.comuna = '';
    }

    if (formData.especialidades.length === 0) {
      newErrors.especialidades = true;
      newErrorMessages.especialidades = 'Debes seleccionar al menos una especialidad';
      isValid = false;
    } else {
      newErrors.especialidades = false;
      newErrorMessages.especialidades = '';
    }

    if (formData.registradoSII === null || formData.registradoSII === undefined) {
      newErrors.registradoSII = true;
      newErrorMessages.registradoSII = 'Debes seleccionar una opción';
      isValid = false;
    } else {
      newErrors.registradoSII = false;
      newErrorMessages.registradoSII = '';
    }

    if (formData.inicioActividadesSII === null || formData.inicioActividadesSII === undefined) {
      newErrors.inicioActividadesSII = true;
      newErrorMessages.inicioActividadesSII = 'Debes seleccionar una opción';
      isValid = false;
    } else {
      newErrors.inicioActividadesSII = false;
      newErrorMessages.inicioActividadesSII = '';
    }

    if (formData.movilizacion === null || formData.movilizacion === undefined) {
      newErrors.movilizacion = true;
      newErrorMessages.movilizacion = 'Debes seleccionar una opción';
      isValid = false;
    } else {
      newErrors.movilizacion = false;
      newErrorMessages.movilizacion = '';
    }

    if (formData.herramientas === null || formData.herramientas === undefined) {
      newErrors.herramientas = true;
      newErrorMessages.herramientas = 'Debes seleccionar una opción';
      isValid = false;
    } else {
      newErrors.herramientas = false;
      newErrorMessages.herramientas = '';
    }

    if (!formData.cedulaFrente.url || formData.cedulaFrente.uploading) {
      newErrors.cedulaFrente = true;
      newErrorMessages.cedulaFrente = 'Debes subir la cédula de identidad (frente)';
      isValid = false;
    } else {
      newErrors.cedulaFrente = false;
      newErrorMessages.cedulaFrente = '';
    }

    if (!formData.cedulaReverso.url || formData.cedulaReverso.uploading) {
      newErrors.cedulaReverso = true;
      newErrorMessages.cedulaReverso = 'Debes subir la cédula de identidad (reverso)';
      isValid = false;
    } else {
      newErrors.cedulaReverso = false;
      newErrorMessages.cedulaReverso = '';
    }

    if (!formData.certificadoAntecedentes.url || formData.certificadoAntecedentes.uploading) {
      newErrors.certificadoAntecedentes = true;
      newErrorMessages.certificadoAntecedentes = 'Debes subir el certificado de antecedentes';
      isValid = false;
    } else {
      newErrors.certificadoAntecedentes = false;
      newErrorMessages.certificadoAntecedentes = '';
    }

    if (!formData.banco) {
      newErrors.banco = true;
      newErrorMessages.banco = 'El banco es requerido';
      isValid = false;
    } else {
      newErrors.banco = false;
      newErrorMessages.banco = '';
    }

    if (!formData.tipoCuenta) {
      newErrors.tipoCuenta = true;
      newErrorMessages.tipoCuenta = 'El tipo de cuenta es requerido';
      isValid = false;
    } else {
      newErrors.tipoCuenta = false;
      newErrorMessages.tipoCuenta = '';
    }

    if (!formData.nombreTitular) {
      newErrors.nombreTitular = true;
      newErrorMessages.nombreTitular = 'El nombre del titular es requerido';
      isValid = false;
    } else {
      newErrors.nombreTitular = false;
      newErrorMessages.nombreTitular = '';
    }

    if (!formData.numeroCuenta) {
      newErrors.numeroCuenta = true;
      newErrorMessages.numeroCuenta = 'El número de cuenta es requerido';
      isValid = false;
    } else {
      newErrors.numeroCuenta = false;
      newErrorMessages.numeroCuenta = '';
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const requiredDocs = [
        formData.cedulaFrente,
        formData.cedulaReverso,
        formData.certificadoAntecedentes
      ];

      const hasMissingDocs = requiredDocs.some(doc => !doc.url || doc.uploading);
      if (hasMissingDocs) {
        throw new Error('Debes subir todos los documentos requeridos y esperar a que se completen las subidas');
      }

      const userUpdateData = {
        rut: formData.rut,
        phone: formData.telefono,
        region: formData.region,
        commune: formData.comuna,
        specialties: formData.especialidades,
        siiRegistered: formData.registradoSII,
        siiActivitiesStarted: formData.inicioActividadesSII,
        hasTools: formData.herramientas,
        ownTransportation: formData.movilizacion,
        // Documentos:
        identityCardFront: { url: formData.cedulaFrente.url },
        identityCardBack: { url: formData.cedulaReverso.url },
        backgroundCertificate: { url: formData.certificadoAntecedentes.url },
        additionalCertificate: formData.certificadoAdicional ? { url: formData.certificadoAdicional.url } : null,
        // Datos bancarios:
        bankName: formData.banco,
        accountType: formData.tipoCuenta,
        accountHolderName: formData.nombreTitular,
        accountNumber: formData.numeroCuenta,

        formSubmitted: true,
      };

      setSubmitting(true);

      const result = await updateUser(userUpdateData, { showLoading: false });
      if (result.success) {
        setShowSuccessPopup(true);
        /*         navigate('/home', {
                  state: {
                    userData: result.user,
                    updateDate: new Date().toLocaleString()
                  }
                }); */
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error.message);
      alert(error.message || 'Error al enviar el formulario');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/home'); // Navegar a home cuando se cierre el popup
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="sticky top-0 bg-white z-10 py-4 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/home")}
            className="text-[#6D28D9] text-3xl font-medium mr-2 cursor-pointer"
          >
            &lt;
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 cursor-pointer">Formulario de Postulación</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pt-6">
        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
          {/* Sección Datos Personales */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Datos Personales</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">RUT *</label>
                <input
                  type="text"
                  className={`w-full p-3 border ${errors.rut ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:border-transparent`}
                  value={formData.rut}
                  onChange={(e) => handleInputChange(e, 'rut')}
                  placeholder="Ej: 12345678-9"
                />
                {errors.rut && <p className="mt-1 text-sm text-red-600">{errorMessages.rut}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Número de Teléfono *</label>
                <input
                  type="text"
                  className={`w-full p-3 border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:border-transparent`}
                  value={formData.telefono}
                  onChange={(e) => handleInputChange(e, 'telefono')}
                  placeholder="+569 1234 5678"
                />
                {errors.telefono && <p className="mt-1 text-sm text-red-600">{errorMessages.telefono}</p>}
              </div>

              <div className="relative">
                <select
                  className={`w-full p-3 border ${errors.region ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10`}
                  value={formData.region}
                  onChange={(e) => handleSelectChange(e, 'region')}
                >
                  <option value="">Región</option>
                  {regionesChile.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
                {errors.region && <p className="mt-1 text-sm text-red-600">{errorMessages.region}</p>}
              </div>

              <div className="relative">
                <select
                  className={`w-full p-3 border ${errors.comuna ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10`}
                  value={formData.comuna}
                  onChange={(e) => handleSelectChange(e, 'comuna')}
                >
                  <option value="">Comuna</option>
                  {comunasChile.map(comuna => (
                    <option key={comuna} value={comuna}>{comuna}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
                {errors.comuna && <p className="mt-1 text-sm text-red-600">{errorMessages.comuna}</p>}
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.especialidades.map((especialidad, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                    >
                      <span>{especialidad}</span>
                      <button
                        type="button"
                        onClick={() => removeSpecialty(especialidad)}
                        className="ml-2 text-blue-800 hover:text-blue-600"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <select
                    onChange={addSpecialty}
                    className={`w-full p-3 border ${errors.especialidades ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10`}
                  >
                    <option value="">Especialidad/es</option>
                    {especialidadesOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
                </div>
                {errors.especialidades && <p className="mt-1 text-sm text-red-600">{errorMessages.especialidades}</p>}
              </div>

              <div className="space-y-2">
                <div className={`bg-gray-100 p-4 rounded-lg flex justify-between items-center ${errors.registradoSII ? 'border border-red-500' : ''}`}>
                  <span className="text-sm font-medium text-gray-700">¿Registrado en SII? *</span>
                  <div className="flex space-x-4">
                    <SquareCheckbox
                      checked={formData.registradoSII === true}
                      onChange={() => handleCheckboxChange("registradoSII", true)}
                      label="Sí"
                    />
                    <SquareCheckbox
                      checked={formData.registradoSII === false}
                      onChange={() => handleCheckboxChange("registradoSII", false)}
                      label="No"
                    />
                  </div>
                </div>
                {errors.registradoSII && <p className="mt-1 text-sm text-red-600">{errorMessages.registradoSII}</p>}

                <div className={`bg-gray-100 p-4 rounded-lg flex justify-between items-center ${errors.inicioActividadesSII ? 'border border-red-500' : ''}`}>
                  <span className="text-sm font-medium text-gray-700">¿Inicio de actividades en el SII? *</span>
                  <div className="flex space-x-4">
                    <SquareCheckbox
                      checked={formData.inicioActividadesSII === true}
                      onChange={() => handleCheckboxChange("inicioActividadesSII", true)}
                      label="Sí"
                    />
                    <SquareCheckbox
                      checked={formData.inicioActividadesSII === false}
                      onChange={() => handleCheckboxChange("inicioActividadesSII", false)}
                      label="No"
                    />
                  </div>
                </div>
                {errors.inicioActividadesSII && <p className="mt-1 text-sm text-red-600">{errorMessages.inicioActividadesSII}</p>}

                <div className={`bg-gray-100 p-4 rounded-lg flex justify-between items-center ${errors.movilizacion ? 'border border-red-500' : ''}`}>
                  <span className="text-sm font-medium text-gray-700">¿Cuentas con movilización propia? *</span>
                  <div className="flex space-x-4">
                    <SquareCheckbox
                      checked={formData.movilizacion === true}
                      onChange={() => handleCheckboxChange("movilizacion", true)}
                      label="Sí"
                    />
                    <SquareCheckbox
                      checked={formData.movilizacion === false}
                      onChange={() => handleCheckboxChange("movilizacion", false)}
                      label="No"
                    />
                  </div>
                </div>
                {errors.movilizacion && <p className="mt-1 text-sm text-red-600">{errorMessages.movilizacion}</p>}

                <div className={`bg-gray-100 p-4 rounded-lg flex justify-between items-center ${errors.herramientas ? 'border border-red-500' : ''}`}>
                  <span className="text-sm font-medium text-gray-700">¿Posees herramientas propias? *</span>
                  <div className="flex space-x-4">
                    <SquareCheckbox
                      checked={formData.herramientas === true}
                      onChange={() => handleCheckboxChange("herramientas", true)}
                      label="Sí"
                    />
                    <SquareCheckbox
                      checked={formData.herramientas === false}
                      onChange={() => handleCheckboxChange("herramientas", false)}
                      label="No"
                    />
                  </div>
                </div>
                {errors.herramientas && <p className="mt-1 text-sm text-red-600">{errorMessages.herramientas}</p>}
              </div>
            </div>
          </div>

          {/* Sección Documentos */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Documentos</h2>

            <div className="space-y-4">
              <div className={`bg-gray-100 p-4 rounded-lg flex justify-between items-center ${errors.cedulaFrente ? 'border border-red-500' : ''}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cédula de Identidad (Frente) *</label>
                  {formData.cedulaFrente.name && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        {formData.cedulaFrente.name}
                      </p>
                      <div className="mt-1">
                        {formData.cedulaFrente.uploading && (
                          <p className="text-xs text-yellow-600">Subiendo...</p>
                        )}
                        {formData.cedulaFrente.uploaded && (
                          <p className="text-xs text-green-600">✓ Subido correctamente</p>
                        )}
                        {formData.cedulaFrente.error && (
                          <p className="text-xs text-red-600">✗ Error</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer">
                  <input
                    id="cedulaFrente"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "cedulaFrente")}
                    accept="image/*,application/pdf"
                  />
                  <FiPaperclip className="text-[#714dbf] text-xl" />
                </label>
              </div>
              {errors.cedulaFrente && !formData.cedulaFrente.name && (
                <p className="mt-1 text-sm text-red-600">{errorMessages.cedulaFrente}</p>
              )}

              <div className={`bg-gray-100 p-4 rounded-lg flex justify-between items-center ${errors.cedulaReverso ? 'border border-red-500' : ''}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cédula de Identidad (Reverso) *</label>
                  {formData.cedulaReverso.name && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        {formData.cedulaReverso.name}
                      </p>
                      <div className="mt-1">
                        {formData.cedulaReverso.uploading && (
                          <p className="text-xs text-yellow-600">Subiendo...</p>
                        )}
                        {formData.cedulaReverso.uploaded && (
                          <p className="text-xs text-green-600">✓ Subido correctamente</p>
                        )}
                        {formData.cedulaReverso.error && (
                          <p className="text-xs text-red-600">✗ Error</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer">
                  <input
                    id="cedulaReverso"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "cedulaReverso")}
                    accept="image/*,application/pdf"
                  />
                  <FiPaperclip className="text-[#714dbf] text-xl" />
                </label>
              </div>
              {errors.cedulaReverso && !formData.cedulaReverso.name && (
                <p className="mt-1 text-sm text-red-600">{errorMessages.cedulaReverso}</p>
              )}

              <div className={`bg-gray-100 p-4 rounded-lg flex justify-between items-center ${errors.certificadoAntecedentes ? 'border border-red-500' : ''}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Certificado de Antecedentes *</label>
                  {formData.certificadoAntecedentes.name && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        {formData.certificadoAntecedentes.name}
                      </p>
                      <div className="mt-1">
                        {formData.certificadoAntecedentes.uploading && (
                          <p className="text-xs text-yellow-600">Subiendo...</p>
                        )}
                        {formData.certificadoAntecedentes.uploaded && (
                          <p className="text-xs text-green-600">✓ Subido correctamente</p>
                        )}
                        {formData.certificadoAntecedentes.error && (
                          <p className="text-xs text-red-600">✗ Error</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer">
                  <input
                    id="certificadoAntecedentes"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "certificadoAntecedentes")}
                    accept="image/*,application/pdf"
                  />
                  <FiPaperclip className="text-[#714dbf] text-xl" />
                </label>
              </div>
              {errors.certificadoAntecedentes && !formData.certificadoAntecedentes.name && (
                <p className="mt-1 text-sm text-red-600">{errorMessages.certificadoAntecedentes}</p>
              )}

              <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Certificado Adicional (Opcional)</label>
                  {formData.certificadoAdicional.name && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        {formData.certificadoAdicional.name}
                      </p>
                      <div className="mt-1">
                        {formData.certificadoAdicional.uploading && (
                          <p className="text-xs text-yellow-600">Subiendo...</p>
                        )}
                        {formData.certificadoAdicional.uploaded && (
                          <p className="text-xs text-green-600">✓ Subido correctamente</p>
                        )}
                        {formData.certificadoAdicional.error && (
                          <p className="text-xs text-red-600">✗ Error</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer">
                  <input
                    id="certificadoAdicional"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "certificadoAdicional")}
                    accept="image/*,application/pdf"
                  />
                  <FiPaperclip className="text-[#714dbf] text-xl" />
                </label>
              </div>
            </div>
          </div>

          {/* Sección Datos Bancarios */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Datos Bancarios</h2>

            <div className="space-y-4">
              <div className="relative">
                <select
                  className={`w-full p-3 border ${errors.banco ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10`}
                  value={formData.banco}
                  onChange={(e) => handleSelectChange(e, 'banco')}
                >
                  <option value="">Seleccione un banco</option>
                  {bancosChile.map(banco => (
                    <option key={banco} value={banco}>{banco}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
                {errors.banco && <p className="mt-1 text-sm text-red-600">{errorMessages.banco}</p>}
              </div>

              <div className="relative">
                <select
                  className={`w-full p-3 border ${errors.tipoCuenta ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10`}
                  value={formData.tipoCuenta}
                  onChange={(e) => handleSelectChange(e, 'tipoCuenta')}
                >
                  <option value="">Seleccione tipo de cuenta</option>
                  {tiposCuenta.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
                {errors.tipoCuenta && <p className="mt-1 text-sm text-red-600">{errorMessages.tipoCuenta}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Titular *</label>
                <input
                  type="text"
                  className={`w-full p-3 border ${errors.nombreTitular ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:border-transparent`}
                  value={formData.nombreTitular}
                  onChange={(e) => handleInputChange(e, 'nombreTitular')}
                  placeholder="Nombre como aparece en la cuenta"
                />
                {errors.nombreTitular && <p className="mt-1 text-sm text-red-600">{errorMessages.nombreTitular}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Número de Cuenta *</label>
                <input
                  type="text"
                  className={`w-full p-3 border ${errors.numeroCuenta ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:border-transparent`}
                  value={formData.numeroCuenta}
                  onChange={(e) => handleInputChange(e, 'numeroCuenta')}
                  placeholder="Número de cuenta bancaria"
                />
                {errors.numeroCuenta && <p className="mt-1 text-sm text-red-600">{errorMessages.numeroCuenta}</p>}
              </div>
            </div>
          </div>

          {/* Botón de enviar */}
          <div className="mt-6 flex justify-content">
            <button
              type="submit"
              disabled={submitting}
              onClick={handleSubmit}
              className={`w-full py-3 rounded-lg font-bold transition-colors ${submitting
                ? "bg-[#9e7fd9] cursor-not-allowed"
                : "bg-[#714dbf] hover:bg-[#5d3d9f]"
                } text-white`}
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                  </svg>
                  Enviando...
                </div>
              ) : (
                "Enviar Formulario"
              )}
            </button>
          </div>
        </div>
      </div>
      {showSuccessPopup && (
        <FormSuccessPopup onClose={handleClosePopup} />
      )}
    </div>
  );
}