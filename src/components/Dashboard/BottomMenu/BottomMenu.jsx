import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  ClipboardDocumentIcon as ClipboardDocumentIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  CalendarIcon as CalendarIconSolid,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserIconOutline,
  ClipboardDocumentIcon as ClipboardDocumentIconOutline,
  BookOpenIcon as BookOpenIconOutline,
  CalendarIcon as CalendarIconOutline,
} from '@heroicons/react/24/outline';

const BottomMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(location.pathname);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveIcon(path);
  };

  return (
    <div className="bottom-menu bg-[#714dbf] h-13 w-full fixed bottom-0 z-50">
      <div className="flex justify-around items-center p-3">
        <button
          className="icons-menu flex flex-col items-center"
          onClick={() => handleNavigation('/home')}
        >
          {activeIcon === '/home' ? (
            <HomeIconSolid className="h-7 w-7 text-white" />
          ) : (
            <HomeIconOutline className="h-7 w-7 text-white" />
          )}
          {activeIcon === '/home' && <div className="h-0.5 w-7 bg-white mt-0.5"></div>}
        </button>

        <button
          className="icons-menu flex flex-col items-center"
          onClick={() => handleNavigation('/requests')}
        >
          {activeIcon === '/requests' ? (
            <ClipboardDocumentIconSolid className="h-7 w-7 text-white" />
          ) : (
            <ClipboardDocumentIconOutline className="h-7 w-7 text-white" />
          )}
          {activeIcon === '/requests' && <div className="h-0.5 w-7 bg-white mt-0.5"></div>}
        </button>

        <button
          className="icons-menu flex flex-col items-center"
          onClick={() => handleNavigation('/history')}
        >
          {activeIcon === '/history' ? (
            <BookOpenIconSolid className="h-7 w-7 text-white" />
          ) : (
            <BookOpenIconOutline className="h-7 w-7 text-white" />
          )}
          {activeIcon === '/history' && <div className="h-0.5 w-7 bg-white mt-0.5"></div>}
        </button>

        <button
          className="icons-menu flex flex-col items-center"
          onClick={() => handleNavigation('/calendar')}
        >
          {activeIcon === '/calendar' ? (
            <CalendarIconSolid className="h-7 w-7 text-white" />
          ) : (
            <CalendarIconOutline className="h-7 w-7 text-white" />
          )}
          {activeIcon === '/calendar' && <div className="h-0.5 w-7 bg-white mt-0.5"></div>}
        </button>

        <button
          className="icons-menu flex flex-col items-center"
          onClick={() => handleNavigation('/profile')}
        >
          {activeIcon === '/profile' ? (
            <UserIconSolid className="h-7 w-7 text-white" />
          ) : (
            <UserIconOutline className="h-7 w-7 text-white" />
          )}
          {activeIcon === '/profile' && <div className="h-0.5 w-7 bg-white mt-0.5"></div>}
        </button>
      </div>
    </div>
  );
};

export default BottomMenu;