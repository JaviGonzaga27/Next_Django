import React, { useState, useEffect } from 'react';
import { getPacientes } from '../../services/pacienteService';
import { getDoctores } from '../../services/doctorService';

const CitaForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        paciente_id: '',
        doctor_id: '',
        fecha: '',
        duracion: '',
        motivo: '',
        estado: 'PROGRAMADA',
    });

    const [pacientes, setPacientes] = useState([]);
    const [doctores, setDoctores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pacientesData = await getPacientes();
                const doctoresData = await getDoctores();
                setPacientes(pacientesData);
                setDoctores(doctoresData);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();

        if (initialData) {
            setFormData({
                paciente_id: initialData.paciente.id,
                doctor_id: initialData.doctor.id,
                fecha: initialData.fecha,
                duracion: initialData.duracion,
                motivo: initialData.motivo,
                estado: initialData.estado,
            });
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
            paciente_id: '',
            doctor_id: '',
            fecha: '',
            duracion: '',
            motivo: '',
            estado: 'PROGRAMADA',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <select
                name="paciente_id"
                value={formData.paciente_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            >
                <option value="">Seleccione un paciente</option>
                {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                        {`${paciente.nombre} ${paciente.apellido}`}
                    </option>
                ))}
            </select>
            <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            >
                <option value="">Seleccione un doctor</option>
                {doctores.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                        {`Dr. ${doctor.usuario.first_name} ${doctor.usuario.last_name}`}
                    </option>
                ))}
            </select>
            <input
                type="datetime-local"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            <input
                type="number"
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                placeholder="Duración (minutos)"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                placeholder="Motivo de la cita"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            >
                <option value="PROGRAMADA">Programada</option>
                <option value="COMPLETADA">Completada</option>
                <option value="CANCELADA">Cancelada</option>
            </select>
            <div className="flex space-x-2">
                <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {initialData ? 'Actualizar' : 'Crear'} Cita
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

export default CitaForm;