// Historia clinica de un paciente

import { Especialidad } from './Medico';

export interface Consulta
{
    especialidad: Especialidad,
    nombreMedico: string,
    matricula: string,
    fecha: Date,
    detalle: string
}

export class Historia 
{
    paciente: string;
    afiliado: number;
    edad: number;
    peso: number;
    altura: number;
    frecuenciaCardiaca: number;
    consultas: Consulta[];
    
}