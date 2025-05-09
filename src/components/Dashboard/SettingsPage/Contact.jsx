import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Enviando datos:', formData);

      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Respuesta status:', response.status);

      // Intentar obtener el cuerpo de la respuesta para depuración
      const responseText = await response.text();
      console.log('Respuesta:', responseText);

      // Intentar parsear JSON si es posible
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Respuesta como JSON:', responseData);
      } catch (e) {
        console.log('La respuesta no es JSON válido');
      }

      if (response.ok) {
        setSuccess(true);
        setFormData({ subject: '', message: '' });
      } else {
        console.error('Error al enviar el mensaje:', responseText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='min-h-screen bg-[#111] text-black p-4'>
      <div className='bg-white rounded-lg p-5 max-w-md mx-auto'>
        {success ? (
          <div className='text-center py-8'>
            <div className='text-4xl text-[#6D28D9] mb-4'>✓</div>
            <h2 className='text-xl font-bold mb-2'>
              ¡Tu mensaje se ha enviado con éxito!
            </h2>
            <p className='text-gray-600 mb-6'>
              Permanece atento, nuestro equipo enviará una respuesta a tu correo
              a la brevedad.
            </p>
            <button
              onClick={() => navigate('/home')}
              className='bg-[#6D28D9] text-white py-3 px-6 rounded-lg w-full hover:bg-[#5a21b5] transition'
            >
              Volver a Home
            </button>
          </div>
        ) : (
          <>
            <div className='flex items-center mb-6'>
              <button
                onClick={() => navigate(-1)}
                className='mr-2 text-[#6D28D9]'
              >
                <IoChevronBack size={20} />
              </button>
              <h2 className='text-lg font-bold'>Contáctanos</h2>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='subject'
                  className='block text-gray-700 font-medium text-sm mb-1'
                >
                  Asunto
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#6D28D9]'
                  placeholder='Ingresa el asunto'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-gray-700 font-medium text-sm mb-1'
                >
                  Mensaje
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#6D28D9]'
                  placeholder='Ingresa el contenido de tu mensaje'
                  rows='6'
                  required
                ></textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-[#6D28D9] text-white py-3 rounded font-medium mt-4'
              >
                Enviar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
