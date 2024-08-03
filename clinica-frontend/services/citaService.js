import api from './api'

export const getCitas = async () => {
    const response = await api.get('/api/citas/');
    return response.data;
};

export const createCita = async (cita) => {
    const response = await api.post('/api/citas/', cita);
    return response.data;
};

export const updateCita = async (id, cita) => {
    const response = await api.put(`/api/citas/${id}`, cita);
    return response.data;
};

export const deleteCita = async (id) => {
    await api.delete(`/citas/${id}`);
};

export const cancelarCita = async (id) => {
    const response = await api.post(`/api/citas/${id}/cancelar`);
    return response.data;
};

export const completarCita = async (id) => {
    const response = await api.post(`/citas/${id}/completar`);
    return response.data;
};