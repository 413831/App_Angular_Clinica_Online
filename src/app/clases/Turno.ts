import { Especialidad } from './Medico';

export class Turno
{
    id: string;
    nombrePaciente: string;
    nombreMedico: string;
    fecha: Date;
    duracion: number;
    especialidad: Especialidad;
    consultorio: number;
    detalle: string;
    estado: Estado;
}

export enum Estado
{
    Pendiente = "Pendiente",
    Cancelado = "Cancelado",
    Sobreturno = "Sobreturno",
    Cambiado = "Cambiado"
}