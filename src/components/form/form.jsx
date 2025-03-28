import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPaperclip, FiChevronDown } from "react-icons/fi";

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

// Generar horarios de 6 AM a 8 PM
const horariosDisponibles = Array.from({ length: 15 }, (_, i) => {
  const hora = i + 6;
  return `${hora <= 12 ? hora : hora - 12}:00 ${hora < 12 ? 'AM' : 'PM'}`;
});

const bancosChile = [
  "Banco de Chile", "Banco Estado", "Banco BCI", 
  "Banco Santander", "Banco Itaú", "Banco Scotiabank",
  "Banco BBVA", "Banco BICE", "Banco Security"
];

const tiposCuenta = [
  "Cuenta Vista", "Cuenta Corriente", "Cuenta Ahorro",
  "Cuenta RUT"
];

// Componente de checkbox cuadrado personalizado
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
  const [formData, setFormData] = useState({
    // Datos personales
    rut: "",
    telefono: "",
    region: "",
    comuna: "",
    especialidades: [],
    horariosSeleccionados: [],
    registradoSII: null,
    inicioActividadesSII: null,
    movilizacion: null,
    herramientas: null,
    
    // Documentos
    cedulaFrente: null,
    cedulaReverso: null,
    certificadoAntecedentes: null,
    certificadoAdicional: null,
    
    // Datos bancarios
    banco: "",
    tipoCuenta: "",
    nombreTitular: "",
    numeroCuenta: ""
  });

  const [showHorarios, setShowHorarios] = useState(false);

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === prev[field] ? null : value
    }));
  };

  const handleHorarioChange = (horario) => {
    setFormData(prev => {
      if (prev.horariosSeleccionados.includes(horario)) {
        return {
          ...prev,
          horariosSeleccionados: prev.horariosSeleccionados.filter(h => h !== horario)
        };
      } else {
        return {
          ...prev,
          horariosSeleccionados: [...prev.horariosSeleccionados, horario]
        };
      }
    });
  };

  const addSpecialty = (e) => {
    const specialty = e.target.value;
    if (specialty && !formData.especialidades.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        especialidades: [...prev.especialidades, specialty]
      }));
    }
    e.target.value = "";
  };

  const removeSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades.filter(e => e !== specialty)
    }));
  };

  return (
    <div className="min-h-screen bg-white p-4 max-w-2xl mx-auto">
      {/* Encabezado con flecha de regreso */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center text-[#6D28D9] text-2xl font-bold mr-2 cursor-pointer"
        >
          <span className="text-[#6D28D9] text-3xl font-medium">&lt;</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Formulario de Postulación</h1>
      </div>

      <div className="border-b border-gray-200 mb-6"></div>

      {/* Sección Datos Personales */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Datos Personales</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">RUT *</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:border-transparent"
              value={formData.rut}
              onChange={(e) => setFormData({...formData, rut: e.target.value})}
              placeholder="Ej: 12345678-9"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Número de Teléfono *</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:border-transparent"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              placeholder="+569 1234 5678"
            />
          </div>
          
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10"
              value={formData.region}
              onChange={(e) => setFormData({...formData, region: e.target.value})}
            >
              <option value="">Región</option>
              {regionesChile.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
          </div>
          
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10"
              value={formData.comuna}
              onChange={(e) => setFormData({...formData, comuna: e.target.value})}
            >
              <option value="">Comuna</option>
              {comunasChile.map(comuna => (
                <option key={comuna} value={comuna}>{comuna}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
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
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10"
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
          </div>
          
          <div className="relative">
            <div 
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10 cursor-pointer"
              onClick={() => setShowHorarios(!showHorarios)}
            >
              {formData.horariosSeleccionados.length > 0 
                ? formData.horariosSeleccionados.join(", ")
                : "Seleccione disponibilidad"}
            </div>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
            
            {showHorarios && (
              <div className="mt-2 p-3 border border-gray-300 rounded-lg bg-white max-h-60 overflow-y-auto">
                {horariosDisponibles.map((horario, index) => (
                  <div key={index} className="py-1">
                    <SquareCheckbox
                      checked={formData.horariosSeleccionados.includes(horario)}
                      onChange={() => handleHorarioChange(horario)}
                      label={horario}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
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
            
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
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
            
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
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
            
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
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
          </div>
        </div>
      </div>

      {/* Sección Documentos */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Documentos</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cédula de Identidad (Frente) *</label>
              {formData.cedulaFrente && (
                <p className="text-sm text-gray-500 mt-1">{formData.cedulaFrente.name}</p>
              )}
            </div>
            <label className="cursor-pointer">
              <input 
                id="cedulaFrente" 
                type="file" 
                className="hidden" 
                onChange={(e) => handleFileChange(e, "cedulaFrente")} 
              />
              <FiPaperclip className="text-[#714dbf] text-xl" />
            </label>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cédula de Identidad (Reverso) *</label>
              {formData.cedulaReverso && (
                <p className="text-sm text-gray-500 mt-1">{formData.cedulaReverso.name}</p>
              )}
            </div>
            <label className="cursor-pointer">
              <input 
                id="cedulaReverso" 
                type="file" 
                className="hidden" 
                onChange={(e) => handleFileChange(e, "cedulaReverso")} 
              />
              <FiPaperclip className="text-[#714dbf] text-xl" />
            </label>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Certificado de Antecedentes *</label>
              {formData.certificadoAntecedentes && (
                <p className="text-sm text-gray-500 mt-1">{formData.certificadoAntecedentes.name}</p>
              )}
            </div>
            <label className="cursor-pointer">
              <input 
                id="certificadoAntecedentes" 
                type="file" 
                className="hidden" 
                onChange={(e) => handleFileChange(e, "certificadoAntecedentes")} 
              />
              <FiPaperclip className="text-[#714dbf] text-xl" />
            </label>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Certificado Adicional (Opcional)</label>
              {formData.certificadoAdicional && (
                <p className="text-sm text-gray-500 mt-1">{formData.certificadoAdicional.name}</p>
              )}
            </div>
            <label className="cursor-pointer">
              <input 
                id="certificadoAdicional" 
                type="file" 
                className="hidden" 
                onChange={(e) => handleFileChange(e, "certificadoAdicional")} 
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
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10"
              value={formData.banco}
              onChange={(e) => setFormData({...formData, banco: e.target.value})}
            >
              <option value="">Seleccione un banco</option>
              {bancosChile.map(banco => (
                <option key={banco} value={banco}>{banco}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
          </div>
          
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#714dbf] appearance-none pr-10"
              value={formData.tipoCuenta}
              onChange={(e) => setFormData({...formData, tipoCuenta: e.target.value})}
            >
              <option value="">Seleccione tipo de cuenta</option>
              {tiposCuenta.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#714dbf]" />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Titular *</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:border-transparent"
              value={formData.nombreTitular}
              onChange={(e) => setFormData({...formData, nombreTitular: e.target.value})}
              placeholder="Nombre como aparece en la cuenta"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Número de Cuenta *</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:border-transparent"
              value={formData.numeroCuenta}
              onChange={(e) => setFormData({...formData, numeroCuenta: e.target.value})}
              placeholder="Número de cuenta bancaria"
            />
          </div>
        </div>
      </div>

      {/* Botón de enviar */}
      <div className="mt-6 flex justify-content ">
        <button 
          className="w-70 bg-[#714dbf] text-white py-3 mx-auto rounded-lg font-bold hover:bg-[#5d3d9f] transition focus:outline-none focus:ring-2 focus:ring-[#714dbf] focus:ring-offset-2"
          onClick={() => console.log(formData)}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}