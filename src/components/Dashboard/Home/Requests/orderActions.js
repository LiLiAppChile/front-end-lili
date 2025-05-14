export const handleAcceptOrder = ({
    order,
    orders,
    acceptedOrders,
    setOrders,
    setAcceptedOrders,
    auth,
    API_URL,
    contextAcceptOrder,
}) => {
    return async () => {
        try {
            const res = await fetch(`${API_URL}/orders/accept/${order._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.accessToken}`,
                },
            });

            if (!res.ok) {
                throw new Error("Error al aceptar la orden");
            }

            const updatedOrders = orders.filter((o) => o._id !== order._id);
            setOrders(updatedOrders);
            setAcceptedOrders([...acceptedOrders, order]);

            if (contextAcceptOrder) {
                contextAcceptOrder(order);
            }

            console.log("Orden aceptada con éxito");
        } catch (error) {
            console.error("Error aceptando la orden:", error);
        }
    };
};

export const handleRejectOrder = ({
    order,
    orders,
    setOrders,
    auth,
    API_URL,
}) => {
    return async () => {
        try {
            const res = await fetch(`${API_URL}/orders/reject/${order._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.accessToken}`,
                },
            });

            if (!res.ok) {
                throw new Error("Error al rechazar la orden");
            }

            const updatedOrders = orders.filter((o) => o._id !== order._id);
            setOrders(updatedOrders);

            console.log("Orden rechazada con éxito");
        } catch (error) {
            console.error("Error rechazando la orden:", error);
        }
    };
};
