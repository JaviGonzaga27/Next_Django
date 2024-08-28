export interface Doctor {
    id: number;
    usuario: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
    };
    usuario_id?: number; // Para crear/actualizar
    especialidad: string;
    telefono: string;
    is_active: boolean;
}