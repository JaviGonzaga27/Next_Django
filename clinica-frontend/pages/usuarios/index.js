import React, { useState } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import Layout from '../../components/Layout/Layout';
import UsuarioList from '../../components/Usuarios/UsuarioList';
import UsuarioForm from '../../components/Usuarios/UsuarioForm';

const UsuariosPage = () => {
    const { usuarios, loading, error, addUsuario, updateUsuario, deleteUsuario } = useUsuarios();
    const [editingUsuario, setEditingUsuario] = useState(null);

    const handleSubmit = async (usuario) => {
        if (editingUsuario) {
            await updateUsuario(editingUsuario.id, usuario);
        } else {
            await addUsuario(usuario);
        }
        setEditingUsuario(null);
    };

    const handleEdit = (usuario) => {
        setEditingUsuario(usuario);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            await deleteUsuario(id);
        }
    };

    if (loading) return <Layout><p>Cargando...</p></Layout>;
    if (error) return <Layout><p>Error: {error.message}</p></Layout>;

    return (
        <Layout>
            <h1>Usuarios</h1>
            <UsuarioForm onSubmit={handleSubmit} initialData={editingUsuario} />
            <UsuarioList usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
        </Layout>
    );
};

export default UsuariosPage;