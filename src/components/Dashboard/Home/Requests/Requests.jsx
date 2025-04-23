import Navbar from "../../BottomMenu/BottomMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// EN ESTE COMPONENTE LA NAVBAR SE DESPLAZA UN POCO A LA DERECHA AL ABRIRLO PORQUE NO HAY SCROLLBAR. QUEDA POR SOLUCIONAR.
const Requests = () => {
  const navigate = useNavigate();

  const [tabActivo, setTabActivo] = useState("pendientes");

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white overflow-y-scroll">
        <div className=" p-4 flex items-center gap-2 border-b-2 mb-5 border-gray-200 pb-4">
          <img src="./src/assets/Vector.png" alt="checkbox" />
          <h1 className="text-2xl font-bold">Solicitudes</h1>
        </div>

        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center relative ${
              tabActivo === "pendientes"
                ? "text-purple-600 font-medium"
                : "text-gray-700"
            }`}
            onClick={() => setTabActivo("pendientes")}
          >
            Pendientes
            {tabActivo === "pendientes" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
          <button
            className={`flex-1 py-3 text-center relative ${tabActivo === "aceptadas" ? "font-medium" : "text-gray-700"}`}
            onClick={() => setTabActivo("aceptadas")}
          >
            Aceptadas
            {tabActivo === "aceptadas" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
            )}
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
          <div className="bg-[#EAECF6] rounded-md p-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Nombre</p>
                <p className="text-sm text-gray-600">Fecha</p>
                <p className="text-sm text-gray-600">Comuna</p>
                <button
                  onClick={() => navigate("/details")}
                  className="btn-details bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 border border-blue-500 transition px-2 py-1"
                >
                  Ver detalles
                </button>
              </div>
              <div className="flex gap-2 pt-2.5">
                <button className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
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
                <button className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
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
        </div>
      </div>
    </>
  );
};

export default Requests;
