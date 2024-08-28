import React, { useState } from "react";
import Layout from '../../components/Layout/Layout';
import PacienteList from '../../components/Pacientes/PacienteList';
import PacienteForm from '../../components/Pacientes/PacienteForm';
import { usePacientes } from "../../hooks/usePacientes";
import { getPaciente } from '../../services/pacienteService';
import { PlusIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const PacientesPage = () => {
    const { addPaciente, updatePaciente, deletePaciente } = usePacientes();
    const [editingPaciente, setEditingPaciente] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingPaciente, setViewingPaciente] = useState(null);

    const handleSubmit = async (paciente) => {
        try {
            if (editingPaciente) {
                await updatePaciente(editingPaciente.id, paciente);
                toast.success('Paciente actualizado con éxito');
            } else {
                await addPaciente(paciente);
                toast.success('Paciente agregado con éxito');
            }
            setEditingPaciente(null);
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Error al guardar el paciente');
        }
    };

    const handleEdit = (paciente) => {
        setEditingPaciente(paciente);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
            try {
                await deletePaciente(id);
                toast.success('Paciente eliminado con éxito');
            } catch (error) {
                toast.error('Error al eliminar el paciente');
            }
        }
    };

    const handleView = async (id) => {
        try {
            const paciente = await getPaciente(id);
            setViewingPaciente(paciente);
        } catch (error) {
            toast.error('Error al obtener los detalles del paciente');
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Pacientes</h1>
                    <button
                        onClick={() => { setIsModalOpen(true); setEditingPaciente(null); }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center"
                    >
                        <PlusIcon className="h-6 w-6 mr-2" />
                        Agregar Paciente
                    </button>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <PacienteList
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                </div>
            </div>

            {(isModalOpen || viewingPaciente) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
                    <div className="relative bg-white w-full max-w-md m-auto rounded-lg shadow-xl p-8">
                        {isModalOpen ? (
                            <>
                                <h2 className="text-3xl font-bold mb-6 text-center">
                                    {editingPaciente ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}
                                </h2>
                                <PacienteForm 
                                    onSubmit={handleSubmit} 
                                    initialData={editingPaciente}
                                    onCancel={() => setIsModalOpen(false)}
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold mb-6 text-center">Detalles del Paciente</h2>
                                <div className="space-y-4">
                                    <p className="text-lg"><strong>Nombre:</strong> {viewingPaciente.nombre}</p>
                                    <p className="text-lg"><strong>Apellido:</strong> {viewingPaciente.apellido}</p>
                                    <p className="text-lg"><strong>Fecha de Nacimiento:</strong> {new Date(viewingPaciente.fecha_nacimiento).toLocaleDateString()}</p>
                                    <p className="text-lg"><strong>Teléfono:</strong> {viewingPaciente.telefono}</p>
                                    <p className="text-lg"><strong>Dirección:</strong> {viewingPaciente.direccion}</p>
                                </div>
                                <button
                                    onClick={() => setViewingPaciente(null)}
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

export default PacientesPage;