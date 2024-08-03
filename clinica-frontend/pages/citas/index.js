import React, { useState } from 'react';
import { useCitas } from '../../hooks/useCitas';
import Layout from '../../components/Layout/Layout';
import CitaList from '../../components/Citas/CitaList';
import CitaForm from '../../components/Citas/CitaForm';

const CitasPage = () => {
    const { citas, loading, error, addCita, updateCita, deleteCita } = useCitas();
    const [editingCita, setEditingCita] = useState(null);

    const handleSubmit = async (cita) => {
        if (editingCita) {
            await updateCita(editingCita.id, cita);
        } else {
            await addCita(cita);
        }
        setEditingCita(null);
    };

    const handleEdit = (cita) => {
        setEditingCita(cita);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
            await deleteCita(id);
        }
    };

    if (loading) return <Layout><p>Cargando...</p></Layout>;
    if (error) return <Layout><p>Error: {error.message}</p></Layout>;

    return (
        <Layout>
            <h1>Citas</h1>
            <CitaForm onSubmit={handleSubmit} initialData={editingCita} />
            <CitaList citas={citas} onEdit={handleEdit} onDelete={handleDelete} />
        </Layout>
    );
};

export default CitasPage;