import { useState, useEffect } from 'react';
import { getUsuarios } from '../services/usuarioService';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const addUsuario = async (usuario) => {
        // Implementar lógica para añadir usuario
    };

    const updateUsuario = async (id, usuario) => {
        // Implementar lógica para actualizar usuario
    };

    const deleteUsuario = async (id) => {
        // Implementar lógica para eliminar usuario
    };

    return {usuarios, loading, error, addUsuario, updateUsuario, deleteUsuario};
};