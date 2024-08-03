import React from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';

const UsuarioList = () => {
    const {usuarios, loading, error} = useUsuarios();

    if(loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if(error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error.message}</span>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Lista de Usuarios</h2>
            <ul className="bg-white shadow-md rounded-lg overflow-hidden">
                {usuarios.map((usuario, index) => (
                    <li 
                        key={usuario.id}
                        className={`px-6 py-4 flex items-center space-x-4 ${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } hover:bg-gray-100 transition duration-150 ease-in-out`}
                    >
                        <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {usuario.username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {usuario.username}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsuarioList;