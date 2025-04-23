import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import BottomMenuAdmin from "../SupportBottomMenu/SupportBottomMenu";
import UserPlaceholder from "../../../assets/user.jpeg";
import LoadingSpinner from "../../LoadingSpinner";
import { useAuth } from '../../../Context/AuthContext';

const UserProfileAdminView = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUsersReviews } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [visibleReviewsCount, setVisibleReviewsCount] = useState(5);

    const loadProfileData = useCallback(async () => {
        setIsLoading(true);
        setReviewsLoading(true);

        try {
            const [profileData, reviewsData] = await Promise.all([
                fetchUserDetails(uid),
                fetchUsersReviews(uid)
            ]);

            setProfile({
                ...profileData,
                profilePicture: profileData.profilePicture || UserPlaceholder
            });
            setReviews(reviewsData || []);
        } catch (error) {
            console.error("Error loading profile:", error);
            navigate('/admin/users-record', {
                replace: true,
                state: { error: "No se pudo cargar el perfil del usuario" }
            });
        } finally {
            setIsLoading(false);
            setReviewsLoading(false);
        }
    }, [uid, fetchUserDetails, fetchUsersReviews, navigate]);

    useEffect(() => {
        if (uid) {
            loadProfileData();
        }
    }, [uid, loadProfileData]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-CL', options);
    };

    const handleSeeMore = () => {
        setVisibleReviewsCount(prev => prev + 5);
    };

    const calculateAverageRating = () => {
        if (!reviews.length) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    const handleViewForm = () => {
        navigate(`/admin/postulaciones/detalles/${uid}`);
    };

    const displayedReviews = reviews.slice(0, visibleReviewsCount);
    const hasMoreReviews = visibleReviewsCount < reviews.length;

    if (isLoading || !profile) {
        return (
            <>
                <BottomMenuAdmin />
                <section className='bg-white min-h-screen'>
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                        <p className="ml-3 text-gray-600">Cargando perfil...</p>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <BottomMenuAdmin />
            <section className='bg-white min-h-screen pb-20'>
                {/* Encabezado */}
                <div className="border-b-2 border-gray-200 mb-5 pb-4 py-5 px-5">
                    <div className="flex items-center gap-3">
                        <button className="mr-2 cursor-pointer" onClick={() => navigate(-1)}>
                            <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6 text-[#714DBF]" />
                        </button>
                        <h1 className="text-2xl font-bold">Perfil del Profesional</h1>
                    </div>
                </div>

                {/* Tarjeta de perfil */}
                <div className="bg-[#eaecf6] rounded-lg mx-5 p-4 shadow-md">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="rounded-full overflow-hidden w-20 h-20">
                            <img
                                src={profile.profilePicture || UserPlaceholder}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <div className="p-1">
                                <h2 className="text-lg font-medium text-left">
                                    {profile.name || 'Nombre no disponible'}
                                </h2>
                                {reviews.length > 0 && (
                                    <div className='flex items-center justify-left mt-2'>
                                        <p className="text-gray-800 font-bold mr-1">{calculateAverageRating()}</p>
                                        <StarIconSolid className="w-5 h-5 text-[#ffb900]" />
                                        <span className="mx-1 text-gray-500">•</span>
                                        <p className="text-gray-600 text-sm">{reviews.length} reseñas</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Botón Ver Formulario */}
                    <div className="mb-4">
                        <button
                            onClick={handleViewForm}
                            className="flex items-center justify-center gap-2 w-full bg-white text-[#714DBF] border border-[#714DBF] py-2 px-4 rounded-lg font-medium hover:bg-[#714DBF] hover:text-white transition-colors"
                        >
                            <FontAwesomeIcon icon={faFileAlt} />
                            Ver Formulario de Postulación
                        </button>
                    </div>

                    {/* Especialidades */}
                    <div className='flex flex-wrap gap-2 mb-3'>
                        {profile.specialties?.length > 0 ? (
                            profile.specialties.map((specialty, index) => (
                                <p
                                    key={index}
                                    className='bg-white rounded-lg py-1 px-4 text-indigo-600 hover:bg-indigo-100 transition font-bold cursor-pointer text-sm shadow'
                                >
                                    {specialty}
                                </p>
                            ))
                        ) : (
                            <p className="text-gray-500 italic text-sm">Sin especialidades registradas</p>
                        )}
                    </div>

                    <div className="border-t border-gray-300 my-3"></div>

                    {/* Información personal */}
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <span className="font-semibold text-gray-700 w-24">RUT:</span>
                            <span className="text-gray-600">{profile.rut || 'No disponible'}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold text-gray-700 w-24">Comuna:</span>
                            <span className="text-gray-600">{profile.commune || 'No disponible'}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold text-gray-700 w-24">Teléfono:</span>
                            <span className="text-gray-600">{profile.phone || 'No disponible'}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold text-gray-700 w-24">Correo:</span>
                            <span className="text-gray-600">{profile.email || 'No disponible'}</span>
                        </div>
                    </div>

                    {/* Descripción personal */}
                    {profile.personalDescription && (
                        <div className="mt-4">
                            <p className="text-gray-600">{profile.personalDescription}</p>
                        </div>
                    )}
                </div>

                {/* Sección de reseñas */}
                <div className='mt-6 mb-20 px-5'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className="text-xl font-bold">Reseñas</h1>
                        {reviews.length > 0 && hasMoreReviews && (
                            <button
                                className="text-[#714dbf] font-semibold underline"
                                onClick={handleSeeMore}
                            >
                                Ver más
                            </button>
                        )}
                    </div>

                    {reviewsLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <LoadingSpinner />
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className='bg-[#eaecf6] rounded-lg p-4 text-center'>
                            <p className="text-gray-500 italic">No hay reseñas aún</p>
                        </div>
                    ) : (
                        <div className='bg-[#eaecf6] rounded-lg p-4'>
                            {displayedReviews.map((review) => (
                                <div key={review.id} className='border-b border-gray-300 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0'>
                                    <div className='flex justify-between items-start'>
                                        <div className='flex items-center space-x-3'>
                                            <img
                                                src={UserPlaceholder}
                                                alt="reviewer"
                                                className='rounded-full w-12 h-12'
                                            />
                                            <div>
                                                <p className='font-[500]'>{review.reviewer || 'Cliente anónimo'}</p>
                                                <div className='flex items-center space-x-1'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIconSolid
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className='text-gray-500 text-sm'>
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <p className='mt-3 text-gray-600 text-sm'>
                                        {review.comment || 'Sin comentario'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default UserProfileAdminView;