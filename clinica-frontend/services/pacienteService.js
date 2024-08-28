import api from './api'

export const getPacientes = async () => {
    const response = await api.get('/api/pacientes/');
    return response.data;
};

export const getPaciente = async (id) => {
    const response = await api.get(`/api/pacientes/${id}/`);
    return response.data;
};

export const createPaciente = async (paciente) => {
    try {
        const response = await api.post('/api/pacientes/', paciente);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updatePaciente = async (id, paciente) => {
    try {
        const response = await api.put(`/api/pacientes/${id}/`, paciente);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deletePaciente = async (id) => {
    try {
        await api.delete(`/api/pacientes/${id}/`);
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