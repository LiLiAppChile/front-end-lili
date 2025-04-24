import { useNavigate } from 'react-router-dom';
import HeaderUsers from '../Dashboard/Header/HeaderUsers';
import JobsUsers from '../Dashboard/Home/Jobs/JobsUsers';
import PromotionUsers from '../Dashboard/Home/Promotion/PromotionUsers';
import BottomMenu from '../Dashboard/BottomMenu/BottomMenu';
import TrainingUsers from '../Dashboard/Home/Training/TrainingUsers';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white p-4"> {/* Fondo blanco para toda la página */}
      <HeaderUsers />

      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg mb-4"> {/* Fondo gris para este div */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Página Principal</h1>
        <p className="text-lg text-gray-600 mb-8">¡Bienvenido a la aplicación!</p>
        <p className="text-lg text-gray-600 mb-8">Para verificar tu cuenta debes completar el siguiente formulario:</p>
        <button onClick={() => navigate("/form")} className="btn-promociones py-3 px-4 bg-[#714dbf] text-white font-medium rounded-lg hover:bg-[#5a3da3] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#5a3da3] focus:ring-opacity-50">
          Completar formulario
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4"> {/* Fondo gris para este div */}
        <TrainingUsers />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4"> {/* Fondo gris para este div */}
        <PromotionUsers />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4"> {/* Fondo gris para este div */}
        <JobsUsers />
      </div>

      {/* Espacio adicional para evitar que el BottomMenu cubra el contenido */}
      <div className="mb-16"></div> {/* Ajusta el valor de mb-16 según la altura del BottomMenu */}

      <BottomMenu />
    </div >
  );
};

export default HomePage;