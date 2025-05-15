import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export const useOrders = (fetchOrders) => {
    const auth = getAuth();
    const [orders, setOrders] = useState([]);
    const [acceptedOrders, setAcceptedOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchOrders();
                const currentUserUid = auth.currentUser?.uid;

                const pendingOrders = data.filter(order => order.tomado === 'no');
                const acceptedOrdersList = data.filter(
                    order => order.tomado === 'si' && order.userId === currentUserUid
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
    }, [fetchOrders, auth.currentUser?.uid]);

    return { orders, acceptedOrders, loading, error, setOrders, setAcceptedOrders };
};