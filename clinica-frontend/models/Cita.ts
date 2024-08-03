export interface Cita {
    id: number;
    paciente: {
        id: number;
        nombre: string;
    };
    doctor: {
        id: number;
        usuario: {
            first_name: string;
            last_name: string;
        };
    };
    fecha: string;
    duracion: number;
    motivo: string;
    estado: 'PROGRAMADA' | 'COMPLETADA' | 'CANCELADA';
}