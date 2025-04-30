import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BottomMenuAdmin from "../SupportBottomMenu/SupportBottomMenu";
import Icons from "../../ItemIconIndex";

const QuotesList = ({ limit }) => {
    const [quotes, setQuotes] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const mockQuotes = [
            {
                uid: "1",
                requestId: "#E9842Y1",
                clientRut: "12.345.678-9",
                total: "125.000",
                status: "pending",
                serviceType: "Gasfitería",
                createdAt: new Date()
            },
            {
                uid: "2",
                requestId: "#F2356M8",
                clientRut: "98.765.432-1",
                total: "85.500",
                status: "accepted",
                serviceType: "Electricidad",
                createdAt: new Date(Date.now() - 86400000)
            },
            {
                uid: "3",
                requestId: "#K7193P4",
                clientRut: "11.223.445-6",
                total: "210.000",
                status: "canceled",
                serviceType: "Pintura",
                createdAt: new Date(Date.now() - 172800000)
            },
            {
                uid: "4",
                requestId: "#L5029Q7",
                clientRut: "55.667.788-9",
                total: "75.000",
                status: "pending",
                serviceType: "Limpieza",
                createdAt: new Date(Date.now() - 259200000)
            }
        ];

        const sorted = mockQuotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQuotes(limit ? sorted.slice(0, limit) : sorted);
    }, [limit]);

    const filteredQuotes = quotes.filter(quote => {
        const matchesStatus = filterStatus === "all" || quote.status === filterStatus;
        const matchesSearch = quote.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.clientRut.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleClick = (uid) => {
        navigate(`/admin/presupuestos/${uid}`);
    };

    const renderStatusIcon = (status) => {
        const iconSrc = Icons[status] || Icons.default;
        return <img src={iconSrc} alt={status} className="w-5" />;
    };

    const renderServiceIcon = (serviceType) => {
        const iconSrc = Icons[serviceType] || Icons.default;
        return <img src={iconSrc} alt={serviceType} className="w-6" />;
    };

    return (
        <>
            <BottomMenuAdmin />
            <div className='flex flex-col min-h-screen bg-white items-center px-2'>
                <div className="border-b-2 border-gray-200 mb-3 pb-3 pt-4 w-full max-w-[360px]">
                    <div className="flex items-center gap-2 pl-2">
                        <img src={Icons.default} alt="Presupuestos" className="w-6 h-6" />
                        <h1 className="text-xl font-bold">Presupuestos</h1>
                    </div>
                </div>

                <div className='w-full max-w-[360px] space-y-2 px-2'>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className='w-full rounded-md p-2 text-sm border border-gray-300'
                    >
                        <option value='all'>Ver todos</option>
                        <option value='accepted'>Aprobados</option>
                        <option value='pending'>Pendientes</option>
                        <option value='canceled'>Rechazados</option>
                    </select>

                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Buscar por ID o RUT...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full p-2 pr-12 pl-3 border border-gray-300 rounded-md text-sm'
                        />
                        <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1'>
                            <img src={Icons.default} alt='filter' className='h-4 w-4 opacity-70' />
                        </div>
                    </div>
                </div>

                <div className='w-full max-w-[360px] px-2 pb-4 mt-2'>
                    <div className='space-y-2'>
                        <div className='grid grid-cols-[1fr_1fr_50px_50px_20px] gap-x-1 bg-white px-2 py-2 text-xs font-semibold text-left rounded-md'>
                            <div className="pl-1">ID Solicitud</div>
                            <div className='text-center'>RUT</div>
                            <div className='text-center'>Área</div>
                            <div className='text-center'>Estado</div>
                            <div></div>
                        </div>

                        {filteredQuotes.length > 0 ? (
                            filteredQuotes.map((quote) => (
                                <div
                                    key={quote.uid}
                                    className='bg-[#eaecf6] rounded-md cursor-pointer hover:bg-purple-100 transition h-[44px] flex items-center px-2'
                                    onClick={() => handleClick(quote.uid)}
                                >
                                    <div className='grid grid-cols-[1fr_1fr_50px_50px_20px] gap-x-1 w-full items-center text-xs'>
                                        <div className='truncate whitespace-nowrap pl-1 font-medium'>
                                            {quote.requestId}
                                        </div>
                                        <div className='truncate whitespace-nowrap text-gray-600 text-center'>
                                            {quote.clientRut}
                                        </div>
                                        <div className="flex justify-center">
                                            {renderServiceIcon(quote.serviceType)}
                                        </div>
                                        <div className="flex justify-center">
                                            {renderStatusIcon(quote.status)}
                                        </div>
                                        <div className='flex justify-end'>
                                            <ChevronRight className="text-[#714dbf] w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='bg-[#eaecf6] rounded-md p-3 text-center'>
                                <p className="text-gray-500 text-sm">
                                    {searchTerm ? 'No se encontraron resultados' : 'No hay presupuestos registrados'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuotesList;