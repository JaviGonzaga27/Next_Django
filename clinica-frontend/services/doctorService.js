import api from './api'

export const getDoctores = async () => {
    const response = await api.get('/api/doctores/');
    return response.data;
};

export const createDoctor = async (doctor) => {
    const response = await api.post('/api/doctores/', doctor);
    return response.data;
};

export const updateDoctor = async (id, doctor) => {
    const response = await api.put(`/api/doctores/${id}`, doctor);
    return response.data;
};

export const deleteDoctor = async (id) => {
    await api.delete(`/api/doctores/${id}`);
};