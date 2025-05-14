import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import HeaderUsers from '../Dashboard/Header/HeaderUsers';
import JobsUsers from '../Dashboard/Home/Jobs/JobsUsers';
import PromotionUsers from '../Dashboard/Home/Promotion/PromotionUsers';
import BottomMenu from '../Dashboard/BottomMenu/BottomMenu';
import TrainingUsers from '../Dashboard/Home/Training/TrainingUsers';


const HomePageClient = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();

  const formSubmitted = userData?.formSubmitted || false;
  const status = userData?.status || 'pending';

  const renderFormStatusMessage = () => {
    if (formSubmitted && status === 'accepted') {
      return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg mb-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Cuenta verificada!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Tu cuenta ha sido aprobada. Ahora puedes acceder a todas las funciones de la aplicación.
          </p>
        </div>
      );
    }

    if (formSubmitted && status === 'pending') {
      return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg mb-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Verificación en proceso</h1>
          <p className="text-lg text-gray-600 mb-8">
            Tu cuenta está siendo verificada. Por favor, refresca la página más tarde
            para saber si ha sido aceptada.
          </p>
        </div>
      );
    }

    if (formSubmitted && status === 'rejected') {
      return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg mb-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Postulación rechazada</h1>
          <p className="text-lg text-gray-600 mb-8">
            No cumples con los requisitos para la postulación.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Página Principal</h1>
        <p className="text-lg text-gray-600 mb-8">¡Bienvenido a la aplicación!</p>
        <p className="text-lg text-gray-600 mb-8">Para verificar tu cuenta debes completar el siguiente formulario:</p>
        <button
          onClick={() => navigate("/form")}
          className="btn-promociones py-3 px-4 bg-[#714dbf] text-white font-medium rounded-lg hover:bg-[#5a3da3] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#5a3da3] focus:ring-opacity-50"
        >
          Completar formulario
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <HeaderUsers />

      {/* Mensaje de estado del formulario */}
      {renderFormStatusMessage()}

      {/* TrainingUsers y PromotionUsers se muestran siempre */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <TrainingUsers />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <PromotionUsers />
      </div>

      {/* JobsUsers solo se muestra si está aceptado */}
      {(formSubmitted && status === 'accepted') && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <JobsUsers />
        </div>
      )}

      <div className="mb-16"></div>
      <BottomMenu />
    </div>
  );
};

export default HomePageClient;