import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    experienciaProfesional: "",
    descripcionPersonal: "",
    areasTrabajo: "",
    disponibilidad: "",
    fotoPerfil: null,
    certificadoAntecedentes: null,
    cedulaIdentidad: { frente: null, reverso: null },
    certificadoAdicional: null,
    fuenteContacto: "",
  });

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Completa tu información</h2>
      
      <label className="block mb-2">Experiencia Profesional</label>
      <textarea
        className="w-full p-2 border rounded"
        value={formData.experienciaProfesional}
        onChange={(e) => setFormData({ ...formData, experienciaProfesional: e.target.value })}
      />
      
      <label className="block mt-4 mb-2">Descripción Personal</label>
      <textarea
        className="w-full p-2 border rounded"
        value={formData.descripcionPersonal}
        onChange={(e) => setFormData({ ...formData, descripcionPersonal: e.target.value })}
      />
      
      <label className="block mt-4 mb-2">Áreas de Trabajo</label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={formData.areasTrabajo}
        onChange={(e) => setFormData({ ...formData, areasTrabajo: e.target.value })}
      />
      
      <label className="block mt-4 mb-2">Disponibilidad</label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={formData.disponibilidad}
        onChange={(e) => setFormData({ ...formData, disponibilidad: e.target.value })}
      />
      
      <label className="block mt-4 mb-2">Foto de Perfil</label>
      <button className="bg-gray-200 p-2 rounded" onClick={() => document.getElementById("fotoPerfil").click()}>
        Seleccionar archivo
      </button>
      <input id="fotoPerfil" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "fotoPerfil")} />
      {formData.fotoPerfil && <p>{formData.fotoPerfil.name}</p>}
      
      <label className="block mt-4 mb-2">Certificado de Antecedentes</label>
      <button className="bg-gray-200 p-2 rounded" onClick={() => document.getElementById("certificadoAntecedentes").click()}>
        Seleccionar archivo
      </button>
      <input id="certificadoAntecedentes" type="file" className="hidden" onChange={(e) => handleFileChange(e, "certificadoAntecedentes")} />
      {formData.certificadoAntecedentes && <p>{formData.certificadoAntecedentes.name}</p>}
      
      <label className="block mt-4 mb-2">Cédula de Identidad (Frente)</label>
      <button className="bg-gray-200 p-2 rounded" onClick={() => document.getElementById("cedulaFrente").click()}>
        Seleccionar archivo
      </button>
      <input id="cedulaFrente" type="file" className="hidden" onChange={(e) => handleFileChange(e, "cedulaIdentidad.frente")} />
      {formData.cedulaIdentidad.frente && <p>{formData.cedulaIdentidad.frente.name}</p>}
      
      <label className="block mt-4 mb-2">Cédula de Identidad (Reverso)</label>
      <button className="bg-gray-200 p-2 rounded" onClick={() => document.getElementById("cedulaReverso").click()}>
        Seleccionar archivo
      </button>
      <input id="cedulaReverso" type="file" className="hidden" onChange={(e) => handleFileChange(e, "cedulaIdentidad.reverso")} />
      {formData.cedulaIdentidad.reverso && <p>{formData.cedulaIdentidad.reverso.name}</p>}
      
      <label className="block mt-4 mb-2">Certificado Adicional</label>
      <button className="bg-gray-200 p-2 rounded" onClick={() => document.getElementById("certificadoAdicional").click()}>
        Seleccionar archivo
      </button>
      <input id="certificadoAdicional" type="file" className="hidden" onChange={(e) => handleFileChange(e, "certificadoAdicional")} />
      {formData.certificadoAdicional && <p>{formData.certificadoAdicional.name}</p>}
      
      <label className="block mt-4 mb-2">Fuente de Contacto</label>
      <select
        className="w-full p-2 border rounded"
        value={formData.fuenteContacto}
        onChange={(e) => setFormData({ ...formData, fuenteContacto: e.target.value })}
      >
        <option value="">Selecciona una opción</option>
        <option value="Redes Sociales">Redes Sociales</option>
        <option value="Recomendación">Recomendación</option>
        <option value="Publicidad">Publicidad</option>
      </select>
      
      <button className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Enviar
      </button>
    </div>
  );
}
