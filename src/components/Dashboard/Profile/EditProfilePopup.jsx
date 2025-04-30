import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../../Context/AuthContext';
import PropTypes from 'prop-types';
import { FiPaperclip } from 'react-icons/fi';
import { uploadToCloudinary } from '../../../components/Cloudinary/Services/upload.service'

const EditProfilePopup = ({ onCancel, initialData }) => {
    const { updateProfile } = useAuth();

    // Normalizamos los datos iniciales
    const normalizeProfilePicture = (profilePicture) => {
        if (!profilePicture) {
            return {
                file: null,
                url: null,
                name: '',
                uploading: false,
                uploaded: false,
                error: null
            };
        }

        if (typeof profilePicture === 'string') {
            return {
                file: null,
                url: profilePicture,
                name: '',
                uploading: false,
                uploaded: true,
                error: null
            };
        }

        return profilePicture;
    };

    const [formData, setFormData] = useState({
        phone: initialData.phone || '',
        email: initialData.email || '',
        commune: initialData.commune || '',
        profilePicture: normalizeProfilePicture(initialData.profilePicture)
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Creamos una URL temporal para mostrar la imagen seleccionada
        const previewUrl = URL.createObjectURL(file);

        setFormData(prev => ({
            ...prev,
            profilePicture: {
                file: file,
                url: previewUrl, // Mostramos preview inmediato
                name: file.name,
                uploading: true,
                uploaded: false,
                error: null
            }
        }));

        try {
            const result = await uploadToCloudinary(file);

            // Liberamos la URL temporal
            URL.revokeObjectURL(previewUrl);

            setFormData(prev => ({
                ...prev,
                profilePicture: {
                    file: null,
                    url: result.url, // URL permanente de Cloudinary
                    name: file.name,
                    uploading: false,
                    uploaded: true,
                    error: null
                }
            }));
        } catch (error) {
            // Liberamos la URL temporal en caso de error
            URL.revokeObjectURL(previewUrl);

            setFormData(prev => ({
                ...prev,
                profilePicture: {
                    ...prev.profilePicture,
                    url: null, // Eliminamos el preview
                    uploading: false,
                    uploaded: false,
                    error: 'Error al subir la imagen'
                }
            }));
        }
    };


    const validateForm = () => {
        const phoneRegex = /^\+\d{10,15}$/;

        if (!formData.phone.trim() || !formData.commune.trim()) {
            setError('Todos los campos son obligatorios');
            return false;
        }

        if (!phoneRegex.test(formData.phone)) {
            setError('El número de teléfono debe comenzar con "+56" y tener al menos 9 dígitos');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setError(null);

        try {
            const dataToSend = {
                phone: formData.phone,
                commune: formData.commune,
                ...(formData.profilePicture.url && { profilePicture: formData.profilePicture.url })
            };

            const result = await updateProfile(dataToSend);
            console.log("Datos enviados:", dataToSend);
            if (!result.success) {
                throw new Error(result.error || 'Error al actualizar perfil');
            }

            onCancel();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Encabezado */}
                <div className="flex items-center mb-4">
                    <PencilIcon className="h-5 w-5 text-gray-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-800">Editar información</h2>
                </div>
                <div className="border-b border-gray-200 mb-4"></div>

                {/* Foto de perfil */}
                <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 overflow-hidden">
                        {formData.profilePicture.url ? (
                            <img
                                src={formData.profilePicture.url}
                                alt="Foto de perfil"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = ''; // Manejo de error si la imagen no carga
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                [Foto]
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <label className="cursor-pointer text-[#714dbf] text-sm font-medium hover:text-[#5126ae] flex items-center">
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <FiPaperclip className="mr-1" />
                            Cambiar foto
                        </label>
                        {formData.profilePicture.uploading && (
                            <p className="text-xs text-yellow-600 absolute -bottom-5 left-0 right-0 text-center">Subiendo...</p>
                        )}
                        {formData.profilePicture.error && (
                            <p className="text-xs text-red-600 absolute -bottom-5 left-0 right-0 text-center">{formData.profilePicture.error}</p>
                        )}
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-4"></div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-3 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#714dbf] focus:border-[#714dbf]"
                                placeholder="Ingresa tu celular"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Comuna</label>
                            <input
                                type="text"
                                name="commune"
                                value={formData.commune}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#714dbf] focus:border-[#714dbf]"
                                placeholder="Ingresa tu comuna"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                            />

                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 text-red-500 text-sm">{error}</div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-2 px-4 bg-[#714dbf] text-white rounded-md hover:bg-[#5126ae] transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Guardando...' : 'Aceptar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

EditProfilePopup.propTypes = {
    onCancel: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        phone: PropTypes.string,
        email: PropTypes.string,
        commune: PropTypes.string,
        profilePicture: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string,
                uploading: PropTypes.bool,
                uploaded: PropTypes.bool,
                error: PropTypes.string
            })
        ]),
    }),
};

EditProfilePopup.defaultProps = {
    initialData: {
        phone: '',
        email: '',
        commune: '',
        profilePicture: '',
    },
};

export default EditProfilePopup;