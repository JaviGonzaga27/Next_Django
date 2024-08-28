import { useState, useEffect, useCallback } from 'react';
import { getCitas, createCita, updateCita, deleteCita } from '../services/citaService';

export const useCitas = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCitas = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getCitas();
            setCitas(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCitas();
    }, [fetchCitas]);

    const addCita = async (cita) => {
        try {
            const newCita = await createCita(cita);
            setCitas(prevCitas => [...prevCitas, newCita]);
            return newCita;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateCitaHook = async (id, cita) => {
        try {
            const updatedCita = await updateCita(id, cita);
            setCitas(prevCitas => prevCitas.map(c => c.id === id ? updatedCita : c));
            return updatedCita;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteCitaHook = async (id) => {
        try {
            await deleteCita(id);
            setCitas(prevCitas => prevCitas.filter(c => c.id !== id));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return {
        citas,
        loading,
        error,
        addCita,
        updateCita: updateCitaHook,
        deleteCita: deleteCitaHook,
        refetchCitas: fetchCitas
    };
};