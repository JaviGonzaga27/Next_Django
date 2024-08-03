import api from './api'

export const getUsuarios = async () => {
    const response = await api.get('/api/usuarios/');
    return response.data;
};

export const createUsuario = async (usuario) => {
    const response = await api.post('/api/usuarios/', usuario);
    return response.data;
};

export const updateUsuario = async (id, usuario) => {
    const response = await api.put(`/api/usuarios/${id}/`, usuario);
    return response.data;
};

export const deleteUsuario = async (id) => {
    await api.delete(`/api/usuarios/${id}/`);
};