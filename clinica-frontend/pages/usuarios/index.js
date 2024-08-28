import React, { useState } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import Layout from '../../components/Layout/Layout';
import UsuarioList from '../../components/Usuarios/UsuarioList';
import UsuarioForm from '../../components/Usuarios/UsuarioForm';
import { PlusIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const UsuariosPage = () => {
    const { usuarios, loading, error, addUsuario, updateUsuario, deleteUsuario, refreshUsuarios } = useUsuarios();
    const [editingUsuario, setEditingUsuario] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingUsuario, setViewingUsuario] = useState(null);

    const handleSubmit = async (usuario) => {
        try {
            if (editingUsuario) {
                await updateUsuario(editingUsuario.id, usuario);
                toast.success('Usuario actualizado con éxito');
            } else {
                await addUsuario(usuario);
                toast.success('Usuario creado con éxito');
            }
            setEditingUsuario(null);
            setIsModalOpen(false);
            refreshUsuarios();
        } catch (error) {
            toast.error(error.message || 'Ocurrió un error');
        }
    };

    const handleEdit = (usuario) => {
        setEditingUsuario(usuario);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await deleteUsuario(id);
                toast.success('Usuario eliminado con éxito');
                refreshUsuarios();
            } catch (error) {
                toast.error(error.message || 'Error al eliminar el usuario');
            }
        }
    };

    const handleView = (usuario) => {
        setViewingUsuario(usuario);
    };

    if (loading) return <Layout><div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div></Layout>;
    if (error) return <Layout><div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"><strong className="font-bold">Error:</strong> <span className="block sm:inline">{error}</span></div></Layout>;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Usuarios</h1>
                    <button 
                        onClick={() => {setIsModalOpen(true); setEditingUsuario(null);}}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 flex items-center"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Agregar Usuario
                    </button>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <UsuarioList usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
                </div>
            </div>

            {(isModalOpen || viewingUsuario) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="relative bg-white w-full max-w-md m-auto rounded-lg shadow-xl p-6">
                        {isModalOpen ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4 text-center">{editingUsuario ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
                                <UsuarioForm 
                                    onSubmit={handleSubmit} 
                                    initialData={editingUsuario} 
                                    onCancel={() => setIsModalOpen(false)}
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4 text-center">Detalles del Usuario</h2>
                                <div className="space-y-2">
                                    <p><strong>Username:</strong> {viewingUsuario.username}</p>
                                    <p><strong>Email:</strong> {viewingUsuario.email}</p>
                                    <p><strong>Nombre:</strong> {viewingUsuario.first_name}</p>
                                    <p><strong>Apellido:</strong> {viewingUsuario.last_name}</p>
                                    <p><strong>Estado:</strong> {viewingUsuario.is_active ? 'Activo' : 'Inactivo'}</p>
                                </div>
                                <button 
                                    onClick={() => setViewingUsuario(null)}
                                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
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

export default UsuariosPage;