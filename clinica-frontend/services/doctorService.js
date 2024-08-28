import api from './api'

export const getDoctores = async () => {
    const response = await api.get('/api/doctores/');
    return response.data;
};

export const getDoctor = async (id) => {
    const response = await api.get(`/api/doctores/${id}/`);
    return response.data;
};

export const createDoctor = async (doctor) => {
    try {
        const response = await api.post('/api/doctores/', doctor);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateDoctor = async (id, doctor) => {
    try {
        const response = await api.put(`/api/doctores/${id}/`, doctor);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteDoctor = async (id) => {
    try {
        await api.delete(`/api/doctores/${id}/`);
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