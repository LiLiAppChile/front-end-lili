import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { ChevronRight, UserCircle } from "lucide-react";
import BottomMenuAdmin from "../SupportBottomMenu/SupportBottomMenu";

const UsersRecord = () => {
    const { fetchUsuarios } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarUsuarios = async () => {
            const data = await fetchUsuarios();
            const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setUsuarios(sorted);
        };

        cargarUsuarios();
    }, [fetchUsuarios]);

    const handleClick = (uid) => {
        navigate(`/admin/usuarios/${uid}`);
    };

    return (
        <>
            <BottomMenuAdmin />
            <div className="space-y-4">
                {usuarios.map((usuario) => (
                    <div
                        key={usuario.uid}
                        onClick={() => handleClick(usuario.uid)}
                        className="w-full bg-[#eaecf6] rounded-lg p-4 cursor-pointer flex items-center justify-between hover:shadow-md transition"
                    >
                        <div>
                            <h3 className="font-semibold text-lg">{usuario.name || "Sin nombre"}</h3>
                            <p className="text-sm text-gray-600">Email: {usuario.email}</p>
                            <p className="text-sm text-gray-600">Rol: {usuario.role || "No definido"}</p>
                        </div>
                        <ChevronRight className="text-[#714dbf] w-6 h-6" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default UsersRecord;
