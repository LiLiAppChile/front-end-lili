export const acceptOrderService = async (order, API_URL, auth, contextAcceptOrder) => {
    try {
        await contextAcceptOrder(order);
    } catch (contextError) {
        console.log('Error en contextAcceptOrder, intentando directamente con API:', contextError);
        const token = await auth.currentUser?.getIdToken();
        if (!token) throw new Error('No se pudo obtener el token de autenticación');

        const response = await fetch(`${API_URL}/pedidos/${order.id || order._id}/tomar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Error al aceptar: ${response.status} ${response.statusText}`;
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.message && !errorJson.message.includes('ya tiene el campo "tomado" en "si"')) {
                    errorMessage += ` - ${errorJson.message}`;
                    throw new Error(errorMessage);
                }
            } catch {
                throw new Error(errorMessage);
            }
        }
    }
};

export const rejectOrderService = async (order, API_URL, auth, contextRejectOrder) => {
    try {
        await contextRejectOrder(order);
    } catch (contextError) {
        console.log('Error en contextRejectOrder, intentando directamente con API:', contextError);
        const token = await auth.currentUser?.getIdToken();
        if (!token) throw new Error('No se pudo obtener el token de autenticación');

        const response = await fetch(`${API_URL}/pedidos/${order.id || order._id}/desmarcar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Error al rechazar: ${response.status} ${response.statusText}`;
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.message && !errorJson.message.includes('ya tiene el campo "tomado" en "no"')) {
                    errorMessage += ` - ${errorJson.message}`;
                    throw new Error(errorMessage);
                }
            } catch {
                throw new Error(errorMessage);
            }
        }
    }
};