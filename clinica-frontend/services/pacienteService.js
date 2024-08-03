import api from './api'

export const getPacientes = async () => {
    const response = await api.get('/api/pacientes/');
    return response.data;
};

export const createPaciente = async (paciente) => {
    const response = await api.post('/api/pacientes/', paciente);
    return response.data;
};

export const updatePaciente = async (id, paciente) => {
    const response = await api.put(`/api/pacientes/${id}`, paciente);
    return response.data;
};

export const deletePaciente = async (id) => {
    await api.delete(`/api/pacientes/${id}`);
};