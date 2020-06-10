import { Especialidad } from './Medico';

export class Encuesta
{
    id: string;
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

    public static CrearEncuesta(id: string, idTurno: string, idPaciente: string, nombre: string,
                                edad: number, sexo: string, fechaAtencion: string,
                                especialidad: Especialidad, primeraAtencion: boolean,
                                satisfaccion: number, frecuencia: number, recomienda: boolean,
                                medioComunicacion: string, educacion: string): Encuesta
    {
        let encuesta = new Encuesta();

        encuesta.id = id;
        encuesta.idTurno = idTurno;
        encuesta.idPaciente = idPaciente;
        encuesta.nombre = nombre;
        encuesta.edad = edad;
        encuesta.sexo = sexo;
        encuesta.fechaAtencion = fechaAtencion;
        encuesta.especialidad = especialidad;
        encuesta.primeraAtencion = primeraAtencion;
        encuesta.satisfaccion = satisfaccion;
        encuesta.frecuenciaAtencion = frecuencia;
        encuesta.recomienda = recomienda;
        encuesta.medioComunicacion = medioComunicacion;
        encuesta.educacion = educacion;
        
        return encuesta;
    }
    
}