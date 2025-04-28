import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cog6ToothIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Navbar from "../ClientBottomMenu/BottomMenuClient";
import UserPlaceholder from "../../../assets/user.jpeg";
import LoadingSpinner from "../../LoadingSpinner";
import EditProfilePopup from '../../Dashboard/Profile/EditProfilePopup';
import { useAuth } from '../../../Context/AuthContext';

const ClientProfile = () => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const { userData } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    const [profile, setProfile] = useState({
        name: "Cargando...",
        email: "",
        phone: "",
        specialties: [],
        profilePicture: "",
        rut: "",
        commune: "",
        personalDescription: ""
    });


    useEffect(() => {
        if (userData) {
            setProfile(prev => ({
                ...prev,
                ...userData,
            }));
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [userData]);


    if (isLoading) {
        return (
            <>
                <Navbar />
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
            <Navbar />
            <section className='bg-white min-h-screen'>
                <div className="border-b-2 border-gray-200 mb-5 pb-4 py-5 px-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img
                                src="/src/assets/profile.png"
                                alt="profileIcon"
                            />
                            <h1 className="text-2xl font-bold">Perfil</h1>
                        </div>
                        <button
                            className="icons-menu"
                            onClick={() => navigate('/settings')}
                        >
                            <Cog6ToothIcon className="w-6 h-6 cursor-pointer text-gray-600 hover:text-indigo-500 transition" />
                        </button>
                    </div>
                </div>

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
                            <div className="flex justify-between items-start p-1">
                                <div className="flex-1">
                                    <h2 className="text-lg font-medium text-left">
                                        {profile.name || "Nombre no disponible"}
                                    </h2>

                                </div>
                                <img
                                    src="/src/assets/editPen.png"
                                    alt="editProfile"
                                    className="w-6 h-6 cursor-pointer text-gray-600 hover:text-indigo-500 transition"
                                    onClick={() => setShowEditPopup(true)}
                                />
                            </div>
                        </div>
                    </div>

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

                    <div className="bg-[#eaecf6] rounded-lg p-1">
                        <div className="space-y-1">
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-24">Comuna:</span>
                                <span className="text-gray-600">{profile.commune || "No proporcionado"}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-24">Número:</span>
                                <span className="text-gray-600">{profile.phone || "No proporcionado"}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-24">Correo:</span>
                                <span className="text-gray-600">{profile.email || "No proporcionado"}</span>
                            </div>
                        </div>
                        {profile.personalDescription && (
                            <div className="mt-4">
                                <p className="text-gray-600">{profile.personalDescription}</p>
                            </div>
                        )}
                    </div>
                </div>


                {showEditPopup && (
                    <EditProfilePopup
                        onCancel={() => setShowEditPopup(false)}
                        initialData={{
                            phone: userData?.phone || '',
                            email: userData?.email || '',
                            district: userData?.district || '',
                            profileImage: userData?.profileImage || '',
                        }}
                    />
                )}
            </section>
        </>
    );
};

export default ClientProfile;
