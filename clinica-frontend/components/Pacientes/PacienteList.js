import React from 'react';
import { usePacientes } from '../../hooks/usePacientes';

const PacienteList = () => {
    const {pacientes, loading, error} = usePacientes();

    if(loading) return <p>Cargando...</p>;
    if(error) return <p>Ha ocurrido un error. Error: {error.message}</p>;

    return (
        <ul>
            {pacientes.map(paciente => (
                <li key={paciente.id}>{paciente.nombre}</li>
            ))}
        </ul>
    );
};

export default PacienteList;