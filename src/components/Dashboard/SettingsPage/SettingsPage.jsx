import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      {/* Header  */}
      <div className='p-4 border-b border-gray-200 flex items-center'>
        <button onClick={() => navigate(-1)} className='text-[#6D28D9] mr-3'>
          <IoChevronBack size={24} />
        </button>
        <h1 className='font-bold text-lg'>Configuración</h1>
      </div>

      {/* Contenedor principal */}
      <div className='flex-1 py-4 px-5 flex flex-col'>
        <div className='bg-[#F3F4F6] rounded-lg overflow-hidden mb-4'>
          <button
            onClick={() => handleNavigation('/guarantees')}
            className='w-full text-left py-3 px-4 border-b border-gray-200 hover:bg-gray-200 transition-colors'
          >
            <span className='font-medium text-[#6D28D9]'>
              Garantías y coberturas
            </span>
          </button>

          <button
            onClick={() => handleNavigation('/contact-support')}
            className='w-full text-left py-3 px-4 border-b border-gray-200 hover:bg-gray-200 transition-colors'
          >
            <span className='font-medium text-[#6D28D9]'>
              Resolución de problemas
            </span>
          </button>

          <button
            onClick={() => handleNavigation('/terms')}
            className='w-full text-left py-3 px-4 border-b border-gray-200 hover:bg-gray-200 transition-colors'
          >
            <span className='font-medium text-[#6D28D9]'>
              Términos y condiciones
            </span>
          </button>

          <button
            onClick={() => handleNavigation('/refund-policy')}
            className='w-full text-left py-3 px-4 border-b border-gray-200 hover:bg-gray-200 transition-colors'
          >
            <span className='font-medium text-[#6D28D9]'>
              Políticas de reembolso
            </span>
          </button>

          <button
            onClick={() => handleNavigation('/privacy-policy')}
            className='w-full text-left py-3 px-4 hover:bg-gray-200 transition-colors'
          >
            <span className='font-medium text-[#6D28D9]'>
              Políticas de privacidad
            </span>
          </button>
        </div>

        {/* Contáctanos */}
        <div className='bg-[#F3F4F6] rounded-lg overflow-hidden mb-4'>
          <button
            onClick={() => handleNavigation('/contact')}
            className='w-full flex justify-between items-center py-3 px-4 hover:bg-gray-200 transition-colors'
          >
            <span className='font-medium'>Contáctanos</span>
            <IoChevronForward size={20} className='text-gray-500' />
          </button>
        </div>

        {/* Botón de cerrar sesión */}
        <div className='mb-4'>
          {' '}
          <button
            onClick={logout}
            className='w-full border border-[#C2410C] text-[#C2410C] py-3 px-4 rounded-md font-medium text-center hover:bg-orange-50 transition-colors'
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
