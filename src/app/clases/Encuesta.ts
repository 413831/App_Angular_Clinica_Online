import { Especialidad } from './Medico';

export class Encuesta
{
    idTurno: string;
    idPaciente: string;
    nombre: string;
    edad: number;
    sexo: string;
    fechaAtencion: string;
    especialidad: Especialidad;
    primeraAtencion: boolean;
    satisfaccion: number;
    frecuenciaAtencion: number;
    recomienda: boolean;
    medioComunicacion: string;
    educacion: string;
    
}