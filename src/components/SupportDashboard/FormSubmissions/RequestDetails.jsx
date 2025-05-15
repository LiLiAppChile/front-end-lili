import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import StatusModal from './StatusModal'

export default function ProfessionalDetail() {
    const router = useNavigate();
    const { uid } = useParams();
    const { fetchUserDetails, updateUserStatus } = useAuth();
    const [professional, setProfessional] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const navigate = useNavigate();

    const handleBack = () => {
        router(-1);
    };

    useEffect(() => {
        const loadUserData = async () => {
            try {
                setLoading(true);
                const userData = await fetchUserDetails(uid);
                setProfessional({
                    name: userData.name || 'Sin nombre',
                    rut: userData.rut || 'Sin RUT',
                    phone: userData.phone || 'Sin teléfono',
                    email: userData.email || 'Sin correo',
                    region: userData.region || 'Sin región',
                    commune: userData.commune || 'Sin comuna',
                    specialties: userData.specialties || [],
                    registeredInSII: userData.siiRegistered || false,
                    activityStarted: userData.siiActivitiesStarted || false,
                    ownTransportation: userData.ownTransportation || false,
                    hasTools: userData.hasTools || false,
                    documents: {
                        identityCardFront: userData.identityCardFront,
                        identityCardBack: userData.identityCardBack,
                        backgroundCertificate: userData.backgroundCertificate,
                        additionalCertificate: userData.additionalCertificate
                    },
                    bankInfo: {
                        bankName: userData.bankName || 'Sin banco',
                        accountType: userData.accountType || 'Sin tipo de cuenta',
                        accountNumber: userData.accountNumber || 'Sin número'
                    },
                    estado: userData.validUser ? 'aprobado' : 'rechazado'
                });
            } catch (err) {
                console.error("Error al cargar datos del usuario:", err);
                setError("Error al cargar los datos del profesional");
            } finally {
                setLoading(false);
            }
        };

        if (uid) {
            loadUserData();
        }
    }, [uid, fetchUserDetails]);

    const ReadOnlyYesNoCheckbox = ({ value }) => (
        <div className="flex space-x-4">
            <div className={`w-5 h-5 border-2 rounded ${value ? 'bg-[#714DBF] border-[#714DBF]' : 'border-gray-400'} flex items-center justify-center`}>
                {value && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className="text-sm">Sí</span>

            <div className={`w-5 h-5 border-2 rounded ${!value ? 'bg-[#714DBF] border-[#714DBF]' : 'border-gray-400'} flex items-center justify-center`}>
                {!value && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className="text-sm">No</span>
        </div>
    );

    const handleStatusChange = async (status) => {
        if (!uid) return;

        try {
            await updateUserStatus(uid, status);
            setProfessional((prev) => ({
                ...prev,
                estado: status === 'accepted' ? 'aprobado' : 'rechazado'
            }));

            if (status === 'accepted') {
                setModalData({
                    type: 'approved',
                    title: '¡Tu cuenta ha sido aprobada!',
                    message: 'El usuario podrá acceder a todas las funcionalidades disponibles en la plataforma.',
                    buttonText: 'Volver a solicitudes'
                });
            } else {
                setModalData({
                    type: 'rejected',
                    title: 'Cuenta rechazada correctamente',
                    message: 'El usuario ha sido notificado del rechazo de su cuenta. No podrá acceder a las funcionalidades de la plataforma.',
                    buttonText: 'Volver a solicitudes'
                });
            }

            setShowModal(true);
        } catch (err) {
            console.error("Error al actualizar el estado:", err);
            alert("Hubo un error, intenta nuevamente.");
        }
    };


    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <div className="p-4 border-b-1 border-[#DDE1E6] flex items-center">
                    <button className="mr-2" onClick={handleBack}>
                        <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6 text-[#714DBF]" />
                    </button>
                    <h1 className="text-lg font-bold">Cargando...</h1>
                </div>
                <div className="p-4 text-center">Cargando datos del profesional...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <div className="p-4 border-b-1 border-[#DDE1E6] flex items-center">
                    <button className="mr-2" onClick={handleBack}>
                        <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6 text-[#714DBF]" />
                    </button>
                    <h1 className="text-lg font-bold">Error</h1>
                </div>
                <div className="p-4 text-center text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col min-h-screen bg-white">
                <div className="flex-1 max-w w-full mx-auto bg-white pb-16">
                    {/* Encabezado */}
                    <div className="p-4 border-b-1 border-[#DDE1E6] flex items-center">
                        <button className="mr-2 cursor-pointer" onClick={handleBack}>
                            <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6 text-[#714DBF]" />
                        </button>
                        <h1 className="text-lg font-bold">{professional.name}</h1>
                    </div>

                    {/* Información personal */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-3">Información personal</h2>
                        <div className="bg-[#EAECF6] rounded-lg p-4 mb-4">
                            <div className="space-y-2">
                                <p><span className="font-medium">Profesional:</span> {professional.name}</p>
                                <p><span className="font-medium">RUT:</span> {professional.rut}</p>
                                <p><span className="font-medium">Celular:</span> {professional.phone}</p>
                                <p><span className="font-medium">Correo:</span> {professional.email}</p>
                                <p><span className="font-medium">Región:</span> {professional.region}</p>
                                <p><span className="font-medium">Comuna:</span> {professional.commune}</p>
                            </div>
                        </div>

                        {/* Especialidad */}
                        <h2 className="text-xl font-bold mb-3">Especialidad</h2>
                        <div className="bg-[#EAECF6] rounded-lg p-4 mb-4">
                            <div className="flex flex-wrap gap-2">
                                {professional.specialties.map((specialty, index) => (
                                    <span key={index} className="bg-white px-3 py-1 rounded-full text-sm">
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Información adicional */}
                        <h2 className="text-xl font-bold mb-3">Información adicional</h2>
                        <div className="bg-[#EAECF6] rounded-lg p-4 mb-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">¿Registrado en el SII?</span>
                                <ReadOnlyYesNoCheckbox value={professional.registeredInSII} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">¿Inicio de actividades?</span>
                                <ReadOnlyYesNoCheckbox value={professional.activityStarted} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">¿Cuenta con transporte?</span>
                                <ReadOnlyYesNoCheckbox value={professional.ownTransportation} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">¿Posee herramientas?</span>
                                <ReadOnlyYesNoCheckbox value={professional.hasTools} />
                            </div>
                        </div>

                        {/* Documentos */}
                        <h2 className="text-xl font-bold mb-3">Documentos y certificados</h2>
                        <div className="bg-[#EAECF6] rounded-lg p-4 mb-4">
                            <div className="space-y-4">
                                {[
                                    { label: "Cédula de identidad frente", key: "identityCardFront" },
                                    { label: "Cédula de identidad reverso", key: "identityCardBack" },
                                    { label: "Certificado de Antecedentes", key: "backgroundCertificate" },
                                    { label: "Certificación adicional", key: "additionalCertificate" },
                                ].map(({ label, key }) => (
                                    <div key={key}>
                                        <p className="font-medium mb-1">{label}</p>
                                        {professional.documents[key]?.url ? (
                                            <a
                                                href={professional.documents[key].url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#714DBF] underline text-sm block"
                                            >
                                                Ver documento
                                            </a>
                                        ) : (
                                            <span className="text-red-500 text-sm">No subido</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Información bancaria */}
                        <h2 className="text-xl font-bold mb-3">Información bancaria</h2>
                        <div className="bg-[#EAECF6] rounded-lg p-4 mb-6">
                            <div className="space-y-2">
                                <p><span className="font-medium">Banco:</span> {professional.bankInfo.bankName}</p>
                                <p><span className="font-medium">Tipo de cuenta:</span> {professional.bankInfo.accountType}</p>
                                <p><span className="font-medium">Número de cuenta:</span> {professional.bankInfo.accountNumber}</p>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-between px-4">
                            <button
                                className="bg-white border border-[#CD4514] text-[#CD4514] py-2 px-9 rounded-lg font-medium"
                                onClick={() => handleStatusChange('rejected')}
                            >
                                Rechazar
                            </button>
                            <button
                                className="bg-[#714DBF] border border-[#714DBF] text-white py-2 px-9 rounded-lg font-medium"
                                onClick={() => handleStatusChange('accepted')}
                            >
                                Aprobar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <StatusModal
                visible={showModal}
                type={modalData?.type || 'approved'}
                title={modalData?.title || ''}
                message={modalData?.message || ''}
                buttonText={modalData?.buttonText || 'Cerrar'}
                onClose={() => navigate('/admin/postulaciones')}
            />
        </>
    );
}