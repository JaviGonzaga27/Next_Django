import { useState, useEffect } from 'react';
import { getDoctores } from '../services/doctorService';

export const useDoctores = () => {
    const [doctores, setDoctores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const data = await getDoctores();
                setDoctores(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDoctores();
    }, []);

    const addDoctor = async (doctor) => {
        // Implementar lógica para añadir doctor
    };

    const updateDoctor = async (id, doctor) => {
        // Implementar lógica para actualizar doctor
    };

    const deleteDoctor = async (id) => {
        // Implementar lógica para eliminar doctor
    };

    return {doctores, loading, error, addDoctor, updateDoctor, deleteDoctor};
};