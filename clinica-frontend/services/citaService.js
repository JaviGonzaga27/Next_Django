import api from './api'

export const getCitas = async (params = {}) => {
    const response = await api.get('/api/citas/', { params });
    return response.data;
};

export const getCita = async (id) => {
    const response = await api.get(`/api/citas/${id}/`);
    return response.data;
};

export const createCita = async (cita) => {
    try {
        const response = await api.post('/api/citas/', cita);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateCita = async (id, cita) => {
    try {
        const response = await api.put(`/api/citas/${id}/`, cita);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteCita = async (id) => {
    try {
        await api.delete(`/api/citas/${id}/`);
    } catch (error) {
        handleApiError(error);
    }
};

export const getEstadisticas = async () => {
    try {
        const response = await api.get('/api/citas/estadisticas/');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

const handleApiError = (error) => {
    if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        throw new Error(JSON.stringify(error.response.data));
    } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No se recibió respuesta del servidor');
    } else {
        console.error('Error message:', error.message);
        throw new Error('Error al configurar la petición');
    }
};