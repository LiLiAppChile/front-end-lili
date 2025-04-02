"use client";
import Navbar from "../../BottomMenu/BottomMenu";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase"; // Importa la instancia de Firestore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Requests = () => {
  const [tabActivo, setTabActivo] = useState("pendientes");
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true); // Estado para manejar la carga

  // 🔥 Obtener datos de Firestore
  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pedidos"));
        const listaPedidos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Pedidos cargados:", listaPedidos);  // Verifica los pedidos cargados
        setPedidos(listaPedidos);
        setCargando(false);  // Cambia el estado de cargando a falso cuando se completan los datos
      } catch (error) {
        console.error("Error obteniendo los pedidos:", error);
        setCargando(false); // Asegúrate de cambiar el estado de cargando incluso si hay un error
      }
    };

    obtenerPedidos();
  }, []);

  // Muestra un mensaje mientras los datos se están cargando
  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white">
        <div className="border-b p-4 flex items-center gap-2">
          <h1 className="text-xl font-bold">Solicitudes</h1>
        </div>

        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center relative ${tabActivo === "pendientes" ? "text-purple-600 font-medium" : "text-gray-700"}`}
            onClick={() => setTabActivo("pendientes")}
          >
            Pendientes
            {tabActivo === "pendientes" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>}
          </button>
          <button
            className={`flex-1 py-3 text-center relative ${tabActivo === "aceptadas" ? "font-medium" : "text-gray-700"}`}
            onClick={() => setTabActivo("aceptadas")}
          >
            Aceptadas
            {tabActivo === "aceptadas" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>}
          </button>
        </div>

        <div className="p-3 flex justify-end">
          <button className="text-purple-600 flex items-center gap-1 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-filter"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtrar solicitudes
          </button>
        </div>

        <div className="px-4 pb-4 space-y-3">
          {pedidos
            .filter(pedido => pedido.estado === tabActivo || !pedido.estado) // Filtrar por estado o aquellos sin estado
            .map(pedido => {
              // Log para verificar si billing_address está presente y si contiene datos
              console.log("Pedido ID:", pedido.id);
              console.log("Billing Address:", pedido.nombreCliente);
              console.log("Billing Address:", pedido.datosOriginales.billing_address.address);
              
              // Verifica si billing_address existe antes de acceder a sus propiedades
              if (!pedido.datosOriginales) {
                console.log("No existe datosOriginales para este pedido");
              }
              
              return (
                <div key={pedido.id} className="bg-[#EAECF6] rounded-md p-3">
                  <div className="flex justify-between">
                    <div>
                      {/* Verificar si billing_address existe antes de intentar acceder a name y address */}
                      <p className="font-medium">
                        {pedido.nombreCliente || "Nombre no disponible"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {pedido.datosOriginales.billing_address.address || "Dirección no disponible"}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2.5">
                    <button
                    className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                      <button
                    className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                      >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Requests;
