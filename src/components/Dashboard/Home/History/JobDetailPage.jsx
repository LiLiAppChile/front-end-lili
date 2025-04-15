// src/pages/JobDetailPage/JobDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// Importa tus datos de ejemplo (o tu lógica de fetch)
import { sampleHistoryData } from "./HistoryPage"; // Ajusta la ruta si es necesario

// Helper para formatear moneda (reutilizar o importar)
const formatCurrency = (value) => {
  if (value === undefined || value === null) return "";
  const numberValue =
    typeof value === "string"
      ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
      : value;
  if (isNaN(numberValue)) return "";
  return `$${numberValue.toLocaleString("es-CL")}`;
};

// Helper para obtener color de badge de especialidad
const getSpecialtyBadgeColor = (specialty) => {
  switch (specialty?.toLowerCase()) {
    case "gasfitería":
      return "bg-blue-100 text-blue-700";
    case "electricidad":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const JobDetailPage = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();

  // Encuentra el item correspondiente (en una app real, harías fetch)
  const item = sampleHistoryData.find((job) => job.id === id);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500">Trabajo no encontrado.</p>
        <button
          onClick={() => navigate("/historial")}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Volver al Historial
        </button>
      </div>
    );
  }

  // Determina si mostrar info de pago realizado
  const isPaid = item.status === "paid";
  const paymentDate = item.paid_date || item.fecha; // Usa fecha de pago si existe, si no la fecha del trabajo

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {" "}
      {/* Fondo blanco para la página de detalle */}
      {/* Header con botón de volver */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          {item.cliente}{" "}
          <span className="text-gray-500 font-normal">(#{item.id})</span>{" "}
          {/* Ajusta si tienes un ID de trabajo real */}
        </h1>
      </div>
      {/* Contenido Principal */}
      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        {/* Banner de Estado (Pago Realizado / Pendiente) */}
        {isPaid && item.paid_date && (
          <div className="p-3 bg-purple-100 text-purple-700 rounded-lg text-center font-medium text-sm">
            {item.boleta_url ? "Pago realizado el " : "Trabajo pagado el "}{" "}
            {item.paid_date}
          </div>
        )}
        {!isPaid && (
          <div className="p-3 bg-orange-100 text-orange-700 rounded-lg text-center font-medium text-sm">
            Pago Pendiente
          </div>
        )}

        {/* Sección Boleta (si está pagado y hay URL) */}
        {isPaid && item.boleta_url && (
          <div className="space-y-2">
            <h2 className="text-md font-semibold text-gray-800">Boleta</h2>
            <a
              href={item.boleta_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Idealmente una miniatura, si no, un placeholder o texto */}
              <img
                src={item.boleta_url}
                alt="Boleta"
                className="w-full h-auto object-contain max-h-60 bg-gray-100"
              />
              {/* O un texto si no quieres mostrar imagen directa: */}
              {/* <div className="p-4 text-center text-blue-600 hover:underline">Ver Boleta</div> */}
            </a>
          </div>
        )}

        {/* Información Técnica / Información Trabajo */}
        <div className="space-y-3">
          <h2 className="text-md font-semibold text-gray-800">
            {isPaid && item.boleta_url
              ? "Información trabajo"
              : "Información técnica"}
          </h2>
          <div className="text-sm space-y-1 text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Cliente:</span>{" "}
              {item.cliente}
            </p>
            <p>
              <span className="font-medium text-gray-900">Comuna:</span>{" "}
              {item.comuna}
            </p>
            <p>
              <span className="font-medium text-gray-900">Fecha:</span>{" "}
              {item.fecha}
            </p>
            <p>
              <span className="font-medium text-gray-900">Hora:</span>{" "}
              {item.hora}
            </p>
            <p>
              <span className="font-medium text-gray-900">Pago:</span>{" "}
              {formatCurrency(item.monto)}
            </p>
          </div>
        </div>

        {/* Especialidad */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Especialidad:</h3>
          <span
            className={`inline-block px-3 py-0.5 ${getSpecialtyBadgeColor(
              item.especialidad
            )} rounded-full font-medium text-xs`}
          >
            {item.especialidad}
          </span>
        </div>

        {/* Detalle */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Detalle:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {item.detalle.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Imágenes */}
        {item.imagenes && item.imagenes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Imágenes:</h3>
            <div className="grid grid-cols-3 gap-2">
              {item.imagenes.map((imgUrl, index) => (
                <a
                  key={index}
                  href={imgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  {/* Enlace opcional */}
                  <img
                    src={imgUrl}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border border-gray-200 hover:opacity-90"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Seguimiento (si aplica según tu lógica y datos) */}
        {(item.foto_inicio_url || item.foto_final_url) && (
          <div className="space-y-4">
            <h2 className="text-md font-semibold text-gray-800">Seguimiento</h2>
            {item.foto_inicio_url && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Inicio</p>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg text-sm">
                  <span>Foto del estado inicial</span>
                  {/* Icono upload o link */}
                  <a
                    href={item.foto_inicio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            )}
            {item.foto_final_url && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Término</p>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg text-sm">
                  <span>Foto del trabajo finalizado</span>
                  <a
                    href={item.foto_final_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resumen */}
        {item.resumen && (
          <div className="space-y-2">
            <h2 className="text-md font-semibold text-gray-800">Resumen</h2>
            {/* Usamos un div con borde para simular el textarea, o un textarea real deshabilitado */}
            <div className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 min-h-[80px]">
              {item.resumen}
            </div>
            {/* Alternativa con textarea real: */}
            {/* <textarea
                        value={item.resumen}
                        readOnly
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-0 resize-none min-h-[80px]"
                        rows={3}
                    /> */}
          </div>
        )}
      </div>{" "}
      {/* Fin Contenido Principal */}
      {/* Espacio extra al final para que no choque con nav si hubiera */}
      <div className="h-10"></div>
    </div> // Fin Contenedor Página
  );
};

export default JobDetailPage;
