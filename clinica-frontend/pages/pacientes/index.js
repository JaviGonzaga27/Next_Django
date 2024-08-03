import React, { useState } from "react";
import { usePacientes } from "../../hooks/usePacientes";
import Layout from '../../components/Layout/Layout';
import PacienteList from '../../components/Pacientes/PacienteList';
import PacienteForm from '../../components/Pacientes/PacienteForm';

const PacientesPage = () => {
    const {pacientes, loading, error, addPaciente, updatePaciente, deletePaciente } = usePacientes()
    const [editingPaciente, setEditingPaciente] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (paciente) => {
        if (editingPaciente) {
            await updatePaciente(editingPaciente.id, paciente);
        } else {
            await addPaciente(paciente);
        }
        setEditingPaciente(null);
        setIsModalOpen(false);
    };

    const handleEdit = (paciente) => {
        setEditingPaciente(paciente);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
            await deletePaciente(id);
        }
    };

    if (loading) return (
        <Layout>
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </Layout>
    );

    if (error) return (
        <Layout>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error.message}</span>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Pacientes</h1>
                    <button 
                        onClick={() => {setIsModalOpen(true); setEditingPaciente(null);}}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Agregar Paciente
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Lista de Pacientes</h2>
                    </div>
                    <div className="p-6">
                        <PacienteList 
                            pacientes={pacientes} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete} 
                        />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {editingPaciente ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <PacienteForm onSubmit={handleSubmit} initialData={editingPaciente} />
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    id="ok-btn"
                                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default PacientesPage;