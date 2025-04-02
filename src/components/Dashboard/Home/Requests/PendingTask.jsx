import Navbar from "../../BottomMenu/BottomMenu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ExampleImages from "../../../../assets/example-image01.png"

const PendingTask = () => {
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

              <div className="flex space-x-3 mt-5">
                <img src={ExampleImages} alt="" className="w-24 h-24 border-1 rounded-xl object-cover"/>
                <img src={ExampleImages} alt="" className="w-24 h-24 border-1 rounded-xl object-cover"/>
                <img src={ExampleImages} alt="" className="w-24 h-24 border-1 rounded-xl object-cover"/>

              </div>
            </div>
          </div>
  
            <div className="p-4 flex space-x-4 justify-center items-center max-w-full">
                <button className="bg-[#64B23A] py-2 px-9 rounded-lg text-white">Aceptar</button>
                <button className="bg-[#CD4514] py-2 px-9 rounded-lg text-white">Rechazar</button>
            </div>
        </div>
      </div>
      </>
    )
}

export default PendingTask;