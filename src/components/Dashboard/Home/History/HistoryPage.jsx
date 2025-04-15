// src/pages/HistoryPage/HistoryPage.jsx
import React, { useState } from "react"; // Removed useNavigate if handled in HistoryItem
// Assuming BottomMenu is correctly imported
import Navbar from "../../BottomMenu/BottomMenu";
import HistoryItem from "./HistoryItem"; // Import the new component

// --- Sample Data (Replace with actual data fetching) ---

const formatCurrency = (value) => {
  if (value === undefined || value === null) return "";
  return `$${value.toLocaleString("es-CL")}`; // Formato chileno
};

export const sampleHistoryData = [
  {
    id: "1",
    cliente: "Mariana",
    comuna: "Las Condes",
    fecha: "21-03-25",
    hora: "10:00",
    type: "water", // 'water' o 'electric'
    status: "pending", // 'pending', 'paid' (o 'completed_pending_payment', 'completed_paid')
    monto: 85000,
    especialidad: "Gasfitería",
    detalle: [
      "Revisión calefont",
      "Cambio de flexible cocina",
      "Ajuste llave baño",
    ],
    imagenes: [
      // URLs de ejemplo
      "https://via.placeholder.com/150/771796", // Reemplazar con tus URLs reales
      "https://via.placeholder.com/150/24f355",
      "https://via.placeholder.com/150/d32776",
    ],
    foto_inicio_url: "https://via.placeholder.com/150/f66b97",
    foto_final_url: "https://via.placeholder.com/150/56a8c2",
    resumen:
      "Se realizó la revisión y ajustes solicitados. Queda pendiente el pago.",
    boleta_url: null, // URL a la boleta/factura si está pagado
    paid_date: null,
  },
  {
    id: "2",
    cliente: "Nicolás",
    comuna: "Providencia",
    fecha: "20-03-25",
    hora: "15:30",
    type: "electric",
    status: "pending",
    monto: 120500,
    especialidad: "Electricidad",
    detalle: ["Instalación de 3 enchufes nuevos", "Revisión tablero eléctrico"],
    imagenes: ["https://via.placeholder.com/150/b0f7cc"],
    foto_inicio_url: "https://via.placeholder.com/150/54176f",
    foto_final_url: null, // Aún no terminado quizás
    resumen: "Instalación eléctrica en progreso.",
    boleta_url: null,
    paid_date: null,
  },
  {
    id: "3",
    cliente: "Belén Astudillo", // Nombre completo
    comuna: "Las Condes", // Añadido
    fecha: "18-03-25",
    hora: "12:00", // Añadido
    type: "electricidad",
    status: "paid", // Cambiado a pagado
    monto: 80000, // Añadido monto
    especialidad: "Electricidad", // Añadido
    detalle: [
      "Solicitud de presupuesto personalizado",
      "Nueva ruta de cableado para vivienda",
    ], // Añadido
    imagenes: [
      // Añadido
      "https://via.placeholder.com/150/51aa97",
      "https://via.placeholder.com/150/810b14",
      "https://via.placeholder.com/150/1ee8a4",
    ],
    foto_inicio_url: null,
    foto_final_url: "https://via.placeholder.com/150/66b7d2", // Añadido
    resumen: "Trabajo eléctrico finalizado y pagado según boleta adjunta.", // Añadido
    boleta_url: "https://www.sii.cl/images/boleta_ejemplo.png", // URL de ejemplo boleta
    paid_date: "25-03-25", // Fecha de pago
  },
  {
    id: "4",
    cliente: "Emilia Arellano", // Nombre completo
    comuna: "Providencia", // Añadido
    fecha: "16-03-25",
    hora: "12:00", // Añadido
    type: "water",
    status: "paid",
    monto: 80000, // Añadido monto
    especialidad: "Gasfitería", // Añadido
    detalle: [
      "Revisión calefont.",
      "Revisión tuberías.",
      "Instalación 4x grifos.",
      "Instalación de filtro.",
    ], // Añadido
    imagenes: [
      // Añadido
      "https://via.placeholder.com/150/24f355",
      "https://via.placeholder.com/150/d32776",
      "https://via.placeholder.com/150/f66b97",
    ],
    foto_inicio_url: "https://via.placeholder.com/150/56a8c2", // Añadido
    foto_final_url: "https://via.placeholder.com/150/b0f7cc", // Añadido
    resumen: "Trabajo de gasfitería completado exitosamente. Pago recibido.", // Añadido
    boleta_url: "https://www.sii.cl/images/factura_ejemplo.png", // URL de ejemplo factura
    paid_date: "27-03-25", // Fecha de pago
  },
  // Añade más datos con la nueva estructura si necesitas paginación completa
];
// Add more items if needed for pagination testing

// --- End Sample Data ---

const HistoryPage = () => {
  const [tabActivo, setTabActivo] = useState("trabajos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // --- Filtrado y Paginación ---

  const filteredData = sampleHistoryData; // Pendiente agregar lógica de filtrado y fetch de Data
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {" "}
      <div className="bg-white p-4 flex items-center gap-2 border-b border-gray-200 pb-4">
        <img src="./src/assets/HistorialIcon.png" alt="historial" />
        <h1 className="text-2xl font-bold text-gray-800">Historial</h1>
      </div>
      {/* Tabs */}
      <div className="flex border-b bg-white border-gray-200">
        <button
          className={`flex-1 py-3 text-center font-medium text-sm relative ${
            // Adjusted font size
            tabActivo === "trabajos"
              ? "text-purple-600"
              : "text-gray-500 hover:text-gray-700" // Adjusted inactive color
          }`}
          onClick={() => setTabActivo("trabajos")}
        >
          Trabajos
          {tabActivo === "trabajos" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
          )}
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium text-sm relative ${
            // Adjusted font size
            tabActivo === "pagos"
              ? "text-purple-600"
              : "text-gray-500 hover:text-gray-700" // Adjusted inactive color
          }`}
          onClick={() => setTabActivo("pagos")}
        >
          Pagos
          {tabActivo === "pagos" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
          )}
        </button>
      </div>
      {/* Search Bar */}
      <div className="p-4 bg-white">
        {" "}
        {/* Added bg-white wrapper */}
        <div className="relative h-12">
          <input
            type="text"
            placeholder="Buscar trabajo"
            // Adjusted padding right to make space for icons inside
            className="w-full h-full pl-4 pr-20 border border-[#9BA5B7] rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" // Changed focus ring color
          />
          {/* Container for icons inside the input */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-3">
            {/* Use actual icons */}
            <button className="text-gray-500 hover:text-gray-700">
              <img src="./src/assets/Filter.png" alt="filter" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <img src="./src/assets/search.png" alt="search" />
            </button>
          </div>
        </div>
      </div>
      {/* Pagination Info */}
      <div className="px-4 pt-1 pb-3 bg-white flex justify-end items-center text-xs text-gray-500">
        {" "}
        {/* Adjusted styles */}
        {`${startIndex + 1}-${Math.min(endIndex, totalItems)} de ${totalItems}`}
      </div>
      {/* Content Area: Header + List */}
      <div className="flex-grow px-4 pb-20 bg-white">
        {" "}
        {/* Added pb-20 to avoid overlap with bottom nav */}
        {/* Table Header */}
        <div className="flex items-center justify-between p-3 mb-1 bg-white rounded-md text-xs font-medium text-gray-600">
          {/* Adjusted column widths to match HistoryItem approx */}
          <div className="w-1/4 pr-2 text-left">Cliente</div>
          <div className="w-1/4 text-center">Fecha</div>
          <div className="w-1/4 text-center">Tipo</div>
          <div className="w-1/4 text-center">Pago</div>
          <div className="w-auto pl-2">
            <span className="w-4"></span>
          </div>{" "}
          {/* Spacer for arrow column */}
        </div>
        {/* History List */}
        <div>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <HistoryItem key={item.id} item={item} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
              No hay historial para mostrar.
            </p>
          )}
        </div>
        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Página anterior"
            >
              <img src="./src/assets/Group151.png" alt="group151" />
            </button>

            {/* Simple Page Indicator (Could expand to show page numbers) */}
            <span className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            {/* Example of numbered pages (add more logic for ellipsis ...) */}
            {/* {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'hover:bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))} */}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Página siguiente"
            >
              <img src="./src/assets/Group150.png" alt="group150" />
            </button>
          </div>
        )}
      </div>{" "}
      {/* End Content Area */}
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
};

export default HistoryPage;
