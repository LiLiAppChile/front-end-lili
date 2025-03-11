import React from 'react';
import { HomeIcon, UserIcon, ClipboardDocumentIcon, BookOpenIcon, CalendarIcon } from '@heroicons/react/24/solid';

const BottomMenu = () => {
    return (
        <div className="bottom-menu ">
            <div className="flex justify-around items-center p-4">
                <button className="icons-menu">
                    <HomeIcon className="h-7 w-7" />
                </button>

                {/* Ícono de Notificaciones */}
                <button className="icons-menu">
                    <ClipboardDocumentIcon className="h-7 w-7" />
                </button>

                {/* Ícono de Configuración */}
                <button className="icons-menu">
                    <BookOpenIcon className="h-7 w-7" />
                </button>

                {/* Ícono de Configuración */}
                <button className="icons-menu">
                    <CalendarIcon className="h-7 w-7" />
                </button>

                {/* Ícono de Perfil */}
                <button className="icons-menu">
                    <UserIcon className="h-7 w-7" />
                </button>
            </div>
        </div>
    );
};

export default BottomMenu;