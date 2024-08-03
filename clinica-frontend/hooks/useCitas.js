import { useState, useEffect } from 'react';
import { getCitas } from '../services/citaService';

export const useCitas = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const data = await getCitas();
                setCitas(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCitas();
    }, []);

    const addCita = async (cita) => {
        // Implementar lógica para añadir cita
    };

    const updateCita = async (id, cita) => {
        // Implementar lógica para actualizar cita
    };

    const deleteCita = async (id) => {
        // Implementar lógica para eliminar cita
    };

    return {citas, loading, error, addCita, updateCita, deleteCita};
};