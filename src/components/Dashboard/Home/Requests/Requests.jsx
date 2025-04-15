import Navbar from '../../BottomMenu/BottomMenu';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import aguaImg from '../../../../assets/requests/agua.png'; // Ruta para Gasfitería
import electricidadImg from '../../../../assets/requests/electricidad.png'; // Ruta para Electricidad

const Requests = () => {
  const navigate = useNavigate();
  useAuth();

  const [tabActivo, setTabActivo] = useState('pendientes');
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const ordersPerPage = 10; // Número de órdenes por página

  const bearerToken = import.meta.env.VITE_BEARER_TOKEN; // Obtener el token desde .env

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3001/pedidos', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerToken}`, // Usar el token desde .env
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [bearerToken]);

  const filteredOrders =
    tabActivo === 'pendientes'
      ? orders.filter((order) =>
          order.nombreCliente?.toLowerCase().includes(search.toLowerCase())
        )
      : acceptedOrders.filter((order) =>
          order.nombreCliente?.toLowerCase().includes(search.toLowerCase())
        );

  // Calcular las órdenes para la página actual
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatHour = (isoDate) => {
    if (!isoDate) return 'Hora no disponible';
    const date = new Date(isoDate);
    return date.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getImageForCategory = (category) => {
    switch (category) {
      case 'Gasfitería':
        return aguaImg;
      case 'Electricidad':
        return electricidadImg;
      default:
        return null; // Retorna null si no hay imagen disponible
    }
  };

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
          <button className='p-2 bg-gray-200 rounded-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 16l-4-4m0 0l4-4m-4 4h16'
              />
            </svg>
          </button>
        </div>
        <div className='flex flex-col bg-white pb-16'>
          {' '}
          {/* Contenedor principal */}
          {/* Contenido */}
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
                      className={`cursor-pointer ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } hover:bg-purple-100 transition`}
                      onClick={() =>
                        navigate('/details', {
                          state: { orderDetails: order },
                        })
                      }
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
            </div>
          </div>
          {/* Paginación */}
          <div className='mt-0 p-0 flex justify-center items-center gap-2 bg-white'>
            {' '}
            {/* Eliminé márgenes y padding adicionales */}
            {/* Botón Anterior */}
            <button
              className={`p-2 rounded-md flex items-center ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              <span className='ml-2'>Anterior</span>
            </button>
            {/* Números de página */}
            <div className='flex gap-1'>
              {' '}
              {/* Reducí el gap entre los números */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`p-2 rounded-md w-8 h-8 flex items-center justify-center ${
                    currentPage === index + 1
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {/* Botón Siguiente */}
            <button
              className={`p-2 rounded-md flex items-center ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className='mr-2'>Siguiente</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
