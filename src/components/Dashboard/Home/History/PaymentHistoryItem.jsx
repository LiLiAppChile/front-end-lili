import { useNavigate } from "react-router-dom";

// Helper para formatear moneda (puedes ponerlo en un archivo utils)
const formatCurrency = (value) => {
    if (value === undefined || value === null) return "";
    // Detecta si es un número antes de formatear
    const numberValue =
        typeof value === "string"
            ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
            : value;
    if (isNaN(numberValue)) return ""; // Devuelve vacío si no es un número válido
    return `$${numberValue.toLocaleString("es-CL")}`; // Formato chileno
};

const PaymentHistoryItem = ({ item }) => {
    const navigate = useNavigate();

    // Navegar a la vista de detalle (que ahora mostrará info del trabajo/pago)
    const handleItemClick = (id) => {
        console.log(`Navigating to details for payment/job ${id}`);
        navigate(`/historial/detalle/${id}`); // Usamos la misma ruta de detalle
    };

    return (
        <button
            onClick={() => handleItemClick(item.id)}
            className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 rounded-lg shadow-sm text-left text-sm"
        >
            {/* Cliente */}
            <span className="w-2/5 font-medium text-gray-900 truncate pr-2">
                {item.cliente}
            </span>

            {/* Fecha */}
            <span className="w-1/4 text-gray-600 text-center">{item.fecha}</span>

            {/* Monto */}
            <div className="w-1/4 flex justify-end">
                {" "}
                {/* Alineado a la derecha dentro de su celda */}
                <span className="inline-block px-3 py-0.5 bg-green-100 text-green-700 rounded-full font-medium text-xs">
                    {formatCurrency(item.monto)}
                </span>
            </div>

            {/* Arrow Icon */}
            <div className="w-auto pl-2 flex justify-end">
                {" "}
                {/* Asegurar que la flecha esté al final */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
            </div>
        </button>
    );
};

export default PaymentHistoryItem;