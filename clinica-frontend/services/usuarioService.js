import api from './api'

export const getUsuarios = async () => {
    try {
        const response = await api.get('/api/usuarios/');
        return response.data;
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        throw error;
    }
};

export const createUsuario = async (usuario) => {
    try {
        const response = await api.post('/api/usuarios/', usuario);
        return response.data;
    } catch (error) {
        console.error('Error creating usuario:', error);
        throw error;
    }
};

export const updateUsuario = async (id, usuario) => {
    try {
        const response = await api.put(`/api/usuarios/${id}/`, usuario);
        return response.data;
    } catch (error) {
        console.error('Error updating usuario:', error);
        throw error;
    }
};

export const deleteUsuario = async (id) => {
    try {
        await api.delete(`/api/usuarios/${id}/`);
    } catch (error) {
        console.error('Error deleting usuario:', error);
        throw error;
    }
};

export const getUsuario = async (id) => {
    try {
        const response = await api.get(`/api/usuarios/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching usuario:', error);
        throw error;
    }
};