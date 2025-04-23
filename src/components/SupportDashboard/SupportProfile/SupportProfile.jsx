import { useEffect, useState } from 'react';
import BottomMenuAdmin from "../SupportBottomMenu/SupportBottomMenu";
import UserPlaceholder from "@/assets/user.jpeg";
import profileIcon from "@/assets/profile.png";
import editPen from "@/assets/editPen.png";
import LoadingSpinner from "../../LoadingSpinner";
import EditProfilePopup from './SupportEditProfilePopup';
import { useAuth } from '../../../Context/AuthContext';

const SupportProfile = () => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const { userData } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const [profile, setProfile] = useState({
        name: "Cargando...",
        email: "",
        profilePicture: "",
        personalDescription: ""
    });

    useEffect(() => {
        if (userData) {
            setProfile(prev => ({
                ...prev,
                ...userData
            }));
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [userData]);

    if (isLoading) {
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
            <section className='bg-white min-h-screen'>
                <div className="border-b-2 border-gray-200 mb-5 pb-4 py-5 px-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img
                                src={profileIcon}
                                alt="profileIcon"
                            />
                            <h1 className="text-2xl font-bold">Perfil</h1>
                        </div>
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
                                    <div className='flex flex-wrap gap-2 mt-2'>
                                        <p className='bg-white rounded-lg py-1 px-4 text-indigo-600 font-bold text-sm shadow'>Admin</p>
                                        <p className='bg-white rounded-lg py-1 px-4 text-indigo-600 font-bold text-sm shadow'>Soporte</p>
                                    </div>
                                </div>
                                <img
                                    src={editPen}
                                    alt="editProfile"
                                    className="w-6 h-6 cursor-pointer text-gray-600 hover:text-indigo-500 transition"
                                    onClick={() => setShowEditPopup(true)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#eaecf6] rounded-lg p-1">
                        <div className="space-y-1">
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

export default SupportProfile;
