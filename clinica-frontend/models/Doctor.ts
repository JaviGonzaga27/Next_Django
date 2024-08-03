export interface Doctor {
    id: number;
    usuario: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
    };
    especialidad: string;
    telefono: string;
    is_active: boolean;
}