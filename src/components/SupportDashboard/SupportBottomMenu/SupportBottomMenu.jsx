import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LiLiIconHomeWhite from "@/assets/LiLiIconHomeWhite.png";
import LiLiIconSolid from "@/assets/LiLiIconSolid.png";
import checkboxSolid from "@/assets/checkboxSolid.png";
import checkboxWhite from "@/assets/checkboxWhite.png";
import Presupuestos from "@/assets/Presupuestos.png";
import PresupuestosSolid from "@/assets/PresupuestosSolid.png";
import IdCardIcon from "@/assets/IdCardIcon.png";
import IdCardIconSolid from "@/assets/IdCardIconSolid.png";
import {
    UserIcon as UserIconSolid
} from "@heroicons/react/24/solid";
import {
    UserIcon as UserIconOutline
} from "@heroicons/react/24/outline";

const BottomMenuAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIcon, setActiveIcon] = useState(location.pathname);

    useEffect(() => {
        setActiveIcon(location.pathname);
    }, [location.pathname]);

    const handleNavigation = (path) => {
        navigate(path);
        setActiveIcon(path);
    };

    return (
        <div className="bottom-menu bg-[#714dbf] w-full fixed bottom-0 z-50 rounded-t-xl">
            <div className="flex justify-around items-center py-2">
                {/* HOME */}
                <button
                    className="icons-menu flex flex-col items-center w-full h-10"
                    onClick={() => handleNavigation("/admin/home")}
                >
                    <div className="h-5 w-5 flex items-center justify-center">
                        <img
                            src={activeIcon === "/admin/home" ? LiLiIconSolid : LiLiIconHomeWhite}
                            alt="Home"
                            className="h-5 w-5 object-contain"
                        />
                    </div>
                    {activeIcon === "/admin/home" && <div className="h-0.5 w-6 bg-white mt-1"></div>}
                </button>

                {/* POSTULACIONES */}
                <button
                    className="icons-menu flex flex-col items-center w-full h-10"
                    onClick={() => handleNavigation("/admin/postulaciones")}
                >
                    <div className="h-5 w-5 flex items-center justify-center">
                        <img
                            src={activeIcon === "/admin/postulaciones" ? checkboxSolid : checkboxWhite}
                            alt="Postulaciones"
                            className="h-5 w-5 object-contain"
                        />
                    </div>
                    {activeIcon === "/admin/postulaciones" && <div className="h-0.5 w-6 bg-white mt-1"></div>}
                </button>

                {/* PRESUPUESTOS */}
                <button
                    className="icons-menu flex flex-col items-center w-full h-10"
                    onClick={() => handleNavigation("/admin/presupuestos")}
                >
                    <div className="h-5 w-5 flex items-center justify-center">
                        <img
                            src={activeIcon === "/admin/presupuestos" ? PresupuestosSolid : Presupuestos}
                            alt="Presupuestos"
                            className="h-5 w-5 object-contain"
                        />
                    </div>
                    {activeIcon === "/admin/presupuestos" && <div className="h-0.5 w-6 bg-white mt-1"></div>}
                </button>

                {/* USUARIOS */}
                <button
                    className="icons-menu flex flex-col items-center w-full h-10"
                    onClick={() => handleNavigation("/admin/users-record")}
                >
                    <div className="h-5 w-5 flex items-center justify-center">
                        <img
                            src={activeIcon === "/admin/users-record" ? IdCardIconSolid : IdCardIcon}
                            alt="Usuarios"
                            className="h-5 w-5 object-contain"
                        />
                    </div>
                    {activeIcon === "/admin/users-record" && <div className="h-0.5 w-6 bg-white mt-1"></div>}
                </button>

                {/* PERFIL */}
                <button
                    className="icons-menu flex flex-col items-center w-full h-10"
                    onClick={() => handleNavigation("/admin/perfil")}
                >
                    <div className="h-6 w-6 flex items-center justify-center">
                        {activeIcon === "/admin/perfil" ? (
                            <UserIconSolid className="h-full w-full text-white" />
                        ) : (
                            <UserIconOutline className="h-full w-full text-white" />
                        )}
                    </div>
                    {activeIcon === "/admin/perfil" && <div className="h-0.5 w-6 bg-white mt-1"></div>}
                </button>
            </div>
        </div>
    );
};

export default BottomMenuAdmin;
