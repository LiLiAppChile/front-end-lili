import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  ClipboardDocumentIcon as ClipboardDocumentIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  CalendarIcon as CalendarIconSolid,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserIconOutline,
  ClipboardDocumentIcon as ClipboardDocumentIconOutline,
  BookOpenIcon as BookOpenIconOutline,
  CalendarIcon as CalendarIconOutline,
} from "@heroicons/react/24/outline";

const BottomMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(location.pathname);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveIcon(path);
  };

  return (
    <div className="bottom-menu bg-[#714dbf] w-full fixed bottom-0 z-50 rounded-t-xl">
      <div className="flex justify-around items-center py-2">
        <button
          className="icons-menu flex flex-col items-center w-full h-10"
          onClick={() => handleNavigation("/home")}
        >
          <div className="h-5 w-5 flex items-center justify-center">
            {activeIcon === "/home" ? (
              <img
                src="./src/assets/LiLiIconSolid.png"
                alt="HomeIconWhite"
                className="h-5 w-5 object-contain"
              />
            ) : (
              <img
                src="./src/assets/LiLiIconHomeWhite.png"
                alt="HomeIconWhiteSolid"
                className="h-5 w-5 object-contain"
              />
            )}
          </div>
          {activeIcon === "/home" && (
            <div className="h-0.5 w-6 bg-white mt-1"></div>
          )}
        </button>

        <button
          className="icons-menu flex flex-col items-center w-full h-10"
          onClick={() => handleNavigation("/requests")}
        >
          <div className="h-5 w-5 flex items-center justify-center">
            {activeIcon === "/requests" ? (
              <img
                src="./src/assets/checkboxSolid.png"
                alt="checkboxSolid"
                className="h-5 w-5 object-contain"
              />
            ) : (
              <img
                src="./src/assets/checkboxWhite.png"
                alt="checkboxSolid"
                className="h-5 w-5 object-contain"
              />
            )}
          </div>
          {activeIcon === "/requests" && (
            <div className="h-0.5 w-6 bg-white mt-1"></div>
          )}
        </button>

        <button
          className="icons-menu flex flex-col items-center w-full h-10"
          onClick={() => handleNavigation("/history")}
        >
          <div className="h-6 w-6 flex items-center justify-center">
            {activeIcon === "/history" ? (
              <BookOpenIconSolid className="h-full w-full text-white" />
            ) : (
              <BookOpenIconOutline className="h-full w-full text-white" />
            )}
          </div>
          {activeIcon === "/history" && (
            <div className="h-0.5 w-6 bg-white mt-1"></div>
          )}
        </button>

        <button
          className="icons-menu flex flex-col items-center w-full h-10"
          onClick={() => handleNavigation("/calendar")}
        >
          <div className="h-6 w-6 flex items-center justify-center">
            {activeIcon === "/calendar" ? (
              <CalendarIconSolid className="h-full w-full text-white" />
            ) : (
              <CalendarIconOutline className="h-full w-full text-white" />
            )}
          </div>
          {activeIcon === "/calendar" && (
            <div className="h-0.5 w-6 bg-white mt-1"></div>
          )}
        </button>

        <button
          className="icons-menu flex flex-col items-center w-full h-10"
          onClick={() => handleNavigation("/profile")}
        >
          <div className="h-6 w-6 flex items-center justify-center">
            {activeIcon === "/profile" ? (
              <UserIconSolid className="h-full w-full text-white" />
            ) : (
              <UserIconOutline className="h-full w-full text-white" />
            )}
          </div>
          {activeIcon === "/profile" && (
            <div className="h-0.5 w-6 bg-white mt-1"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomMenu;
