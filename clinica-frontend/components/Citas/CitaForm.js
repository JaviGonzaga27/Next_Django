import React, { useState, useEffect } from 'react';

const CitaForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        paciente: '',
        doctor: '',
        fecha: '',
        duracion: '',
        motivo: '',
        estado: 'PROGRAMADA'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            paciente: '',
            doctor: '',
            fecha: '',
            duracion: '',
            motivo: '',
            estado: 'PROGRAMADA'
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                placeholder="ID del Paciente"
                required
            />
            <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                placeholder="ID del Doctor"
                required
            />
            <input
                type="datetime-local"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                placeholder="Duración (minutos)"
                required
            />
            <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                placeholder="Motivo de la cita"
                required
            />
            <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
            >
                <option value="PROGRAMADA">Programada</option>
                <option value="COMPLETADA">Completada</option>
                <option value="CANCELADA">Cancelada</option>
            </select>
            <button type="submit">{initialData ? 'Actualizar' : 'Crear'} Cita</button>
        </form>
    );
};

export default CitaForm;