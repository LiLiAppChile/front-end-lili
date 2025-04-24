import HeaderUsers from '../../Dashboard/Header/HeaderUsers';
import PromotionUsers from '../../Dashboard/Home/Promotion/PromotionUsers';
import BottomMenuAdmin from '../SupportBottomMenu/SupportBottomMenu';
import FormSubmissions from '../FormSubmissions/FormSubmissions';
import QuotesList from '../FormSubmissions/FormSubmissions';
import TrainingUsers from '../../Dashboard/Home/Training/TrainingUsers';

const HomePageSupport = () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <HeaderUsers />

      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Bienvenido al panel de soporte!</h1>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Últimas Postulaciones</h2>
        <FormSubmissions limit={5} />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Últimos Presupuestos</h2>
        <QuotesList limit={5} />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <TrainingUsers />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <PromotionUsers />
      </div>

      <div className="mb-16"></div>

      <BottomMenuAdmin />
    </div >
  );
};

export default HomePageSupport;