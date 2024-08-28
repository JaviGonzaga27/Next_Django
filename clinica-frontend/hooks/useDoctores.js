import { useState, useEffect, useCallback } from 'react';
import { getDoctores, createDoctor, updateDoctor, deleteDoctor } from '../services/doctorService';

export const useDoctores = () => {
    const [doctores, setDoctores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDoctores = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getDoctores();
            setDoctores(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDoctores();
    }, [fetchDoctores]);

    const addDoctor = async (doctor) => {
        try {
            const newDoctor = await createDoctor(doctor);
            setDoctores(prevDoctores => [...prevDoctores, newDoctor]);
            return newDoctor;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateDoctorHook = async (id, doctor) => {
        try {
            const updatedDoctor = await updateDoctor(id, doctor);
            setDoctores(prevDoctores => prevDoctores.map(d => d.id === id ? updatedDoctor : d));
            return updatedDoctor;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteDoctorHook = async (id) => {
        try {
            await deleteDoctor(id);
            setDoctores(prevDoctores => prevDoctores.filter(d => d.id !== id));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return {
        doctores,
        loading,
        error,
        addDoctor,
        updateDoctor: updateDoctorHook,
        deleteDoctor: deleteDoctorHook,
        refetchDoctores: fetchDoctores
    };
};