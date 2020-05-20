import { Especialidad } from './Medico';

export class Turno
{
    private _id: string;
    private _detalle: string;
    private _nombrePaciente: string;
    private _nombreMedico: string;
    private _duracion: number;
    private _estado: Estado;
    private _fecha: Date;
    private _consultorio: number;
    private _especialidad: Especialidad; 

    public static CrearTurno(nombrePaciente: string, nombreMedico: string, fecha: Date,
                                duracion: number, especialidad: Especialidad, consultorio: number,
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

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get nombrePaciente(): string {
        return this._nombrePaciente;
    }
    public set nombrePaciente(value: string) {
        this._nombrePaciente = value;
    }
    public get nombreMedico(): string {
        return this._nombreMedico;
    }
    public set nombreMedico(value: string) {
        this._nombreMedico = value;
    }
    public get fecha(): Date {
        return this._fecha;
    }
    public set fecha(value: Date) {
        this._fecha = value;
    }
    public get duracion(): number {
        return this._duracion;
    }
    public set duracion(value: number) {
        this._duracion = value;
    }
    public get especialidad(): Especialidad {
        return this._especialidad;
    }
    public set especialidad(value: Especialidad) {
        this._especialidad = value;
    }
    public get consultorio(): number {
        return this._consultorio;
    }
    public set consultorio(value: number) {
        this._consultorio = value;
    }
    public get detalle(): string {
        return this._detalle;
    }
    public set detalle(value: string) {
        this._detalle = value;
    }
    public get estado(): Estado {
        return this._estado;
    }
    public set estado(value: Estado) {
        this._estado = value;
    }
}

export enum Estado
{
    Pendiente = "Pendiente",
    Cancelado = "Cancelado",
    Sobreturno = "Sobreturno",
    Cambiado = "Cambiado"
}