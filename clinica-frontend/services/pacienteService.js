import api from './api'

export const getPacientes = async () => {
    const response = await api.get('/pacientes');
    return response.data;
};

export const createPaciente = async (paciente) => {
    const response = await api.post('/pacientes', paciente);
    return response.data;
};

export const updatePaciente = async (id, paciente) => {
    const response = await api.put(`/pacientes/${id}`, paciente);
    return response.data;
};

export const deletePaciente = async (id) => {
    await api.delete(`/pacientes/${id}`);
};