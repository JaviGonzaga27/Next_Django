import { Doctor } from './Doctor';
import { Paciente } from './Paciente';

export interface Cita {
    id: number;
    paciente: Paciente;
    doctor: Doctor;
    fecha: string;
    duracion: number;
    motivo: string;
    estado: 'PROGRAMADA' | 'COMPLETADA' | 'CANCELADA';
}