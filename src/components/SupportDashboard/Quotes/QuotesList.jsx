import BottomMenuAdmin from "../SupportBottomMenu/SupportBottomMenu";
import { FaSearch } from 'react-icons/fa';
import requestImg from '@assets/Vector.png';

const QuotesList = () => {
    return (
        <>
            <BottomMenuAdmin />
            <div className='flex flex-col min-h-screen bg-white'>
                {/* Encabezado */}
                <div className="border-b-2 border-gray-200 mb-5 pb-4 py-5 px-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img
                                src={requestImg}
                                alt="BudgetIcon"
                            />
                            <h1 className="text-2xl font-bold">Presupuestos</h1>
                        </div>
                    </div>
                </div>

                {/* Barra de búsqueda */}
                <div className='px-4 pb-2'>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            placeholder='Buscar presupuestos'
                            className='w-full p-2 pr-16 pl-4 border border-gray-300 rounded-md'
                        />
                        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                            <FaSearch className='text-gray-500 h-5 w-5' />
                        </div>
                    </div>
                </div>

                {/* Contenido principal - Puedes añadir tu lista de presupuestos aquí */}
                <div className="p-4 flex-1">
                    <div className="bg-[#EAECF6] rounded-lg p-8 text-center">
                        <p className="text-gray-600">Aquí se mostrarán los presupuestos</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuotesList;