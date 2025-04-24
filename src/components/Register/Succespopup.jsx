import PropTypes from "prop-types";
import circleCheck from "../../assets/circleCheck.png";

const SuccessPopup = ({ onContinue, onLater }) => {
  return (
    <div className="fixed inset-0 bg-[#714dbf] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 text-center">
        <img src={circleCheck} alt="Logo" className="w-auto h-16 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-800 mb-4">¡Se ha creado tu cuenta con éxito!</h1>
        <p className="text-gray-600 mb-6">
          Para poder comenzar a trabajar con nosotros, <strong>debes completar la etapa de revisión contestando a un formulario.</strong>
        </p>
        <div className="flex flex-col sm:flex-col gap-3 items-center justify-center">
          <button
            onClick={onContinue}
            className="w-[255px] h-[48px] bg-[#714dbf] text-white py-2 px-4 rounded-lg hover:bg-[#5126ae] transition-colors"
          >
            Ir a formulario
          </button>
          <button
            onClick={onLater}
            className="text-[#714dbf] underline hover:text-[#5126ae] transition-colors bg-transparent p-0 border-none cursor-pointer"
          >
            Más tarde
          </button>
        </div>
      </div>
    </div>
  );
};

SuccessPopup.propTypes = {
  onContinue: PropTypes.func.isRequired,
  onLater: PropTypes.func.isRequired,
};

export default SuccessPopup;