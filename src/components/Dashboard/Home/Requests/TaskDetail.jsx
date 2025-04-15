import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TaskDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(
    location.state?.orderDetails || {}
  );

  useEffect(() => {
    // Log para depuración
    console.log('Datos originales:', orderDetails);

    if (orderDetails) {
      // Verifica si tenemos acceso a los datos que necesitamos
      console.log('categoria:', orderDetails.categoria);
      console.log('municipality:', orderDetails.billing_address?.municipality);
      console.log('address:', orderDetails.billing_address?.address);
    }
  }, [orderDetails]);

  return (
    <>
      <div className='flex flex-col min-h-screen bg-white'>
        <div className='flex-1 max-w-md w-full mx-auto bg-white pb-16'>
          <div className='p-4 border-b-1 border-[#DDE1E6] flex items-center'>
            <button className='mr-2' onClick={() => navigate(-1)}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className='h-6 w-6 text-[#714DBF]'
              />
            </button>
            <h1 className='text-lg font-bold'>
              {orderDetails.id ||
                orderDetails.orderId ||
                orderDetails._id ||
                'Detalles de solicitud'}
            </h1>
          </div>

          <div className='flex justify-around py-4'>
            <div className='flex flex-col items-center'>
              <div className='bg-[#714DBF] text-white p-3 rounded-full mb-1'>
                <FontAwesomeIcon icon={faFlag} className='h-6 w-6' />
              </div>
              <span className='text-xs'>Iniciar</span>
            </div>

            <div className='flex flex-col items-center'>
              <div className='bg-[#714DBF] text-white p-3 rounded-full mb-1'>
                <FontAwesomeIcon icon={faComment} className='h-6 w-6' />
              </div>
              <span className='text-xs'>Chat</span>
            </div>

            <div className='flex flex-col items-center'>
              <div className='bg-[#714DBF] text-white p-3 rounded-full mb-1'>
                <FontAwesomeIcon icon={faCamera} className='h-6 w-6' />
              </div>
              <span className='text-xs'>Subir foto</span>
            </div>

            <div className='flex flex-col items-center'>
              <div className='bg-[#CD4514] text-white p-3 rounded-full mb-1'>
                <FontAwesomeIcon icon={faCancel} className='h-6 w-6' />
              </div>
              <span className='text-xs'>Cancelar</span>
            </div>
          </div>

          <div className='p-4'>
            <h2 className='text-xl font-bold mb-3'>Información técnica</h2>
            <div className='bg-[#EAECF6] rounded-lg p-4'>
              <div className='space-y-1 mb-4'>
                <p>
                  <span className='font-medium'>Nombre cliente:</span>{' '}
                  {orderDetails.nombreCliente || 'No disponible'}
                </p>
                <p>
                  <span className='font-medium'>Comuna:</span>{' '}
                  {orderDetails.datosOriginales?.shipping_address
                    ?.municipality ||
                    orderDetails.datosOriginales?.billing_address
                      ?.municipality ||
                    orderDetails.comuna ||
                    'No disponible'}
                </p>
                <p>
                  <span className='font-medium'>Dirección:</span>{' '}
                  {orderDetails.datosOriginales?.shipping_address?.address ||
                    orderDetails.datosOriginales?.billing_address?.address ||
                    orderDetails.direccion ||
                    'No disponible'}
                </p>
                <p>
                  <span className='font-medium'>Teléfono:</span>{' '}
                  {orderDetails.telefono ||
                    orderDetails.customer?.phone ||
                    'No disponible'}
                </p>
                <p>
                  <span className='font-medium'>Pago:</span> $
                  {orderDetails.montoTotal ||
                    orderDetails.total ||
                    'No disponible'}
                </p>
              </div>

              <div className='mb-3'>
                <p className='font-medium'>
                  Tipo de trabajo:
                  <span className='bg-[#9BA5B7] px-3 py-1 rounded-full text-sm ml-2'>
                    {orderDetails.categoria || 'Especialidad'}
                  </span>
                </p>
              </div>

              <div>
                <p className='font-medium mb-1'>Detalle:</p>
                {orderDetails.productos?.length > 0 ? (
                  <ul className='list-disc pl-5 space-y-1'>
                    {orderDetails.productos.map((producto, index) => (
                      <li key={index}>{producto.name}</li>
                    ))}
                  </ul>
                ) : orderDetails.products?.length > 0 ? (
                  <ul className='list-disc pl-5 space-y-1'>
                    {orderDetails.products.map((producto, index) => (
                      <li key={index}>{producto.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-gray-500'>No hay detalles disponibles</p>
                )}
              </div>
            </div>
          </div>

          <div className='p-4'>
            <h2 className='text-xl font-bold'>Seguimiento</h2>
            {orderDetails.tracking_url ? (
              <div className='mt-2'>
                <a
                  href={orderDetails.tracking_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 underline'
                >
                  Ver seguimiento
                </a>
              </div>
            ) : (
              <p className='text-gray-500 mt-2'>
                No hay información de seguimiento disponible
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
