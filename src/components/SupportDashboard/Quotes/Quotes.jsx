import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { ChevronRight } from "lucide-react";
import BottomMenuAdmin from "../SupportBottomMenu/SupportBottomMenu";

const QuotesList = ({ limit }) => {
    const { fetchPresupuestos } = useAuth();
    const [quotes, setQuotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarPresupuestos = async () => {
            const data = await fetchPresupuestos();
            const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setQuotes(limit ? sorted.slice(0, limit) : sorted);
        };

        cargarPresupuestos();
    }, [fetchPresupuestos, limit]);

    const handleClick = (uid) => {
        navigate(`/admin/presupuestos/${uid}`);
    };

    return (
        <>
            <BottomMenuAdmin />
            <div className="space-y-4">
                {quotes.map((quote) => (
                    <div
                        key={quote.uid}
                        onClick={() => handleClick(quote.uid)}
                        className="w-full bg-[#eaecf6] rounded-lg p-4 cursor-pointer flex items-center justify-between hover:shadow-md transition"
                    >
                        <div>
                            <h3 className="font-semibold text-lg">{quote.clientName || "Sin nombre"}</h3>
                            <p className="text-sm text-gray-600">RUT: {quote.clientRut || "No disponible"}</p>
                            <p className="text-sm text-gray-600 mt-1">Total: ${quote.total || "0"}</p>
                        </div>
                        <ChevronRight className="text-[#714dbf] w-6 h-6" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default QuotesList;
