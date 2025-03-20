import { HomeIcon, UserIcon, ClipboardDocumentIcon, BookOpenIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const BottomMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-menu ">
      <div className="flex justify-around items-center p-4">
        <button className="icons-menu" onClick={() => navigate('/home')}>
          <FontAwesomeIcon icon={faHouse} className="h-7 w-7" />
        </button>

        <button className="icons-menu">
          <ClipboardDocumentIcon className="h-7 w-7" onClick={() => navigate('/requests')}/>
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