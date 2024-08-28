import React, { useState } from "react";
import Layout from '../../components/Layout/Layout';
import DoctorList from '../../components/Doctores/DoctorList';
import DoctorForm from '../../components/Doctores/DoctorForm';
import { useDoctores } from "../../hooks/useDoctores";
import { getDoctor } from '../../services/doctorService';
import { PlusIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const DoctoresPage = () => {
    const { addDoctor, updateDoctor, deleteDoctor, refetchDoctores } = useDoctores();
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingDoctor, setViewingDoctor] = useState(null);

    const handleSubmit = async (doctor) => {
        try {
            if (editingDoctor) {
                await updateDoctor(editingDoctor.id, doctor);
                toast.success('Doctor actualizado con éxito');
            } else {
                await addDoctor(doctor);
                toast.success('Doctor agregado con éxito');
            }
            setEditingDoctor(null);
            setIsModalOpen(false);
            refetchDoctores();
        } catch (error) {
            toast.error('Error al guardar el doctor');
        }
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este doctor?')) {
            try {
                await deleteDoctor(id);
                toast.success('Doctor eliminado con éxito');
                refetchDoctores();
            } catch (error) {
                toast.error('Error al eliminar el doctor');
            }
        }
    };

    const handleView = async (id) => {
        try {
            const doctor = await getDoctor(id);
            setViewingDoctor(doctor);
        } catch (error) {
            toast.error('Error al obtener los detalles del doctor');
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Doctores</h1>
                    <button
                        onClick={() => { setIsModalOpen(true); setEditingDoctor(null); }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center"
                    >
                        <PlusIcon className="h-6 w-6 mr-2" />
                        Agregar Doctor
                    </button>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <DoctorList
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                </div>
            </div>

            {(isModalOpen || viewingDoctor) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
                    <div className="relative bg-white w-full max-w-md m-auto rounded-lg shadow-xl p-8">
                        {isModalOpen ? (
                            <>
                                <h2 className="text-3xl font-bold mb-6 text-center">
                                    {editingDoctor ? 'Editar Doctor' : 'Agregar Nuevo Doctor'}
                                </h2>
                                <DoctorForm 
                                    onSubmit={handleSubmit} 
                                    initialData={editingDoctor}
                                    onCancel={() => setIsModalOpen(false)}
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold mb-6 text-center">Detalles del Doctor</h2>
                                <div className="space-y-4">
                                    <p className="text-lg"><strong>Nombre:</strong> {viewingDoctor.usuario.first_name}</p>
                                    <p className="text-lg"><strong>Apellido:</strong> {viewingDoctor.usuario.last_name}</p>
                                    <p className="text-lg"><strong>Especialidad:</strong> {viewingDoctor.especialidad}</p>
                                    <p className="text-lg"><strong>Teléfono:</strong> {viewingDoctor.telefono}</p>
                                    <p className="text-lg"><strong>Estado:</strong> {viewingDoctor.is_active ? 'Activo' : 'Inactivo'}</p>
                                </div>
                                <button
                                    onClick={() => setViewingDoctor(null)}
                                    className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    Cerrar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default DoctoresPage;