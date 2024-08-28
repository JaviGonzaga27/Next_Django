import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../../services/usuarioService';

const DoctorForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        usuario_id: '',
        especialidad: '',
        telefono: '',
        is_active: true,
    });

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error('Error fetching usuarios', error);
            }
        };

        fetchUsuarios();

        if (initialData) {
            setFormData({
                usuario_id: initialData.usuario.id,
                especialidad: initialData.especialidad,
                telefono: initialData.telefono,
                is_active: initialData.is_active,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            usuario_id: '',
            especialidad: '',
            telefono: '',
            is_active: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <select
                name="usuario_id"
                value={formData.usuario_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            >
                <option value="">Seleccione un usuario</option>
                {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>
                        {`${usuario.first_name} ${usuario.last_name}`}
                    </option>
                ))}
            </select>
            <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                placeholder="Especialidad"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Activo</span>
            </label>
            <div className="flex space-x-2">
                <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {initialData ? 'Actualizar' : 'Crear'} Doctor
                </button>
                <button 
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default DoctorForm;