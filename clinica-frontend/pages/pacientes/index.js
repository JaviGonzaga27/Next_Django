import React from "react";
import Layout from '../../components/Layout';
import PacienteList from '../../components/Pacientes/PacienteList';

const PacientesPage = () => {
    return (
        <Layout>
            <h1>Pacientes</h1>
            <PacienteList />
        </Layout>
    );
};

export default PacientesPage;