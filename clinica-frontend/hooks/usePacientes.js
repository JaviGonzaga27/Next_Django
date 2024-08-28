import { useState, useEffect } from 'react';
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from '../services/pacienteService';

export const usePacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPacientes = async () => {
        try {
            setLoading(true);
            const data = await getPacientes();
            setPacientes(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPacientes();
    }, []);

    const addPaciente = async (paciente) => {
        try {
            const newPaciente = await createPaciente(paciente);
            setPacientes([...pacientes, newPaciente]);
        } catch (err) {
            setError(err);
        }
    };

    const updatePacienteHook = async (id, paciente) => {
        try {
            const updatedPaciente = await updatePaciente(id, paciente);
            setPacientes(pacientes.map(p => p.id === id ? updatedPaciente : p));
        } catch (err) {
            setError(err);
        }
    };

    const deletePacienteHook = async (id) => {
        try {
            await deletePaciente(id);
            setPacientes(pacientes.filter(p => p.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    return {
        pacientes,
        loading,
        error,
        addPaciente,
        updatePaciente: updatePacienteHook,
        deletePaciente: deletePacienteHook,
        refetch: fetchPacientes
    };
};