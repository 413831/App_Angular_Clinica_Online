import { Especialidad } from './Medico';

export class Turno
{
    public id: string;
    public detalle: string;
    public nombrePaciente: string;
    public nombreMedico: string;
    public duracion: number;
    public estado: Estado;
    public fecha: Date;
    public consultorio: number;
    public especialidad: Especialidad[]; 

    public static CrearTurno(nombrePaciente: string, nombreMedico: string, fecha: Date,
                                duracion: number, especialidad: Especialidad[], consultorio: number,
                                detalle: string, estado: Estado, id?: string ): Turno
    {
        let turno = new Turno();

        turno.nombrePaciente = nombrePaciente;
        turno.nombreMedico = nombreMedico;
        turno.fecha = fecha;
        turno.duracion = duracion;
        turno.especialidad = especialidad;
        turno.consultorio = consultorio;
        turno.detalle = detalle;
        turno.estado = estado;
        turno.id = id;

        return turno;
    }
}

export enum Estado
{
    Pendiente = "Pendiente",
    Cancelado = "Cancelado",
    Sobreturno = "Sobreturno",
    Cambiado = "Cambiado",
    Terminado = "Terminado"
}