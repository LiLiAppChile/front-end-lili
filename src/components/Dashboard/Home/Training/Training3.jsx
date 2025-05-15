import { useNavigate } from "react-router-dom";
import trainingImg from "@/assets/cap3.png";
import arrowIcon from "@/assets/arrow.png";

const Training3 = () => {
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
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Capacitación Especial</h1>
                </div>
            </div>

            {/* Contenido de la publicación */}
            <div className="p-4 bg-[#eaecf6] items-center justify-center rounded-lg shadow-md max-w-2xl mx-auto mt-4 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-[#6D28D9] text-center">Manejo correcto de circuitos eléctricos</h2>
                <img
                    src={trainingImg}
                    alt="Capacitación sobre manejo de circuitos eléctricos"
                    className="w-full max-w-sm mx-auto rounded-lg mb-6 object-cover"
                />
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                    Capacítate en el manejo seguro y eficiente de circuitos eléctricos para evitar riesgos y garantizar un correcto funcionamiento en instalaciones residenciales y comerciales.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                    Mejora tu práctica profesional y asegura la seguridad eléctrica. Inscripciones abiertas hasta el <strong>25 de junio</strong>.
                </p>
            </div>
        </div>
    );
};

export default Training3;
