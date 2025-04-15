import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "./ItemIconIndex";

const getIconDetails = (type, value) => {
  switch (type) {
    case "especialidad":
      switch (value) {
        case "Gasfitería":
          return {
            icon: Icons.gasfitería,
          };
        case "Electricidad":
          return {
            icon: Icons.electricidad,
          };
        default:
          return {
            icon: "?",
            bgColor: "bg-gray-100",
            textColor: "text-gray-600",
          };
      }
    case "payment":
      switch (value) {
        case "pending":
          return {
            icon: Icons.pending,
          };
        case "paid":
          return {
            icon: Icons.paid,
          };
        default:
          return {
            icon: Icons.otros,
          };
      }
    default:
      return { icon: Icons.otros };
  }
};

const HistoryItem = ({ item }) => {
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    console.log(`Navigating to details for item ${id}`);
    navigate(`/historial/detalle/${id}`); // Navega a la ruta de detalle con el ID
  };

  const typeDetails = getIconDetails("especialidad", item.especialidad);
  const paymentDetails = getIconDetails("payment", item.status);

  return (
    <button
      onClick={() => handleItemClick(item.id)}
      className="w-full flex items-center justify-between p-4 mb-3 bg-[#EAECF6] hover:bg-gray-50 rounded-lg shadow-sm text-left text-sm"
    >
      {/* Client Name */}
      <span className="w-1/4 font-medium text-gray-800 truncate pr-2">
        {item.cliente}
      </span>

      {/* Date */}
      <span className="w-1/4 text-gray-600 text-center">{item.fecha}</span>

      {/* Type Icon */}
      <div className="w-1/4 flex justify-center pl-4">
        <img src={typeDetails.icon} className="h-6 w-8" />
      </div>

      {/* Payment Icon */}
      <div className="w-1/4 flex justify-center pl-4">
        <img src={paymentDetails.icon} className="h-6 w-8" />
      </div>

      {/* Arrow Icon */}
      <div className="w-auto pl-2">
        <img src="./src/assets/Arrow.png" alt="arrow" />
      </div>
    </button>
  );
};

export default HistoryItem;
