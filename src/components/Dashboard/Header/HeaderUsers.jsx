import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../Context/AuthContext';

const HeaderUsers = () => {
  const { userData } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="flex justify-between items-center border-b-2 mb-5 border-gray-200 pb-4">
      <h1 className="text-2xl font-bold">Hola, {userData?.name || 'Usuario'}</h1>

      <div className="relative">
        <button onClick={toggleNotifications} className="focus:outline-none">
          <BellIcon className="h-8 w-8 text-gray-700 cursor-pointer" />
          <span className="notify-number absolute -top-1 -right-1 bg-[#714dbf] text-white text-xs font-semibold px-1 rounded-full">
            1
          </span>
        </button>

        {isNotificationsOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 pb-2 border-b border-gray-200">
                Notificaciones
              </h2>
              <ul>
                <li className="py-2 border-b border-gray-200"><strong>¡Bienvenido a LiLi! </strong>Completa el formulario. Serás notificado cuando tu cuenta sea arpobada.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderUsers;