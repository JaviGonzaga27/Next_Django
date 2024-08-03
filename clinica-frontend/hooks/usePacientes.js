import { useState, useEffect } from 'react';
import { getPacientes } from '../services/pacienteService';

export const usePacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const data = await getPacientes();
                setPacientes(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    const addPaciente = async (paciente) => {

    };

    const updatePaciente = async (id, paciente) => {

    };

    const deletePaciente = async (id) => {

    };

    return {pacientes, loading, error, addPaciente, updatePaciente, deletePaciente};
};