  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faFlag } from "@fortawesome/free-regular-svg-icons";
  import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
  import { faComment } from "@fortawesome/free-regular-svg-icons";
  import { faCamera } from "@fortawesome/free-solid-svg-icons";
  import { faCancel } from "@fortawesome/free-solid-svg-icons";
  import Navbar from "../../BottomMenu/BottomMenu"
  
  export default function TaskDetail() {
    return (
      <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 max-w-md w-full mx-auto bg-white pb-16">
          <div className="p-4 border-b-1 border-[#DDE1E6] flex items-center">
            <button className="mr-2">
              <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6 text-[#714DBF]"/>
            </button>
            <h1 className="text-lg font-bold">Número o nombre solicitud</h1>
          </div>
  
          <div className="flex justify-around py-4">
            <div className="flex flex-col items-center">
              <div className="bg-[#714DBF] text-white p-3 rounded-full mb-1">
              <FontAwesomeIcon icon={faFlag} className="h-6 w-6"/>
              </div>
              <span className="text-xs">Iniciar</span>
            </div>
  
            <div className="flex flex-col items-center">
              <div className="bg-[#714DBF] text-white p-3 rounded-full mb-1">
                <FontAwesomeIcon icon={faComment} className="h-6 w-6" />
              </div>
              <span className="text-xs">Chat</span>
            </div>


            <div className="flex flex-col items-center">
              <div className="bg-[#714DBF] text-white p-3 rounded-full mb-1">
                <FontAwesomeIcon icon={faCamera} className="h-6 w-6" />
              </div>
              <span className="text-xs">Subir foto</span>
            </div>
  
            <div className="flex flex-col items-center">
              <div className="bg-[#CD4514] text-white p-3 rounded-full mb-1">
                <FontAwesomeIcon icon={faCancel} className="h-6 w-6" />
              </div>
              <span className="text-xs">Cancelar</span>
            </div>
          </div>
  
          <div className="p-4">
            <h2 className="text-xl font-bold mb-3">Información técnica</h2>
            <div className="bg-[#EAECF6] rounded-lg p-4">
              <div className="space-y-1 mb-4">
                <p>
                  <span className="font-medium">Nombre cliente:</span> Lorem Ipsum
                </p>
                <p>
                  <span className="font-medium">Comuna:</span> Lorem Ipsum
                </p>
                <p>
                  <span className="font-medium">Dirección:</span> Lorem Ipsum
                </p>
                <p>
                  <span className="font-medium">Fecha:</span> 02-02-2025
                </p>
                <p>
                  <span className="font-medium">Hora:</span> 00:00
                </p>
                <p>
                  <span className="font-medium">Pago:</span> $20,000
                </p>
              </div>
  
              <div className="mb-3">
                <p className="font-medium">
                  Tipo de trabajo:
                  <span className="bg-[#9BA5B7] px-3 py-1 rounded-full text-sm ml-2">Especialidad</span>
                </p>
              </div>
  
              <div>
                <p className="font-medium mb-1">Detalle:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Instalación 4x Enchufes.</li>
                  <li>Instalación televisión.</li>
                  <li>Lorem ipsum.</li>
                  <li>Lorem ipsum.</li>
                </ul>
              </div>
            </div>
          </div>
  
          <div className="p-4">
            <h2 className="text-xl font-bold">Seguimiento</h2>
          </div>
        </div>
      </div>
      </>
    )
  }
  
  