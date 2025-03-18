import { HomeIcon, UserIcon, ClipboardDocumentIcon, BookOpenIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const BottomMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-menu ">
      <div className="flex justify-around items-center p-4">
        <button className="icons-menu" onClick={() => navigate('/home')}>
          <HomeIcon className="h-7 w-7" />
        </button>

        <button className="icons-menu">
          <ClipboardDocumentIcon className="h-7 w-7" />
        </button>

        <button className="icons-menu">
          <BookOpenIcon className="h-7 w-7" />
        </button>

        <button className="icons-menu">
          <CalendarIcon className="h-7 w-7" />
        </button>

        <button className="icons-menu" onClick={() => navigate('/profile')}>
          <UserIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default BottomMenu;