import Navbar from '../ClientBottomMenu/BottomMenuClient';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../../../Context/AuthContext';


Modal.setAppElement('#root');

const ClientRequests = () => {
  const {fetchClientsOrders} = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const ordersPerPage = 10;

  // Funciones de utilidad
  const formatHour = (timestamp) => {
    if (!timestamp) return 'Hora no disponible';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getImageForCategory = (category) => {
    const images = {
      'Gasfitería': '/tipos/Gasfiteria.png',
      'Electricidad': '/tipos/Electricidad.png',
      'Albañilería': '/tipos/Albanileria.png',
      'Artefactos': '/tipos/Artefactos.png',
      'Carpintería': '/tipos/Carpinteria.png',
      'Cerrajería': '/tipos/Cerrajeria.png',
      'Climatización': '/tipos/Climatizacion.png',
      'Control de Plagas': '/tipos/ControlPlagas.png',
      'Jardinería': '/tipos/Jardineria.png',
      'Limpieza': '/tipos/Limpieza.png',
      'Pintura': '/tipos/Pintura.png',
      'Seguridad': '/tipos/Seguridad.png',
      'Otros': '/tipos/Otros.png'
    };
    return images[category] || null;
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      'Gasfitería': 'Servicios de instalación, reparación y mantenimiento de sistemas de agua, gas y desagüe en hogares y edificios.',
      'Electricidad': 'Trabajos de instalación, reparación y mejoras en sistemas eléctricos, iluminación y redes eléctricas domiciliarias.',
      'Albañilería': 'Servicios de construcción, reparación y remodelación de estructuras de concreto, ladrillos y otros materiales.',
      'Artefactos': 'Instalación, mantenimiento y reparación de electrodomésticos y aparatos eléctricos o a gas.',
      'Carpintería': 'Fabricación, instalación y reparación de estructuras y muebles de madera.',
      'Cerrajería': 'Instalación y reparación de cerraduras, llaves y sistemas de seguridad para puertas y accesos.',
      'Climatización': 'Instalación y mantenimiento de sistemas de aire acondicionado, calefacción y ventilación.',
      'Control de Plagas': 'Eliminación y prevención de insectos, roedores y otras plagas en hogares y edificios.',
      'Jardinería': 'Diseño, mantenimiento y cuidado de jardines, áreas verdes y plantas.',
      'Limpieza': 'Servicios de limpieza profunda, sanitización y organización para hogares y espacios comerciales.',
      'Pintura': 'Trabajos de pintura interior y exterior, preparación de superficies y acabados decorativos.',
      'Seguridad': 'Instalación y mantenimiento de sistemas de seguridad, alarmas y cámaras de vigilancia.',
      'Otros': 'Otros servicios especializados para el hogar y edificios comerciales.'
    };
    return descriptions[category] || 'Servicios generales para el hogar y edificios.';
  };

  // Efectos
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchClientsOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [fetchClientsOrders]);

  

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
    setShowTooltip(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredOrders = orders

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);


  return (
    <>
      <Navbar />
      <div className='flex flex-col min-h-screen bg-white'>
        {/* Encabezado */}
        <div className='p-4 border-b-2 border-gray-200'>
          <h1 className='text-2xl font-bold'>Mis Pedidos</h1>
        </div>
        {/* Buscador */}
        <div className='p-4 flex items-center gap-2'>
          <input
            type='text'
            placeholder='Buscar trabajo'
            className='flex-1 p-2 border rounded-md'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Tabla de solicitudes */}
        <div className='flex flex-col bg-white pb-16'>
          <div className='h-auto p-4'>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-100 text-left'>
                    <th className='p-3 text-sm'>Cliente</th>
                    <th className='p-3 text-sm'>Fecha</th>
                    <th className='p-3 text-sm'>Hora</th>
                    <th className='p-3 text-sm'>Tipo</th>
                    <th className='p-3 text-sm'></th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr
                      key={order.id || order._id}
                      className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } hover:bg-purple-100 transition`}
                      onClick={() => openModal(order)}
                    >
                      <td className='p-3 text-sm whitespace-nowrap'>
                        {order.nombreCliente || 'Cliente'}
                      </td>
                      <td className='p-3 text-sm whitespace-nowrap'>
                        {order.fechaCreacion
                          ? new Date(order.fechaCreacion).toLocaleDateString()
                          : 'Fecha no disponible'}
                      </td>
                      <td className='p-3 text-sm whitespace-nowrap'>
                        {formatHour(order.fechaCreacion)}
                      </td>
                      <td className='p-3 text-sm whitespace-nowrap'>
                        {getImageForCategory(order.categoria) ? (
                          <img
                            src={getImageForCategory(order.categoria)}
                            alt={order.categoria}
                            title={order.categoria}
                            className='h-8 w-8'
                          />
                        ) : (
                          'Tipo no disponible'
                        )}
                      </td>
                      <td className='p-3 text-right text-sm whitespace-nowrap'>
                        <span className='text-purple-600'>➔</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className='flex justify-center items-center mt-4'>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 mx-1 rounded-md ${currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                  >
                    &laquo;
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 mx-1 rounded-md ${currentPage === index + 1
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 mx-1 rounded-md ${currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel='Detalles de la solicitud'
          className='relative bg-white w-full max-w-lg mx-auto my-0 p-0 rounded-lg shadow-xl outline-none overflow-auto'
          overlayClassName='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4'
          style={{
            content: {
              maxHeight: '90vh',
            },
          }}
        >
          {selectedOrder && (
            <div className='flex flex-col h-full'>
              <div className='bg-gray-900 text-white p-3'>
                <p className='text-sm font-light'>Detalle Solicitud</p>
              </div>
              {/* Encabezado con flecha y nombre */}
              <div className='flex items-center p-5 border-b border-gray-200'>
                <button onClick={closeModal} className='text-purple-700 mr-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                </button>
                <div>
                  <span className='text-xl font-bold'>
                    {selectedOrder.nombreCliente || 'Cliente'}{' '}
                  </span>
                  <span className='text-gray-400 text-lg'>
                    (#{selectedOrder.id || selectedOrder._id || '00000'})
                  </span>
                </div>
              </div>
              {/* Información técnica */}
              <div className='p-5'>
                <h2 className='text-2xl font-bold mb-4'>Información técnica</h2>

                <div className='border-2 border-blue-300 rounded-lg p-4'>
                  <div className='grid grid-cols-2 gap-2 mb-4'>
                    <p className='font-bold'>Cliente:</p>
                    <p>{selectedOrder.nombreCliente || 'No disponible'}</p>

                    <p className='font-bold'>Comuna:</p>
                    <p>
                      {selectedOrder.comuna ||
                        selectedOrder.datosOriginales?.shipping_address
                          ?.municipality ||
                        'No disponible'}
                    </p>

                    <p className='font-bold'>Fecha:</p>
                    <p>
                      {selectedOrder.fechaCreacion
                        ? new Date(
                          selectedOrder.fechaCreacion
                        ).toLocaleDateString()
                        : 'No disponible'}
                    </p>

                    <p className='font-bold'>Hora:</p>
                    <p>{formatHour(selectedOrder.fechaCreacion)}</p>

                    <p className='font-bold'>Pago:</p>
                    <p>
                      ${selectedOrder.montoTotal || selectedOrder.total || '0'}
                    </p>
                  </div>
                  <div className='border-t border-gray-300 pt-4 mb-4'>
                    <div className='flex items-center mb-2 relative'>
                      <p className='font-bold mr-2'>Especialidad:</p>
                      <div className='flex items-center'>
                        <span className='bg-blue-100 px-4 py-1 rounded-lg text-blue-800'>
                          {selectedOrder.categoria || 'Especialidad'}
                        </span>
                        <span
                          className='ml-2 bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 text-xs cursor-pointer hover:bg-gray-400'
                          onClick={(e) => {
                            e.stopPropagation(); // Prevenir que el clic propague al modal principal
                            setShowTooltip(!showTooltip);
                          }}
                        >
                          i
                        </span>

                        {/* Tooltip con la descripción */}
                        {showTooltip && (
                          <div className='absolute z-10 top-full left-0 mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200'>
                            <p className='text-sm text-gray-700'>
                              {getCategoryDescription(selectedOrder.categoria)}
                            </p>
                            <div className='absolute -top-2 left-32 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200'></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='border-t border-gray-300 pt-4 mb-4'>
                    <p className='font-bold mb-2'>Detalle:</p>
                    <ul className='list-disc pl-5 space-y-1'>
                      {selectedOrder.productos?.length > 0 ? (
                        selectedOrder.productos.map((producto, index) => (
                          <li key={index}>{producto.name}</li>
                        ))
                      ) : selectedOrder.products?.length > 0 ? (
                        selectedOrder.products.map((producto, index) => (
                          <li key={index}>{producto.name}</li>
                        ))
                      ) : (
                        <li>Solicitud de presupuesto personalizado.</li>
                      )}
                      {!selectedOrder.productos?.length &&
                        !selectedOrder.products?.length && (
                          <li>
                            {selectedOrder.categoria || ''} para vivienda.
                          </li>
                        )}
                    </ul>
                  </div>
                  <div className='border-t border-gray-300 pt-4'>
                    <p className='font-bold mb-2'>Imágenes:</p>
                    <div className='flex space-x-2 overflow-x-auto pb-2'>
                      {selectedOrder.productos &&
                        selectedOrder.productos.length > 0 ? (
                        // Mostrar imágenes de productos si están disponibles
                        selectedOrder.productos.map((producto, index) => (
                          <div
                            key={index}
                            className='w-36 h-36 flex-shrink-0 rounded overflow-hidden'
                          >
                            {producto.image ? (
                              <img
                                src={producto.image}
                                alt={producto.name}
                                className='w-full h-full object-cover'
                              />
                            ) : (
                              <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                                <span className='text-gray-400 text-xs'>
                                  Sin imagen
                                </span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : selectedOrder.products &&
                        selectedOrder.products.length > 0 ? (
                        // Alternativa si los productos están en selectedOrder.products en lugar de selectedOrder.productos
                        selectedOrder.products.map((producto, index) => (
                          <div
                            key={index}
                            className='w-36 h-36 flex-shrink-0 rounded overflow-hidden'
                          >
                            {producto.image ? (
                              <img
                                src={producto.image}
                                alt={producto.name}
                                className='w-full h-full object-cover'
                              />
                            ) : (
                              <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                                <span className='text-gray-400 text-xs'>
                                  Sin imagen
                                </span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        // Placeholders si no hay productos con imágenes
                        <>
                          <div className='w-36 h-36 bg-gray-200 rounded flex-shrink-0'></div>
                          <div className='w-36 h-36 bg-gray-200 rounded flex-shrink-0'></div>
                          <div className='w-36 h-36 bg-gray-200 rounded flex-shrink-0'></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ClientRequests;
