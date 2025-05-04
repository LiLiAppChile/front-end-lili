import Navbar from '../../BottomMenu/BottomMenu';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../../../../Context/AuthContext';
import { getAuth } from 'firebase/auth';

Modal.setAppElement('#root');

const auth = getAuth();

const Requests = () => {
  const {
    fetchOrders,
    acceptOrder: contextAcceptOrder,
    rejectOrder: contextRejectOrder,
    loading: authLoading,
  } = useAuth();

  const [tabActivo, setTabActivo] = useState('pendientes');
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const ordersPerPage = 10;

  // Estados para el modal de confirmación
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmActionType, setConfirmActionType] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  const formatHour = (timestamp) => {
    if (!timestamp) return 'No disponible';
    try {
      const date = new Date(timestamp);
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) return 'No disponible';
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error al formatear hora:', error);
      return 'No disponible';
    }
  };

  const getImageForCategory = (category) => {
    const images = {
      Gasfitería: '/tipos/Gasfiteria.png',
      Electricidad: '/tipos/Electricidad.png',
      Albañilería: '/tipos/Albanileria.png',
      Artefactos: '/tipos/Artefactos.png',
      Carpintería: '/tipos/Carpinteria.png',
      Cerrajería: '/tipos/Cerrajeria.png',
      Climatización: '/tipos/Climatizacion.png',
      'Control de Plagas': '/tipos/ControlPlagas.png',
      Jardinería: '/tipos/Jardineria.png',
      Limpieza: '/tipos/Limpieza.png',
      Pintura: '/tipos/Pintura.png',
      Seguridad: '/tipos/Seguridad.png',
      Otros: '/tipos/Otros.png',
    };
    return images[category] || null;
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      Gasfitería:
        'Servicios de instalación, reparación y mantenimiento de sistemas de agua, gas y desagüe en hogares y edificios.',
      Electricidad:
        'Trabajos de instalación, reparación y mejoras en sistemas eléctricos, iluminación y redes eléctricas domiciliarias.',
      Albañilería:
        'Servicios de construcción, reparación y remodelación de estructuras de concreto, ladrillos y otros materiales.',
      Artefactos:
        'Instalación, mantenimiento y reparación de electrodomésticos y aparatos eléctricos o a gas.',
      Carpintería:
        'Fabricación, instalación y reparación de estructuras y muebles de madera.',
      Cerrajería:
        'Instalación y reparación de cerraduras, llaves y sistemas de seguridad para puertas y accesos.',
      Climatización:
        'Instalación y mantenimiento de sistemas de aire acondicionado, calefacción y ventilación.',
      'Control de Plagas':
        'Eliminación y prevención de insectos, roedores y otras plagas en hogares y edificios.',
      Jardinería:
        'Diseño, mantenimiento y cuidado de jardines, áreas verdes y plantas.',
      Limpieza:
        'Servicios de limpieza profunda, sanitización y organización para hogares y espacios comerciales.',
      Pintura:
        'Trabajos de pintura interior y exterior, preparación de superficies y acabados decorativos.',
      Seguridad:
        'Instalación y mantenimiento de sistemas de seguridad, alarmas y cámaras de vigilancia.',
      Otros:
        'Otros servicios especializados para el hogar y edificios comerciales.',
    };
    return (
      descriptions[category] || 'Servicios generales para el hogar y edificios.'
    );
  };

  // Efectos
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchOrders();
        const currentUserUid = auth.currentUser?.uid;

        // Filtrar por el valor de "tomado"
        const pendingOrders = data.filter((order) => order.tomado === 'no');

        // Filtrar pedidos aceptados para que solo aparezcan los del usuario actual
        const acceptedOrdersList = data.filter(
          (order) => order.tomado === 'si' && order.userId === currentUserUid
        );

        setOrders(pendingOrders);
        setAcceptedOrders(acceptedOrdersList);
      } catch (err) {
        setError(err.message || 'Error al cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [fetchOrders]);

  const handleAcceptOrder = async (order) => {
    try {
      // 1. Primera pantalla de carga del programa
      setIsProcessingAction(true);
      setLoading(true);

      // 2. Cierra el modal inmediatamente
      closeModal();

      if (order.tomado === 'si') {
        console.log('La orden ya estaba marcada como tomada');

        // Verificar si la orden pertenece al usuario actual
        const currentUserUid = auth.currentUser?.uid;
        if (order.userId === currentUserUid) {
          // Asegurar de que se elimine de pendientes y se agregue a aceptados
          setOrders(
            orders.filter((o) => (o.id || o._id) !== (order.id || order._id))
          );

          if (
            !acceptedOrders.some(
              (o) => (o.id || o._id) === (order.id || order._id)
            )
          ) {
            setAcceptedOrders([
              { ...order, status: 'accepted', tomado: 'si' },
              ...acceptedOrders,
            ]);
          }

          // Cambiar a pestaña de aceptadas
          setTimeout(() => {
            setTabActivo('aceptadas');
            setIsProcessingAction(false);
            setLoading(false);
          }, 1000);
        } else {
          // La orden está tomada por otro usuario
          setError('Esta orden ya ha sido tomada por otro profesional');
          setIsProcessingAction(false);
          setLoading(false);
        }
        return;
      }

      // 3. Procesar la orden en segundo plano
      try {
        // Intentar primero con el método de contexto
        await contextAcceptOrder(order);
      } catch (contextError) {
        console.log(
          'Error en contextAcceptOrder, intentando directamente con API:',
          contextError
        );

        // Si el método de contexto falla, intenta la llamada directa a la API
        const token = await auth.currentUser?.getIdToken();
        if (!token) {
          throw new Error('No se pudo obtener el token de autenticación');
        }

        const response = await fetch(
          `http://localhost:3001/pedidos/${order.id || order._id}/tomar`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          // Si la respuesta tiene contenido, intenta analizarlo para obtener mejores mensajes de error
          const errorText = await response.text();
          let errorMessage = `Error al aceptar: ${response.status} ${response.statusText}`;

          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.message) {
              // Si indica que la orden ya está tomada, podemos continuar
              if (
                errorJson.message.includes('ya tiene el campo "tomado" en "si"')
              ) {
                console.log('La orden ya estaba marcada como tomada');
              } else {
                errorMessage += ` - ${errorJson.message}`;
                throw new Error(errorMessage);
              }
            } else {
              throw new Error(errorMessage);
            }
          } catch {
            throw new Error(errorMessage);
          }
        }
      }

      // Obtener el ID del usuario actual para asignarlo a la orden aceptada
      const currentUserUid = auth.currentUser?.uid;

      // Quitar de pedidos pendientes
      setOrders(
        orders.filter((o) => (o.id || o._id) !== (order.id || order._id))
      );

      // Preparar la orden actualizada con todos los datos necesarios
      const updatedOrder = {
        ...order,
        status: 'accepted',
        tomado: 'si',
        userId: currentUserUid, // Asignar el ID del usuario actual
      };

      // Agregar a pedidos aceptados
      setAcceptedOrders((prevAccepted) => {
        // Evitar duplicados
        const exists = prevAccepted.some(
          (o) =>
            (o.id || o._id) === updatedOrder.id ||
            (o.id || o._id) === updatedOrder._id
        );

        if (exists) {
          return prevAccepted.map((o) =>
            (o.id || o._id) === (updatedOrder.id || updatedOrder._id)
              ? updatedOrder
              : o
          );
        }

        return [updatedOrder, ...prevAccepted];
      });

      // 4. Cambiar a la pestaña de aceptadas con un ligero retraso para una mejor experiencia de usuario
      setTimeout(() => {
        setTabActivo('aceptadas');
        setIsProcessingAction(false);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
      setError('Error al aceptar la solicitud: ' + error.message);
      setIsProcessingAction(false);
      setLoading(false);
    }
  };

  const handleRejectOrder = async (order) => {
    try {
      // Primera pantalla de carga del programa
      setIsProcessingAction(true);
      setLoading(true);

      // Cierra el modal inmediatamente
      closeModal();

      // Check
      if (order.tomado === 'no') {
        console.log('La orden ya estaba desmarcada como no tomada');

        // Asegurar que se elimine de aceptadas y se agregue a pendientes
        setAcceptedOrders(
          acceptedOrders.filter(
            (o) => (o.id || o._id) !== (order.id || order._id)
          )
        );

        // A pedidos pendientes
        if (!orders.some((o) => (o.id || o._id) === (order.id || order._id))) {
          setOrders((currentOrders) => [
            ...currentOrders,
            { ...order, tomado: 'no' },
          ]);
        }

        // Cambiar a pesteña de pendientes
        setTimeout(() => {
          setTabActivo('pendientes');
          setIsProcessingAction(false);
          setLoading(false);
        }, 1000);
        return;
      }

      // Procesar la orden en segundo plano
      try {
        // Intentar primero con el método de contexto
        await contextRejectOrder(order);
      } catch (contextError) {
        console.log(
          'Error en contextRejectOrder, intentando directamente con API:',
          contextError
        );

        // Si el método de contexto falla, intenta la llamada directa a la API
        const token = await auth.currentUser?.getIdToken();
        if (!token) {
          throw new Error('No se pudo obtener el token de autenticación');
        }

        const response = await fetch(
          `http://localhost:3001/pedidos/${order.id || order._id}/desmarcar`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          // Si la respuesta tiene contenido, intenta analizarlo para mensajes de error
          const errorText = await response.text();
          let errorMessage = `Error al rechazar: ${response.status} ${response.statusText}`;

          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.message) {
              // Si indica que la orden ya está desmarcada
              if (
                errorJson.message.includes('ya tiene el campo "tomado" en "no"')
              ) {
                console.log('La orden ya estaba desmarcada como no tomada');
              } else {
                errorMessage += ` - ${errorJson.message}`;
                throw new Error(errorMessage);
              }
            } else {
              throw new Error(errorMessage);
            }
          } catch {
            throw new Error(errorMessage);
          }
        }
      }

      // Preparar la orden actualizada
      const updatedOrder = { ...order, tomado: 'no' };

      // Eliminar de aceptadas
      setAcceptedOrders(
        acceptedOrders.filter(
          (o) => (o.id || o._id) !== (order.id || order._id)
        )
      );

      // Agregar a pendientes (solo si no está ya allí)
      setOrders((currentOrders) => {
        const exists = currentOrders.some(
          (o) => (o.id || o._id) === (order.id || order._id)
        );
        if (!exists) {
          return [...currentOrders, updatedOrder];
        }
        return currentOrders;
      });

      //Cambiar a la pestaña de pendientes con un retraso para una mejor experiencia de usuario
      setTimeout(() => {
        setTabActivo('pendientes');
        setIsProcessingAction(false);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
      setError('Error al rechazar la solicitud: ' + error.message);
      setIsProcessingAction(false);
      setLoading(false);
    }
  };

  const handleConfirmAccept = async () => {
    setConfirmModalOpen(false);
    await handleAcceptOrder(selectedOrder);
  };

  const handleConfirmReject = async () => {
    setConfirmModalOpen(false);
    await handleRejectOrder(selectedOrder);
  };

  const openModal = (order) => {
    const currentUserUid = auth.currentUser?.uid;

    // Verificar si la orden está tomada por otro usuario
    if (
      order.tomado === 'si' &&
      order.userId &&
      order.userId !== currentUserUid
    ) {
      setError(`Esta orden ya ha sido tomada por otro profesional`);
      return;
    }

    // Si la orden está tomada por el usuario actual o no está tomada, mostrar el modal
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

  const filteredOrders =
    tabActivo === 'pendientes'
      ? orders.filter((order) =>
          order.nombreCliente?.toLowerCase().includes(search.toLowerCase())
        )
      : acceptedOrders.filter((order) =>
          order.nombreCliente?.toLowerCase().includes(search.toLowerCase())
        );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Determinar si la orden actual es aceptada o pendiente
  const isOrderAccepted = selectedOrder?.tomado === 'si';

  if (isProcessingAction) {
    return (
      <div className='fixed inset-0 bg-white flex flex-col items-center justify-center z-50'>
        <div className='w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin mb-4'></div>
        <p className='text-xl'>Procesando solicitud...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-col min-h-screen bg-white'>
        {/* Encabezado */}
        <div className='p-4 border-b-2 border-gray-200'>
          <h1 className='text-2xl font-bold'>Trabajos</h1>
        </div>
        {/* Pestañas */}
        <div className='flex justify-between border-b'>
          <button
            className={`flex-1 py-3 text-center ${
              tabActivo === 'aceptadas'
                ? 'text-purple-600 font-medium border-b-2 border-purple-600'
                : 'text-gray-700'
            }`}
            onClick={() => setTabActivo('aceptadas')}
          >
            Aceptados
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              tabActivo === 'pendientes'
                ? 'text-purple-600 font-medium border-b-2 border-purple-600'
                : 'text-gray-700'
            }`}
            onClick={() => setTabActivo('pendientes')}
          >
            Solicitudes
          </button>
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
              {loading && !isProcessingAction ? (
                <div className='text-center py-12'>
                  <div className='w-12 h-12 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-4'></div>
                  <p className='text-gray-500'>Cargando solicitudes...</p>
                </div>
              ) : currentOrders.length > 0 ? (
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
                        className={`cursor-pointer ${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
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
              ) : (
                <div className='text-center py-8 bg-gray-50 rounded-lg'>
                  <p className='text-gray-500'>
                    {tabActivo === 'pendientes'
                      ? 'No hay solicitudes pendientes disponibles'
                      : 'No tienes trabajos aceptados'}
                  </p>
                </div>
              )}

              {/* Paginación */}
              {/* Paginación modificada para mostrar sólo un conjunto de páginas si hay muchas */}
              {totalPages > 1 && (
                <div className='flex justify-center items-center mt-4'>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 mx-1 rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    &laquo;
                  </button>

                  {totalPages <= 5 ? (
                    // Si hay 5 páginas o menos, mostrar todas
                    [...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 mx-1 rounded-md ${
                          currentPage === index + 1
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))
                  ) : (
                    // Si hay más de 5 páginas, mostrar un subconjunto
                    <>
                      {/* Primera página siempre visible */}
                      <button
                        onClick={() => handlePageChange(1)}
                        className={`px-3 py-1 mx-1 rounded-md ${
                          currentPage === 1
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                      >
                        1
                      </button>

                      {/* Mostrar puntos suspensivos si la página actual es mayor que 3 */}
                      {currentPage > 3 && <span className='mx-1'>...</span>}

                      {/* Páginas alrededor de la actual */}
                      {[...Array(5)]
                        .map((_, index) => {
                          const pageNum = Math.max(2, currentPage - 1) + index;
                          if (pageNum > 1 && pageNum < totalPages) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-1 mx-1 rounded-md ${
                                  currentPage === pageNum
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          return null;
                        })
                        .filter(Boolean)}

                      {/* Mostrar puntos suspensivos si la página actual es menor que el total - 2 */}
                      {currentPage < totalPages - 2 && (
                        <span className='mx-1'>...</span>
                      )}

                      {/* Última página siempre visible */}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-3 py-1 mx-1 rounded-md ${
                          currentPage === totalPages
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 mx-1 rounded-md ${
                      currentPage === totalPages
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

        {/* Modal principal */}
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
                            e.stopPropagation();
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
              {/* Botones de acción - mostrar según el tab activo */}
              <div className='flex mt-auto p-4'>
                {isOrderAccepted ? (
                  // Para órdenes ya aceptadas, solo mostrar botón de rechazar
                  <button
                    onClick={() => {
                      if (loading || isProcessingAction) return;
                      setConfirmActionType('reject');
                      setConfirmMessage(
                        '¿Estás seguro de que quieres rechazar esta solicitud?'
                      );
                      setConfirmModalOpen(true);
                    }}
                    className={`flex-1 py-4 text-center border-2 border-orange-700 text-orange-700 rounded-lg font-bold ${
                      loading || isProcessingAction
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={loading || isProcessingAction}
                  >
                    {loading ? 'Procesando...' : 'Rechazar'}
                  </button>
                ) : (
                  // Para órdenes pendientes, solo mostrar botón de aceptar
                  <button
                    onClick={() => {
                      if (loading || isProcessingAction) return;
                      setConfirmActionType('accept');
                      setConfirmMessage(
                        '¿Estás seguro de que quieres aceptar esta solicitud?'
                      );
                      setConfirmModalOpen(true);
                    }}
                    className={`flex-1 py-4 text-center border-2 border-orange-700 text-orange-700 rounded-lg font-bold ${
                      loading || isProcessingAction
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={loading || isProcessingAction}
                  >
                    {loading ? 'Procesando...' : 'Aceptar'}
                  </button>
                )}
              </div>
            </div>
          )}
        </Modal>

        {/* Modal de confirmación */}
        <Modal
          isOpen={confirmModalOpen}
          onRequestClose={() => setConfirmModalOpen(false)}
          contentLabel='Confirmar acción'
          className='relative bg-white w-full max-w-md mx-auto my-0 p-0 rounded-lg shadow-xl outline-none'
          overlayClassName='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4'
        >
          <div className='p-6'>
            <h2 className='text-xl font-bold mb-4'>Confirmar</h2>
            <p className='mb-6'>{confirmMessage}</p>
            <div className='flex justify-end space-x-4'>
              <button
                onClick={() => setConfirmModalOpen(false)}
                className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100'
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (confirmActionType === 'accept') {
                    handleConfirmAccept();
                  } else if (confirmActionType === 'reject') {
                    handleConfirmReject();
                  }
                }}
                className={`px-4 py-2 rounded-md text-white ${
                  confirmActionType === 'accept'
                    ? 'bg-green-500'
                    : 'bg-orange-600'
                }`}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Requests;
