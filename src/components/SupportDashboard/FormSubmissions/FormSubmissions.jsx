// src/components/FormSubmissions.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../ItemIconIndex';
import arrowIcon from '@/assets/Arrow.png';
import { useAuth } from '../../../Context/AuthContext';

const truncateName = (name) => {
    return name.length > 18 ? `${name.slice(0, 17)}...` : name;
};

const FormSubmissions = () => {
    const [latestPostulaciones, setLatestPostulaciones] = useState([]);
    const navigate = useNavigate();
    const { fetchLightUsers } = useAuth();

    useEffect(() => {
        const getData = async () => {
            const all = await fetchLightUsers();
            const formateados = all
                .map((user) => ({
                    id: user.uid,
                    nombre: user.name || 'Sin nombre',
                    rut: user.rut || 'Sin RUT',
                    areas: user.specialties || [],
                    estado:
                        user.status === 'accepted'
                            ? 'aceptada'
                            : user.status === 'rejected'
                                ? 'rechazada'
                                : 'pendiente',
                    createdAt: user.createdAt || new Date().toISOString(),
                }))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);


            setLatestPostulaciones(formateados);
        };

        getData();
    }, [fetchLightUsers]);

    const getImageForStatus = (estado) => {
        switch (estado) {
            case 'aceptada':
                return Icons.paid;
            case 'rechazada':
                return Icons.canceled;
            case 'pendiente':
                return Icons.pending;
            default:
                return Icons.default;
        }
    };

    return (
        <div className='w-full max-w-[360px] px-2 pb-4 mt-2'>
            <div className='space-y-2'>
                {/* Encabezados de columnas */}
                <div className='grid grid-cols-[1fr_70px_60px_50px_20px] gap-x-1 bg-white px-2 py-2 text-xs font-semibold text-left rounded-md'>
                    <div className="pl-1">Profesional</div>
                    <div>RUT</div>
                    <div className='text-center'>Área</div>
                    <div className='text-center'>Estado</div>
                    <div></div>
                </div>

                {latestPostulaciones.map((p) => (
                    <div
                        key={p.id}
                        className='bg-[#eaecf6] rounded-md cursor-pointer hover:bg-purple-100 transition h-[44px] flex items-center px-2'
                        onClick={() => navigate(`/admin/postulaciones/detalles/${p.id}`)}
                    >
                        <div className='grid grid-cols-[1fr_70px_60px_50px_20px] gap-x-1 w-full items-center text-xs'>
                            <div className='truncate whitespace-nowrap pl-1 font-medium' title={p.nombre}>
                                {truncateName(p.nombre)}
                            </div>
                            <div className='truncate whitespace-nowrap text-gray-600' title={p.rut}>
                                {p.rut}
                            </div>
                            <div className="flex justify-center" title={p.areas?.join(', ')}>
                                {p.areas?.[0] && (
                                    <img
                                        src={Icons[p.areas[0]] || Icons.default}
                                        alt={p.areas[0]}
                                        className='h-5 w-5 object-contain'
                                    />
                                )}
                            </div>
                            <div className='flex justify-center'>
                                <img
                                    src={getImageForStatus(p.estado)}
                                    alt={p.estado}
                                    title={p.estado}
                                    className='h-6 w-6 object-contain'
                                />
                            </div>
                            <div className='flex justify-end'>
                                <img src={arrowIcon} alt='Ver detalle' />
                            </div>
                        </div>
                    </div>
                ))}

                {latestPostulaciones.length === 0 && (
                    <div className='bg-[#eaecf6] rounded-md p-3 text-center'>
                        <p className="text-gray-500 text-sm">No hay postulaciones recientes</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormSubmissions;
