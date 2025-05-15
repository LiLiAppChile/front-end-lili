import { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../../../../Context/AuthContext';
import Navbar from '../../BottomMenu/BottomMenu';
import { useOrders } from '../Requests/useOrders'; // Importamos el hook useOrders
import { formatHour, getImageForCategory, getCategoryDescription } from '../Requests/orderUtils';
import Arrow from '@/assets/Arrow.png';
import Filter from '@/assets/Filter.png';
import Search from '@/assets/search.png';
import trabajosIcon from '@/assets/HistorialBlack.png';

Modal.setAppElement('#root');

const useOrderModals = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [error, setError] = useState(null);

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
        setShowTooltip(false);
    };

    return {
        selectedOrder,
        isModalOpen,
        showTooltip,
        openModal,
        closeModal,
        setShowTooltip,
        error,
        setError
    };
};

const usePagination = (orders, search) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    const filteredOrders = orders.filter(order =>
        order.nombreCliente?.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return { currentOrders, totalPages, currentPage, handlePageChange };
};

const HistoryPage = () => {
    const [tabActivo, setTabActivo] = useState('trabajos');
    const [search, setSearch] = useState('');
    const { fetchOrders } = useAuth();

    // Usamos el hook useOrders para obtener las órdenes
    const {
        orders: allOrders,
        acceptedOrders = [],
        paidOrders = [],
        loading
    } = useOrders(fetchOrders);

    const {
        selectedOrder,
        isModalOpen,
        showTooltip,
        openModal,
        closeModal,
        setShowTooltip
    } = useOrderModals();

    // Selecciona los datos según la pestaña activa
    const ordersToShow = tabActivo === 'pagos' ? acceptedOrders : acceptedOrders;

    const {
        currentOrders,
        totalPages,
        currentPage,
        handlePageChange
    } = usePagination(ordersToShow, search);

    const tooltipRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };

        if (showTooltip) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showTooltip]);

    const formatCurrency = (value) => {
        if (value === undefined || value === null) return "$0";
        return `$${value.toLocaleString("es-CL")}`;
    };

    const truncarNombre = (nombre) => {
        if (!nombre) return 'Cliente';

        const partes = nombre.trim().split(' ');

        if (partes.length > 1) {
            const primerNombre = partes[0];
            const inicialSegundo = partes[1][0] + '.';
            const combinado = `${primerNombre} ${inicialSegundo}`;
            return combinado.length > 12 ? combinado.slice(0, 12) : combinado;
        }

        return nombre.length > 12 ? nombre.slice(0, 12) : nombre;
    };

    function formatearFecha(fechaStr) {
        if (!fechaStr) return 'No disponible';

        const fecha = new Date(fechaStr);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = String(fecha.getFullYear()).slice(-2);

        return `${dia}-${mes}-${anio}`;
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-col min-h-screen bg-white'>
                {/* Encabezado */}
                <div className="border-b-2 border-gray-200 mb-5 pb-4 py-5 px-5 flex items-center gap-2">
                    <img src={trabajosIcon} alt="TrabajosIcon" className="" />

                    <h1 className="text-2xl font-bold">Historial</h1>
                </div>

                {/* Pestañas */}
                <div className='flex justify-between border-b'>
                    <button
                        className={`flex-1 py-3 text-center ${tabActivo === 'trabajos'
                            ? 'text-purple-600 font-medium border-b-2 border-purple-600'
                            : 'text-gray-700'
                            }`}
                        onClick={() => setTabActivo('trabajos')}
                    >
                        Trabajos
                    </button>
                    <button
                        className={`flex-1 py-3 text-center ${tabActivo === 'pagos'
                            ? 'text-purple-600 font-medium border-b-2 border-purple-600'
                            : 'text-gray-700'
                            }`}
                        onClick={() => setTabActivo('pagos')}
                    >
                        Pagos
                    </button>
                </div>

                {/* Buscador */}
                <div className="p-4 bg-white">
                    <div className="relative h-12">
                        <input
                            type="text"
                            placeholder="Buscar trabajo"
                            className="w-full h-full pl-4 pr-20 border border-[#9BA5B7] rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-3">
                            <button className="text-gray-500 hover:text-gray-700">
                                <img src={Filter} alt="filter" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <img src={Search} alt="search" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Listado de trabajos/pagos */}
                <div className='flex flex-col bg-white pb-16'>
                    <div className='h-auto px-4'>
                        {/* Encabezados de columnas dinámicos según la pestaña */}
                        {tabActivo === 'trabajos' ? (
                            <div className='grid grid-cols-12 gap-2 mb-2 py-2 bg-white mx-auto max-w-md'>
                                <div className='col-span-4 font-bold text-sm text-black text-center'>Cliente</div>
                                <div className='col-span-3 font-bold text-sm text-black text-center'>Fecha</div>
                                <div className='col-span-2 font-bold text-sm text-black text-center -ml-3'>Hora</div>
                                <div className='col-span-2 font-bold text-sm text-black text-center -ml-5'>Tipo</div>
                                <div className='col-span-1'></div>
                            </div>
                        ) : (
                            <div className='grid grid-cols-12 gap-1 mb-2 py-2 bg-white mx-auto max-w-md'>
                                <div className='col-span-4 font-bold text-sm text-black text-left pl-3'>Cliente</div>
                                <div className='col-span-3 font-bold text-sm text-black text-left'>Fecha</div>
                                <div className='col-span-2 font-bold text-sm text-black text-left'>Tipo</div>
                                <div className='col-span-2 font-bold text-sm text-black text-left'>Monto</div>
                                <div className='col-span-1'></div> {/* Espacio para la flecha */}
                            </div>
                        )}

                        {loading ? (
                            <div className='text-center py-12 max-w-md mx-auto'>
                                <div className='w-12 h-12 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-4'></div>
                                <p className='text-gray-500'>Cargando {tabActivo === 'pagos' ? 'pagos' : 'trabajos'}...</p>
                            </div>
                        ) : currentOrders.length > 0 ? (
                            <div className='space-y-2 max-w-md mx-auto'>
                                {currentOrders.map((order) => (
                                    tabActivo === 'trabajos' ? (
                                        // Vista para pestaña Trabajos
                                        <div
                                            key={order.id || order._id}
                                            className='grid grid-cols-12 gap-2 items-center px-4 py-3 bg-[#eaecf6] rounded-lg cursor-pointer hover:bg-[#cbb4ff] transition-colors duration-200 mx-auto w-full'
                                            onClick={() => openModal(order)}
                                        >
                                            <div className='col-span-4 text-sm font-medium truncate text-center'>
                                                {truncarNombre(order.nombreCliente)}
                                            </div>
                                            <div className='col-span-3 text-sm text-gray-600 text-center'>
                                                {order.fechaCreacion ? formatearFecha(order.fechaCreacion) : '--/--/--'}
                                            </div>
                                            <div className='col-span-2 text-sm text-gray-600 text-center'>
                                                {formatHour(order.fechaCreacion)}
                                            </div>
                                            <div className='col-span-2 flex justify-center'>
                                                {getImageForCategory(order.categoria) ? (
                                                    <img
                                                        src={getImageForCategory(order.categoria)}
                                                        alt={order.categoria}
                                                        title={order.categoria}
                                                        className='h-5'
                                                    />
                                                ) : (
                                                    <span className='text-xs'>--</span>
                                                )}
                                            </div>
                                            <div className='col-span-1 flex justify-end'>
                                                <img src={Arrow} alt="flechaSeleccion" className='h-4' />
                                            </div>
                                        </div>
                                    ) : (
                                        // Vista para pestaña Pagos
                                        <div
                                            key={order.id || order._id}
                                            className='grid grid-cols-12 gap-1 items-center px-2 py-3 bg-[#eaecf6] rounded-lg cursor-pointer hover:bg-[#cbb4ff] transition-colors duration-200 mx-auto w-full'
                                            onClick={() => openModal(order)}
                                        >
                                            <div className='col-span-4 text-sm font-medium truncate text-left pl-3'>
                                                {truncarNombre(order.nombreCliente)}
                                            </div>
                                            <div className='col-span-3 text-sm text-gray-600 text-left'>
                                                {order.fechaCreacion ? formatearFecha(order.fechaCreacion) : '--/--/--'}
                                            </div>
                                            <div className='col-span-2 flex justify-start'>
                                                {getImageForCategory(order.categoria) ? (
                                                    <img
                                                        src={getImageForCategory(order.categoria)}
                                                        alt={order.categoria}
                                                        title={order.categoria}
                                                        className='h-5'
                                                    />
                                                ) : (
                                                    <span className='text-xs'>--</span>
                                                )}
                                            </div>
                                            <div className='col-span-2 text-left'>
                                                <span className="inline-block px-2 py-1 bg-[#daedd0] rounded-lg text-[#4ba01d] text-sm font-medium">
                                                    {formatCurrency(order.montoTotal || 0)}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-8 bg-gray-50 rounded-lg max-w-md mx-auto'>
                                <p className='text-gray-500'>
                                    {tabActivo === 'pagos'
                                        ? 'No hay pagos registrados'
                                        : 'No tienes trabajos completados'}
                                </p>
                            </div>
                        )}

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <div className='w-full max-w-[360px] px-2 flex justify-center items-center pb-6 mt-2 mx-auto'>
                                <button
                                    className={`w-7 h-7 flex items-center justify-center rounded-full border text-sm mr-2 ${currentPage === 1
                                        ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                                        : 'bg-white text-purple-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    {'<'}
                                </button>

                                <div className='flex gap-1'>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            className={`w-7 h-7 text-xs flex items-center justify-center rounded-full ${currentPage === index + 1
                                                ? 'bg-purple-600 text-white'
                                                : 'text-purple-600 border border-purple-300 hover:bg-purple-100'
                                                }`}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className={`w-7 h-7 flex items-center justify-center rounded-full border text-sm ml-2 ${currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                                        : 'bg-white text-purple-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    {'>'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal de detalles */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className='relative bg-white w-full max-w-lg mx-auto my-0 p-0 rounded-lg shadow-xl outline-none overflow-auto'
                    overlayClassName='fixed inset-0 bg-gray-800/50 backdrop-blur z-50 flex items-center justify-center p-4'
                    style={{ content: { maxHeight: '90vh' } }}
                >
                    {selectedOrder && (
                        <div className="flex flex-col h-full">
                            {/* Encabezado */}
                            <div className="flex items-start gap-4 p-5 border-b border-gray-200">
                                <button onClick={closeModal} className="text-purple-700 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div className="flex flex-col">
                                    <p className="text-xl font-bold break-words">{selectedOrder.nombreCliente || 'Cliente'}</p>
                                    <p className="text-gray-500 text-sm break-all">#{selectedOrder.id || selectedOrder._id || '00000'}</p>
                                </div>
                            </div>

                            {/* Cuerpo */}
                            <div className="p-5">
                                <h2 className="text-2xl font-bold mb-4">Información técnica</h2>

                                <div className="bg-[#eaecf6] rounded-lg divide-y divide-gray-300 overflow-hidden">
                                    {/* Info general */}
                                    <div className="p-4 space-y-2">
                                        <p><strong>Cliente:</strong> {selectedOrder.nombreCliente || 'No disponible'}</p>
                                        <p><strong>Comuna:</strong> {selectedOrder.comuna || selectedOrder.datosOriginales?.shipping_address?.municipality || 'No disponible'}</p>
                                        <p><strong>Fecha:</strong> {selectedOrder.fechaCreacion ? new Date(selectedOrder.fechaCreacion).toLocaleDateString() : 'No disponible'}</p>
                                        <p><strong>Hora:</strong> {formatHour(selectedOrder.fechaCreacion)}</p>
                                        <p><strong>Pago:</strong> ${selectedOrder.montoTotal || selectedOrder.total || '0'}</p>
                                    </div>

                                    {/* Especialidad */}
                                    <div className="p-4 flex items-center gap-2">
                                        <p className="font-bold">Especialidad:</p>
                                        <span className="bg-blue-100 px-3 py-1 rounded text-blue-800">
                                            {selectedOrder.categoria || 'Especialidad'}
                                        </span>

                                        {/* Tooltip */}
                                        <div className="relative">
                                            <span
                                                className="ml-2 bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 text-xs cursor-pointer hover:bg-gray-400"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowTooltip(!showTooltip);
                                                }}
                                            >
                                                i
                                            </span>

                                            {showTooltip && (
                                                <div
                                                    ref={tooltipRef}
                                                    className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200"
                                                >
                                                    <p className="text-sm text-gray-700">
                                                        {getCategoryDescription(selectedOrder?.categoria)}
                                                    </p>
                                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Detalle */}
                                    <div className="p-4">
                                        <p className="font-bold mb-2">Detalle:</p>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            {selectedOrder.productos?.length > 0 ? (
                                                selectedOrder.productos.map((producto, index) => (
                                                    <li key={index}>{producto.name}</li>
                                                ))
                                            ) : selectedOrder.products?.length > 0 ? (
                                                selectedOrder.products.map((producto, index) => (
                                                    <li key={index}>{producto.name}</li>
                                                ))
                                            ) : (
                                                <>
                                                    <li>Solicitud de presupuesto personalizado.</li>
                                                    <li>{selectedOrder.categoria || ''} para vivienda.</li>
                                                </>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Imágenes */}
                                    <div className="p-4">
                                        <p className="font-bold mb-2">Imágenes:</p>
                                        <div className="flex space-x-2 overflow-x-auto pb-2">
                                            {(selectedOrder.productos || selectedOrder.products || []).length > 0 ? (
                                                (selectedOrder.productos || selectedOrder.products).map((producto, index) => (
                                                    <div key={index} className="w-28 h-28 flex-shrink-0 rounded overflow-hidden">
                                                        {producto.image ? (
                                                            <img src={producto.image} alt={producto.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                <span className="text-gray-400 text-xs">Sin imagen</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <>
                                                    <div className="w-28 h-28 bg-gray-200 rounded flex-shrink-0"></div>
                                                    <div className="w-28 h-28 bg-gray-200 rounded flex-shrink-0"></div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Solo botón de cerrar (sin acciones) */}
                            <div className="flex justify-center p-4 border-t border-gray-200">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-2 bg-[#5126ae] text-white rounded-md hover:bg-[#3e1d88] font-semibold"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
};

export default HistoryPage;