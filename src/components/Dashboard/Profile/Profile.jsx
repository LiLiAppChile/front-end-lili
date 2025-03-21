import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import User from "../../../assets/user.jpeg"
import Navbar from "../BottomMenu/BottomMenu"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {
    const navigate = useNavigate();

    return (
        <>
        <Navbar />
        <section className='bg-white'>
        <div className="flex justify-between items-center border-b-2 mb-5 border-gray-200 pb-4 py-5 px-5">
            <h1 className="text-2xl font-bold">Perfil</h1>
            <button className="icons-menu" onClick={() => navigate('/settings')}>
                <Cog6ToothIcon className="icon-notify cursor-pointer" />
            </button>
        </div>

        <div className="flex flex-col items-center gap-6 bg-gray-100 rounded-lg py-5 px-5 mr-5 ml-5 shadow-md">
        <div className="rounded-full overflow-hidden">
            <img src={User} alt="Foto de perfil" className='profile-photo'/>
        </div>
            <div className="flex flex-col gap-2 w-full">
                <div className='flex justify-evenly items-center'>
                <h2 className="text-xl font-bold">Nombre Profesional</h2>
                <PencilSquareIcon className="w-8 h-8 cursor-pointer hover:text-indigo-500 transition"/>
                </div>
                <div className='flex justify-center'>
                    <p className="text-gray-600 font-bold mr-0.5">5.0</p>
                    <StarIcon className="text-amber-300 w-6 h-6" />
                    <p className="ml-2 text-gray-600 font-bold">164 reseñas</p>
                </div>
                <div className='flex justify-around'>
                        <p className='border-2 rounded-full py-1 px-4 border-indigo-600 text-indigo-600 hover:bg-indigo-300 hover:border-indigo-300 transition hover:text-indigo-50 font-bold cursor-pointer'>Especialidad</p>
                        <p className='border-2 rounded-full py-1 px-4 border-orange-600 text-orange-600 hover:bg-orange-300 hover:border-orange-300 transition hover:text-orange-50 font-bold cursor-pointer'>Especialidad</p>
                </div>

            </div>
        </div>
        <div className='flex flex-col mt-6 mb-10'>
                <div className='flex justify-between w-full px-5'>
                    <h1 className="text-2xl font-bold">Reseñas</h1>
                    <p className='pt-1 font-semibold text-indigo-500'>Ver más</p>
                </div>

            <div className='flex flex-col items-center gap-6 bg-gray-100 rounded-lg py-5 px-5 mr-5 ml-5 mt-6 shadow-md'>
                <div className='flex flex-col border-b-2 pb-8 border-gray-200'>
                    <div className='flex'>
                    <img src={User} alt="reviwer-photo" 
                    className='rounded-full w-12 h-12'/>
                    <div className='pl-5'>
                    <p>Nombre</p>
                    <span>⭐⭐</span>
                    </div>
                    </div>
                    <span className='mt-5'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur assumenda aut totam. Ullam corpobus nulla?</span>
                </div>

                <div className='flex flex-col border-b-2 pb-8 border-gray-200'>
                    <div className='flex'>
                    <img src={User} alt="reviwer-photo" 
                    className='rounded-full w-12 h-12'/>
                    <div className='pl-5'>
                    <p>Nombre</p>
                    <span>⭐⭐⭐⭐</span>
                    </div>
                    </div>
                    <span className='mt-5'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur assumenda aut totam. Ullam corpobus nulla?</span>
                </div>

                <div className='flex flex-col border-b-2 pb-8 border-gray-200'>
                    <div className='flex'>
                    <img src={User} alt="reviwer-photo" 
                    className='rounded-full w-12 h-12'/>
                    <div className='pl-5'>
                    <p>Nombre</p>
                    <span>⭐⭐⭐</span>
                    </div>
                    </div>
                    <span className='mt-5'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur assumenda aut totam. Ullam corpobus nulla?</span>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}

export default Profile;