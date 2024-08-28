import React, { useState, useEffect } from 'react';

const UsuarioForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        is_active: true,
        password: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Limpiar error cuando el usuario comienza a escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = 'El nombre de usuario es requerido';
        if (!formData.email) formErrors.email = 'El email es requerido';
        if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email inválido';
        if (!formData.first_name) formErrors.first_name = 'El nombre es requerido';
        if (!formData.last_name) formErrors.last_name = 'El apellido es requerido';
        if (!formData.password) formErrors.password = 'La contraseña es requerida';
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            onSubmit(formData);
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Nombre de usuario
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    Nombre
                </label>
                <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.first_name && <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>}
            </div>
            <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Apellido
                </label>
                <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.last_name && <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="is_active"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                    Activo
                </label>
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {initialData ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        </form>
    );
};

export default UsuarioForm;