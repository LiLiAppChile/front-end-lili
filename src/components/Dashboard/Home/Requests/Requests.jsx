import Navbar from "../../BottomMenu/BottomMenu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";

const Requests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tabActivo, setTabActivo] = useState("pendientes");
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const bearerToken = import.meta.env.VITE_BEARER_TOKEN; // Obtener el token desde .env

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3001/pedidos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`, // Usar el token desde .env
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Error al cargar los pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [bearerToken]);

  const filteredOrders = tabActivo === "pendientes" ? orders : acceptedOrders;

  const handleAcceptOrder = (orderId) => {
    const orderToAccept = orders.find((order) => order.id === orderId);
    if (orderToAccept) {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      setAcceptedOrders((prevAccepted) => [...prevAccepted, orderToAccept]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white">
        {/* Encabezado */}
        <div className="p-4 border-b-2 border-gray-200">
          <h1 className="text-2xl font-bold">Trabajos</h1>
        </div>

        {/* Pestañas */}
        <div className="flex justify-between border-b">
          <button
            className={`flex-1 py-3 text-center ${
              tabActivo === "aceptadas"
                ? "text-purple-600 font-medium border-b-2 border-purple-600"
                : "text-gray-700"
            }`}
            onClick={() => setTabActivo("aceptadas")}
          >
            Aceptados
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              tabActivo === "pendientes"
                ? "text-purple-600 font-medium border-b-2 border-purple-600"
                : "text-gray-700"
            }`}
            onClick={() => setTabActivo("pendientes")}
          >
            Solicitudes
          </button>
        </div>

        {/* Buscador */}
        <div className="p-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar trabajo"
            className="flex-1 p-2 border rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="p-2 bg-gray-200 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16l-4-4m0 0l4-4m-4 4h16"
              />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 p-4">
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-3 rounded-md">
              {error}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-gray-100 text-gray-700 p-3 rounded-md text-center">
              No hay {tabActivo === "pendientes" ? "solicitudes" : "trabajos"}{" "}
              disponibles.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 text-sm">Cliente</th>
                    <th className="p-3 text-sm">Fecha</th>
                    <th className="p-3 text-sm">Hora</th>
                    <th className="p-3 text-sm">Tipo</th>
                    <th className="p-3 text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={order.id || order._id}
                      className={`cursor-pointer ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-purple-100 transition`}
                      onClick={() =>
                        navigate("/details", {
                          state: { orderDetails: order },
                        })
                      }
                    >
                      <td className="p-3 text-sm whitespace-nowrap">
                        {order.nombreCliente || "Cliente"}
                      </td>
                      <td className="p-3 text-sm whitespace-nowrap">
                        {order.fechaCreacion
                          ? new Date(order.fechaCreacion).toLocaleDateString()
                          : "Fecha no disponible"}
                      </td>
                      <td className="p-3 text-sm whitespace-nowrap">Ahora</td>
                      <td className="p-3 text-sm whitespace-nowrap">
                        <span className="inline-block p-2 rounded-full bg-blue-100 text-blue-600">
                          💧
                        </span>
                      </td>
                      <td className="p-3 text-right text-sm whitespace-nowrap">
                        <span className="text-purple-600">➔</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Paginación */}
        <div className="p-4 flex justify-between items-center">
          <button className="p-2 bg-gray-200 rounded-md">Anterior</button>
          <p className="text-sm text-gray-600">1-12 de 60</p>
          <button className="p-2 bg-gray-200 rounded-md">Siguiente</button>
        </div>
      </div>
    </>
  );
};

export default Requests;
