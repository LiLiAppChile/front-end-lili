import BottomMenuAdmin from "../SupportBottomMenu/SupportBottomMenu";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import Icons from '../../ItemIconIndex';
import IdCardImage from '@/assets/IdCardImage.png';
import filterIcon from '@/assets/filter.png';
import searchIcon from '@/assets/search.png';
import arrowIcon from '@/assets/Arrow.png';

const RegisteredUsers = () => {
    const navigate = useNavigate();
    const { fetchLightUsersAll } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('aprobado');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                setLoading(true);
                const data = await fetchLightUsersAll();

                const formattedUsers = data.map(user => ({
                    uid: user.uid,
                    name: user.name || 'Sin nombre',
                    rut: user.rut || 'Sin RUT',
                    specialties: user.specialties || [],
                    estado: user.validUser ? 'aprobado' : 'rechazado',
                    email: user.email || '',
                    phone: user.phone || ''
                }));

                setUsers(formattedUsers);
            } catch (error) {
                console.error("Error cargando usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarUsuarios();
    }, [fetchLightUsersAll]);

    const filteredUsers = users.filter((user) => {
        const term = searchTerm.toLowerCase();
        const matchesSearch = (
            user.name.toLowerCase().includes(term) ||
            (user.rut && user.rut.toLowerCase().includes(term)) ||
            (user.specialties && user.specialties.some(s => s.toLowerCase().includes(term)))
        );
        const matchesStatus = filterStatus === 'todos' || user.estado === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (num) => setCurrentPage(num);

    const renderAreaBadge = (specialties) => {
        if (!specialties || specialties.length === 0) return null;

        return (
            <div className="relative flex justify-center" title={specialties.join(', ')}>
                <img
                    src={Icons[specialties[0]] || Icons.default}
                    alt={specialties[0]}
                    className="h-6 w-6 object-contain"
                />
                {specialties.length > 1 && (
                    <span className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border border-white">
                        +{specialties.length - 1}
                    </span>
                )}
            </div>
        );
    };

    const handleUserClick = (uid) => navigate(`/admin/users-record/details/${uid}`);

    return (
        <>
            <BottomMenuAdmin />
            <div className='flex flex-col min-h-screen bg-white items-center px-2'>
                <div className="border-b-2 border-gray-200 mb-3 pb-3 pt-4 w-full max-w-[360px]">
                    <div className="flex items-center gap-2 pl-2">
                        <img src={IdCardImage} alt="UserIcon" className="w-6 h-6" />
                        <h1 className="text-xl font-bold">Registro LiLi Pro</h1>
                    </div>
                </div>

                <div className='w-full max-w-[360px] space-y-2 px-2'>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className='w-full rounded-md p-2 text-sm border border-gray-300'
                    >
                        <option value='todos'>Ver todos</option>
                        <option value='aprobado'>Aprobados</option>
                        <option value='pendiente'>Pendientes</option>
                        <option value='rechazado'>Rechazados</option>
                    </select>

                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Buscar profesional...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                            <div className='grid grid-cols-[1.5fr_1fr_60px_20px] gap-x-1 bg-white px-2 py-2 text-xs font-semibold text-left rounded-md'>
                                <div className="pl-1">Profesional</div>
                                <div className='text-center'>RUT</div>
                                <div className='text-center'>Área</div>
                                <div></div>
                            </div>

                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <div
                                        key={user.uid}
                                        className='bg-[#eaecf6] rounded-md cursor-pointer hover:bg-purple-100 transition h-[44px] flex items-center px-2'
                                        onClick={() => handleUserClick(user.uid)}
                                    >
                                        <div className='grid grid-cols-[1.5fr_1fr_60px_20px] gap-x-1 w-full items-center text-xs'>
                                            <div className='truncate whitespace-nowrap pl-1 font-medium' title={user.name}>
                                                {user.name}
                                            </div>
                                            <div className='truncate whitespace-nowrap text-gray-600 text-center' title={user.rut}>
                                                {user.rut}
                                            </div>
                                            <div className="flex justify-center" title={user.specialties?.join(', ')}>
                                                {renderAreaBadge(user.specialties)}
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
                                        {searchTerm ? 'No se encontraron resultados' : 'No hay profesionales registrados'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {filteredUsers.length > usersPerPage && (
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

export default RegisteredUsers;