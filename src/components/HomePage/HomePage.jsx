import HeaderUsers from '../Dashboard/Header/HeaderUsers';
import JobsUsers from '../Dashboard/Home/Jobs/JobsUsers';
import PromotionUsers from '../Dashboard/Home/Promotion/PromotionUsers';
import BottomMenu from '../Dashboard/BottomMenu/BottomMenu';

const HomePage = () => {
  return (
    <div className="p-4">
      <HeaderUsers />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Página Principal</h1>
      <p className="text-lg text-gray-600 mb-8">¡Bienvenido a la aplicación!</p>
      <button className="btn-promociones bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
        Completar formulario
      </button>
      </div>

      <PromotionUsers />
      <JobsUsers />
      <BottomMenu />
    </div>
  );
};

export default HomePage;