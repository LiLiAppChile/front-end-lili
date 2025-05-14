import BottomMenuAdmin from "../SupportBottomMenu/SupportBottomMenu";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import Icons from '../../ItemIconIndex';
import requestImg from '@assets/Vector.png';
import filterIcon from '@/assets/Filter.png';
import searchIcon from '@/assets/search.png';
import arrowIcon from '@/assets/Arrow.png';

const SupportRequests = () => {
    const navigate = useNavigate();
    const { fetchLightUsers } = useAuth();

    const [filterStatus, setFilterStatus] = useState('todas');
    const [postulaciones, setPostulaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postulacionesPorPagina = 8;

    useEffect(() => {
        const cargarPostulaciones = async () => {
            setLoading(true);
            try {
                const users = await fetchLightUsers();
                const formateados = users.map((user) => ({
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
                    fechaCreacion: new Date().toISOString(),
                }));
                setPostulaciones(formateados);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarPostulaciones();
    }, [fetchLightUsers]);

    const filtrarPostulaciones = postulaciones.filter((p) => {
        const coincideBusqueda = p.nombre.toLowerCase().includes(search.toLowerCase());
        const coincideEstado = filterStatus === 'todas' || p.estado === filterStatus;
        return coincideBusqueda && coincideEstado;
    });

    const indexOfLast = currentPage * postulacionesPorPagina;
    const indexOfFirst = indexOfLast - postulacionesPorPagina;
    const postulacionesActuales = filtrarPostulaciones.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtrarPostulaciones.length / postulacionesPorPagina);

    const handlePageChange = (num) => setCurrentPage(num);

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

    const renderAreaWithBadge = (areas) => {
        if (!areas || areas.length === 0) return null;
        return (
            <div className="flex items-center justify-center space-x-1">
                <div className="relative">
                    <img
                        src={Icons[areas[0]] || Icons.default}
                        alt={areas[0]}
                        className="w-6 object-contain"
                    />
                    {areas.length > 1 && (
                        <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
                            <div className="bg-purple-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                +{areas.length - 1}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const truncateName = (name) => {
        const spaceIndex = name.indexOf(' ');
        return spaceIndex > 0 ? name.substring(0, spaceIndex + 2) + '.' : name;
    };

    return (
        <>
            <BottomMenuAdmin />
            <div className='flex flex-col min-h-screen bg-white items-center px-2'>
                <div className="border-b-2 border-gray-200 mb-3 pb-3 pt-4 w-full max-w-[360px]">
                    <div className="flex items-center gap-2 pl-2">
                        <img src={requestImg} alt="RequestIcon" className="w-6 h-6" />
                        <h1 className="text-xl font-bold">Postulaciones</h1>
                    </div>
                </div>

                <div className='w-full max-w-[360px] space-y-2 px-2'>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className='w-full rounded-md p-2 text-sm border border-gray-300'
                    >
                        <option value='todas'>Ver todas</option>
                        <option value='pendiente'>Pendientes</option>
                        <option value='aceptada'>Aceptadas</option>
                        <option value='rechazada'>Rechazadas</option>
                    </select>

                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Buscar profesional...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full p-2 pr-12 pl-3 border border-gray-300 rounded-md text-sm'
                        />
                        <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1'>
                            <img src={filterIcon} alt='filter' className='h-4 w-4 opacity-70' />
                            <img src={searchIcon} alt='search' className='h-4 w-4 opacity-70' />
                        </div>
                    </div>
                </div>

                <div className='w-full max-w-[360px] px-2 pb-4 mt-2'>
                    {loading ? (
                        <p className='text-center text-gray-500 py-4'>Cargando profesionales...</p>
                    ) : (
                        <div className='space-y-2'>
                            <div className='grid grid-cols-[1fr_70px_60px_50px_20px] gap-x-1 bg-white px-2 py-2 text-xs font-semibold text-left rounded-md'>
                                <div className="pl-1">Profesional</div>
                                <div>RUT</div>
                                <div className='text-center'>Área</div>
                                <div className='text-center'>Estado</div>
                                <div></div>
                            </div>

                            {postulacionesActuales.length > 0 ? (
                                postulacionesActuales.map((p) => (
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
                                            <div className="flex justify-center" title={p.areas.join(', ')}>
                                                {renderAreaWithBadge(p.areas)}
                                            </div>
                                            <div className='flex justify-center'>
                                                <img
                                                    src={getImageForStatus(p.estado)}
                                                    alt={p.estado}
                                                    title={p.estado}
                                                    className='w-5 object-contain'
                                                />
                                            </div>
                                            <div className='flex justify-end'>
                                                <img src={arrowIcon} alt='Ver detalle' />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='bg-[#eaecf6] rounded-md p-3 text-center'>
                                    <p className="text-gray-500 text-sm">
                                        {search ? 'No se encontraron resultados' : 'No hay postulaciones'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {filtrarPostulaciones.length > postulacionesPorPagina && (
                    <div className='w-full max-w-[360px] px-2 flex justify-center items-center pb-6 mt-2'>
                        <button
                            className={`w-7 h-7 flex items-center justify-center rounded-full border text-sm mr-2
                            ${currentPage === 1
                                    ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                                    : 'bg-white text-purple-600 border-gray-300 hover:bg-gray-50'}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            {'<'}
                        </button>

                        <div className='flex gap-1'>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`w-7 h-7 text-xs flex items-center justify-center rounded-full
                                    ${currentPage === index + 1
                                            ? 'bg-purple-600 text-white'
                                            : 'text-purple-600 border border-purple-300 hover:bg-purple-100'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            className={`w-7 h-7 flex items-center justify-center rounded-full border text-sm ml-2
                            ${currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                                    : 'bg-white text-purple-600 border-gray-300 hover:bg-gray-50'}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            {'>'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SupportRequests;
