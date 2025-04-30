import { useNavigate } from "react-router-dom";
import promocion from "@/assets/promocion.png";

const Promocion1 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-white">
            {/* Encabezado sticky */}
            <div className="sticky top-0 bg-white z-10 py-4 px-4 border-b border-gray-200">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate("/home")}
                        className="text-[#6D28D9] text-3xl font-medium mr-2 cursor-pointer"
                    >
                        &lt;
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Promoción Especial</h1>
                </div>
            </div>

            {/* Contenido de la publicación */}
            <div className="p-4 bg-[#eaecf6] items-center justify-center rounded-lg shadow-md max-w-2xl mx-auto mt-4 mb-4 ">
                <h2 className="text-2xl font-bold mb-4 text-[#6D28D9]">¡Asegura tu hogar con Yale!</h2>
                <img
                    src={promocion}
                    alt="Candados Yale en promoción"
                    className=" rounded-lg mb-6 object-cover"
                />
                <p className="text-gray-700 mb-4 leading-relaxed">
                    Aprovecha nuestra promoción exclusiva: <span className="font-semibold">20% de descuento</span> en toda la línea de
                    <span className="font-semibold"> candados Yale</span>. Máxima seguridad, calidad garantizada y el mejor precio del mercado.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    No pierdas esta oportunidad de proteger lo que más importa. Promoción válida hasta agotar stock o hasta el <strong>31 de mayo</strong>.
                </p>
                <div className="mt-6 text-center">
                </div>
            </div>
        </div>
    );
};

export default Promocion1;
