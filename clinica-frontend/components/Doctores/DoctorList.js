import React from 'react';
import { useDoctores } from '../../hooks/useDoctores';

const DoctorList = () => {
    const {doctores, loading, error} = useDoctores();

    if(loading) return <p>Cargando...</p>;
    if(error) return <p>Ha ocurrido un error. Error: {error.message}</p>;

    return (
        <ul>
            {doctores.map(doctor => (
                <li key={doctor.id}>{doctor.usuario.get_full_name()} - {doctor.especialidad}</li>
            ))}
        </ul>
    );
};

export default DoctorList;