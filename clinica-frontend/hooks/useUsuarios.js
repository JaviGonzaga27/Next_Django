import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/usuarioService';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const data = await getUsuarios();
            setUsuarios(data);
            setError(null);
        } catch (error) {
            setError(error.message || 'Ocurrió un error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const addUsuario = async (usuario) => {
        try {
            setLoading(true);
            const nuevoUsuario = await createUsuario(usuario);
            setUsuarios([...usuarios, nuevoUsuario]);
            return nuevoUsuario;
        } catch (error) {
            setError(error.message || 'Error al crear el usuario');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUsuarioHook = async (id, usuario) => {
        try {
            setLoading(true);
            const usuarioActualizado = await updateUsuario(id, usuario);
            setUsuarios(usuarios.map(u => u.id === id ? usuarioActualizado : u));
            return usuarioActualizado;
        } catch (error) {
            setError(error.message || 'Error al actualizar el usuario');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteUsuarioHook = async (id) => {
        try {
            setLoading(true);
            await deleteUsuario(id);
            setUsuarios(usuarios.filter(u => u.id !== id));
        } catch (error) {
            setError(error.message || 'Error al eliminar el usuario');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        usuarios, 
        loading, 
        error, 
        addUsuario, 
        updateUsuario: updateUsuarioHook, 
        deleteUsuario: deleteUsuarioHook, 
        refreshUsuarios: fetchUsuarios
    };
};