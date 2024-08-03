import React, { useState, useEffect } from 'react';

const DoctorForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        usuario: '',
        especialidad: '',
        telefono: '',
        is_active: true
    });

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            usuario: '',
            especialidad: '',
            telefono: '',
            is_active: true
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                placeholder="ID del Usuario"
                required
            />
            <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                placeholder="Especialidad"
                required
            />
            <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                required
            />
            <label>
                <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                />
                Activo
            </label>
            <button type="submit">{initialData ? 'Actualizar' : 'Crear'} Doctor</button>
        </form>
    );
};

export default DoctorForm;