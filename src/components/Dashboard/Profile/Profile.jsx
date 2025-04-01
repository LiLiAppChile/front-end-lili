import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cog6ToothIcon, StarIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Navbar from "../BottomMenu/BottomMenu";
import UserPlaceholder from "../../../assets/user.jpeg";
import LoadingSpinner from "../../../components/Dashboard/Profile/LoadingSpinner";
import { useAuth } from '../../../Context/AuthContext';

const Profile = () => {
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
        console.log("Datos recibidos en Profile:", userData);
        
        if (userData) {
            setProfile({
                ...profile,
                ...userData,
                specialties: userData.specialties || []
            });
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
            <section className='bg-white'>
                {/* Header */}
                <div className="flex justify-between items-center border-b-2 mb-5 border-gray-200 pb-4 py-5 px-5">
                    <h1 className="text-2xl font-bold">Perfil</h1>
                    <button className="icons-menu" onClick={() => navigate('/settings')}>
                        <Cog6ToothIcon className="icon-notify cursor-pointer" />
                    </button>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center gap-6 bg-gray-100 rounded-lg py-5 px-5 mx-5 shadow-md">
                    <div className="rounded-full overflow-hidden w-24 h-24">
                        <img 
                            src={profile.profilePicture || UserPlaceholder} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full">
                        <div className='flex justify-evenly items-center'>
                            <h2 className="text-xl font-bold">
                                {profile.name || "Nombre no disponible"}
                            </h2>
                            <PencilSquareIcon 
                                className="w-8 h-8 cursor-pointer hover:text-indigo-500 transition" 
                                onClick={() => navigate('/edit-profile')}
                            />
                        </div>
                        
                        <div className='flex justify-center items-center'>
                            <p className="text-gray-600 font-bold mr-0.5">5.0</p>
                            <StarIcon className="text-amber-300 w-6 h-6" />
                            <p className="ml-2 text-gray-600 font-bold">164 reseñas</p>
                        </div>
                        
                        {/* Especialidades */}
                        <div className='flex flex-wrap gap-2 justify-center'>
                            {profile.specialties && profile.specialties.length > 0 ? (
                                profile.specialties.map((specialty, index) => (
                                    <p 
                                        key={index} 
                                        className='border-2 rounded-full py-1 px-4 border-indigo-600 text-indigo-600 hover:bg-indigo-300 hover:border-indigo-300 transition hover:text-indigo-50 font-bold cursor-pointer'
                                    >
                                        {specialty}
                                    </p>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Sin especialidades registradas</p>
                            )}
                        </div>
                        
                        {/* Información de contacto */}
                        <div className="mt-4 w-full">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-2">Información de contacto</h3>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Email:</span> {profile.email || "No proporcionado"}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Teléfono:</span> {profile.phone || "No proporcionado"}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">RUT:</span> {profile.rut || "No proporcionado"}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Comuna:</span> {profile.commune || "No proporcionado"}
                                </p>
                            </div>
                            
                            {/* Descripción personal */}
                            {profile.personalDescription && (
                                <div className="bg-white p-4 rounded-lg shadow mt-4">
                                    <h3 className="font-bold text-lg mb-2">Sobre mí</h3>
                                    <p className="text-gray-600">{profile.personalDescription}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className='flex flex-col mt-6 mb-10'>
                    <div className='flex justify-between w-full px-5'>
                        <h1 className="text-2xl font-bold">Reseñas</h1>
                        <p className='pt-1 font-semibold text-indigo-500 cursor-pointer'>Ver más</p>
                    </div>

                    <div className='flex flex-col items-center gap-6 bg-gray-100 rounded-lg py-5 px-5 mx-5 mt-6 shadow-md'>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className='flex flex-col border-b-2 pb-8 border-gray-200 w-full'>
                                <div className='flex'>
                                    <img src={UserPlaceholder} alt="reviewer-photo" className='rounded-full w-12 h-12' />
                                    <div className='pl-5'>
                                        <p>Nombre</p>
                                        <span>⭐⭐⭐</span>
                                    </div>
                                </div>
                                <span className='mt-5'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur assumenda aut totam. Ullam corporis nulla?</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;