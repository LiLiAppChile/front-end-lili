import { useNavigate } from "react-router-dom";
import Icons from "../../../ItemIconIndex";

const getIconDetails = (type, value) => {
    switch (type) {
        case "especialidad":
            switch (value) {
                case "Gasfitería":
                    return { icon: Icons.Gasfitería };
                case "Electricidad":
                    return { icon: Icons.Electricidad };
                case "Cerrajería":
                    return { icon: Icons.Cerrajería };
                case "Limpieza":
                    return { icon: Icons.Limpieza };
                case "Seguridad":
                    return { icon: Icons.Seguridad };
                case "Climatización":
                    return { icon: Icons.Climatización };
                case "Carpintería":
                    return { icon: Icons.Carpintería };
                case "Albañilería":
                    return { icon: Icons.Albañilería };
                case "Pintura":
                    return { icon: Icons.Pintura };
                case "Jardinería":
                    return { icon: Icons.Jardinería };
                case "Artefactos":
                    return { icon: Icons.Artefactos };
                case "Control de plagas":
                    return { icon: Icons["Control de plagas"] };
                default:
                    return { icon: Icons.Otros };
            }
        case "payment":
            switch (value) {
                case "pending":
                    return { icon: Icons.pending };
                case "paid":
                    return { icon: Icons.paid };
                case "accepted":
                    return { icon: Icons.acceppted };
                case "canceled":
                    return { icon: Icons.canceled };
                default:
                    return { icon: Icons.Otros };
            }
        default:
            return { icon: Icons.Otros };
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