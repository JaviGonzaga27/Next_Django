import React, { useState } from 'react';
import { useDoctores } from '../../hooks/useDoctores';
import Layout from '../../components/Layout/Layout';
import DoctorList from '../../components/Doctores/DoctorList';
import DoctorForm from '../../components/Doctores/DoctorForm';

const DoctoresPage = () => {
    const { doctores, loading, error, addDoctor, updateDoctor, deleteDoctor } = useDoctores();
    const [editingDoctor, setEditingDoctor] = useState(null);

    const handleSubmit = async (doctor) => {
        if (editingDoctor) {
            await updateDoctor(editingDoctor.id, doctor);
        } else {
            await addDoctor(doctor);
        }
        setEditingDoctor(null);
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este doctor?')) {
            await deleteDoctor(id);
        }
    };

    if (loading) return <Layout><p>Cargando...</p></Layout>;
    if (error) return <Layout><p>Error: {error.message}</p></Layout>;

    return (
        <Layout>
            <h1>Doctores</h1>
            <DoctorForm onSubmit={handleSubmit} initialData={editingDoctor} />
            <DoctorList doctores={doctores} onEdit={handleEdit} onDelete={handleDelete} />
        </Layout>
    );
};

export default DoctoresPage;