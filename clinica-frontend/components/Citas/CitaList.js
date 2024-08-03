import React from 'react';
import { useCitas } from '../../hooks/useCitas';

const CitaList = () => {
    const {citas, loading, error} = useCitas();

    if(loading) return <p>Cargando...</p>;
    if(error) return <p>Ha ocurrido un error. Error: {error.message}</p>;

    return (
        <ul>
            {citas.map(cita => (
                <li key={cita.id}>
                    {cita.paciente.nombre} con Dr. {cita.doctor.usuario.get_full_name()} el {new Date(cita.fecha).toLocaleString()}
                </li>
            ))}
        </ul>
    );
};

export default CitaList;