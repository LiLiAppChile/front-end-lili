import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../Context/AuthContext';

const HeaderUsers = () => {
  const { userData } = useAuth();

  return (
    <div className="flex justify-between items-center border-b-2 mb-5 border-gray-200 pb-4">
      <h1 className="text-2xl font-bold">Hola, {userData?.name || 'Usuario'}</h1>

      <div className="relative">
        <BellIcon className="icon-notify cursor-pointer" />

        <span className="notify-number">
          7
        </span>
      </div>
    </div>
  );
};

export default HeaderUsers;