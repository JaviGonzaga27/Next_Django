import React, { useState } from "react";
import Layout from '../../components/Layout/Layout';
import CitaList from '../../components/Citas/CitaList';
import CitaForm from '../../components/Citas/CitaForm';
import { useCitas } from "../../hooks/useCitas";
import { getCita } from '../../services/citaService';
import { PlusIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const CitasPage = () => {
    const { addCita, updateCita, deleteCita, refetchCitas } = useCitas();
    const [editingCita, setEditingCita] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingCita, setViewingCita] = useState(null);

    const handleSubmit = async (cita) => {
        try {
            if (editingCita) {
                await updateCita(editingCita.id, cita);
                toast.success('Cita actualizada con éxito');
            } else {
                await addCita(cita);
                toast.success('Cita agregada con éxito');
            }
            setEditingCita(null);
            setIsModalOpen(false);
            refetchCitas();
        } catch (error) {
            console.error('Error al guardar la cita', error);
            toast.error('Error al guardar la cita' + error.message);
        }
    };

    const handleEdit = (cita) => {
        setEditingCita(cita);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
            try {
                await deleteCita(id);
                toast.success('Cita eliminada con éxito');
                refetchCitas();
            } catch (error) {
                toast.error('Error al eliminar la cita');
            }
        }
    };

    const handleView = async (id) => {
        try {
            const cita = await getCita(id);
            setViewingCita(cita);
        } catch (error) {
            toast.error('Error al obtener los detalles de la cita');
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Citas</h1>
                    <button
                        onClick={() => { setIsModalOpen(true); setEditingCita(null); }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center"
                    >
                        <PlusIcon className="h-6 w-6 mr-2" />
                        Agregar Cita
                    </button>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CitaList
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                </div>
            </div>

            {(isModalOpen || viewingCita) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
                    <div className="relative bg-white w-full max-w-md m-auto rounded-lg shadow-xl p-8">
                        {isModalOpen ? (
                            <>
                                <h2 className="text-3xl font-bold mb-6 text-center">
                                    {editingCita ? 'Editar Cita' : 'Agregar Nueva Cita'}
                                </h2>
                                <CitaForm 
                                    onSubmit={handleSubmit} 
                                    initialData={editingCita}
                                    onCancel={() => setIsModalOpen(false)}
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold mb-6 text-center">Detalles de la Cita</h2>
                                <div className="space-y-4">
                                    <p className="text-lg"><strong>Paciente:</strong> {`${viewingCita.paciente.nombre} ${viewingCita.paciente.apellido}`}</p>
                                    <p className="text-lg"><strong>Doctor:</strong> {`Dr. ${viewingCita.doctor.usuario.first_name} ${viewingCita.doctor.usuario.last_name}`}</p>
                                    <p className="text-lg"><strong>Fecha:</strong> {viewingCita.fecha}</p>
                                    <p className="text-lg"><strong>Duración:</strong> {viewingCita.duracion} minutos</p>
                                    <p className="text-lg"><strong>Motivo:</strong> {viewingCita.motivo}</p>
                                    <p className="text-lg"><strong>Estado:</strong> {viewingCita.estado}</p>
                                </div>
                                <button
                                    onClick={() => setViewingCita(null)}
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

export default CitasPage;