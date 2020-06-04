import { Especialidad } from './Medico';

export enum Estado
{
    Pendiente = "Pendiente", // Estado por default para alta de turno
    Cancelado = "Cancelado", // Estado definido por el medico o el pacientepara cancelar turno
    Rechazado = "Rechazado", // Estado definido por el medico para rechazar turno pendiente
    Aceptado = "Aceptado", // Estado definido por el medico para confirmar turno pendiente
    Confirmado = "Confirmado" // Estado definido por el medico al dar presente del turno
}

export enum Dia
{
    Domingo,
    Lunes,
    Martes,
    Miercoles,
    Jueves,
    Viernes,
    Sabado
}

export class Turno
{
    public id: string;
    public detalle: string;
    public comentarios: string;
    public nombrePaciente: string;
    public nombreMedico: string;
    public duracion: number;
    public estado: Estado;
    public fecha: Date;
    public horario: string;
    public consultorio: number;
    public especialidad: Especialidad; 
    public static horarios: string[] = ["8:00", "8:30" , "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", 
                                        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
                                        "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];
    public static dias: Dia[] = [Dia.Lunes, Dia.Martes, Dia.Miercoles, Dia.Jueves, Dia.Viernes, Dia.Sabado];
    public modificado: boolean = false;

    public static CrearTurno(nombrePaciente: string, nombreMedico: string, fecha: Date, horario: string,
                                duracion: number, especialidad: Especialidad, consultorio: number,
                                detalle: string, estado: Estado, 
                                id?: string, modificado?: boolean, comentarios?: string ): Turno
    {
        let turno = new Turno();

        turno.nombrePaciente = nombrePaciente;
        turno.nombreMedico = nombreMedico;
        turno.fecha = fecha;
        turno.duracion = duracion;
        turno.especialidad = especialidad;
        turno.consultorio = consultorio;
        turno.detalle = detalle;
        turno.comentarios = comentarios;
        turno.estado = estado;
        turno.horario = horario;
        turno.id = id;
        turno.modificado = modificado;

        return turno;
    }
}

