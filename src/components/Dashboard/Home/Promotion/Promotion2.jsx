import { useNavigate } from "react-router-dom";
import promocion from "@/assets/prom22.png";
import arrowIcon from "@/assets/arrow.png"; // Importa la flecha

const Promocion2 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-white">
            {/* Encabezado sticky */}
            <div className="sticky top-0 bg-white z-10 py-4 px-4 border-b border-gray-200">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate("/home")}
                        className="mr-2 cursor-pointer"
                        aria-label="Volver"
                    >
                        <img
                            src={arrowIcon}
                            alt="Flecha atrás"
                            className="rotate-180"
                        />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Promoción Especial</h1>
                </div>
            </div>

            {/* Contenido de la publicación */}
            <div className="p-4 bg-[#eaecf6] items-center justify-center rounded-lg shadow-md max-w-2xl mx-auto mt-4 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-[#6D28D9] text-center">¡15% de descuento en Kit de Instalación de Gas Splendid!</h2>
                <img
                    src={promocion}
                    alt="Kit de instalación de gas Splendid en promoción"
                    className="w-full max-w-sm mx-auto rounded-lg mb-6 object-cover"
                />
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                    No dejes pasar esta oportunidad de equipar tu hogar con un kit de instalación de gas <span className="font-semibold">Splendid</span> con un increíble <span className="font-semibold">15% de descuento</span>. Calidad, seguridad y facilidad de instalación en un solo producto.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                    Aprovecha esta oferta exclusiva y asegura el funcionamiento óptimo de tus equipos de gas. Promoción válida hasta agotar stock o hasta el <strong>30 de junio</strong>.
                </p>
            </div>
        </div>
    );
};

export default Promocion2;
