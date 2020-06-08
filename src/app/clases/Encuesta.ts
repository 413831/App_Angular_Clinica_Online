import { Especialidad } from './Medico';

export class Encuesta
{
    nombre: string;
    edad: number;
    sexo: string;
    fechaAtencion: Date;
    especialidad: Especialidad;
    primeraAtencion: boolean;
    satisfaccion: number;
    frecuenciaAtencion: number;
    recomienda: boolean;
    medioComunicacion: string;
    
}