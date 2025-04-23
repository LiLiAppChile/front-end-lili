import PropTypes from 'prop-types';
import circleCheck from "@/assets/circleCheck.png";

const StatusModal = ({ visible, type, title, message, buttonText, onClose }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-[#714dbf] bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 text-center">
                <img src={circleCheck} alt={type} className="w-auto h-16 mx-auto mb-4" />
                <h1 className="text-xl font-bold text-gray-800 mb-4">{title}</h1>
                <p className="text-gray-600 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-[255px] h-[48px] bg-[#714dbf] text-white py-2 px-4 rounded-lg hover:bg-[#5126ae] transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

StatusModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['approved', 'rejected']).isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default StatusModal;
