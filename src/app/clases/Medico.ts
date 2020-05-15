import { Usuario } from './Usuario';

export class Medico extends Usuario
{
    private _matricula: number;
    private _consultorio: number;
    private _disponibilidad: string;
    private _especialidades: Especialidad[];    
    
    constructor(nombre: string, clave: string, dni: number,
                email: string, telefono: number,imagen: any,
                matricula: number, consultorio: number,
                disponibilidad: string,
                especialidades: Especialidad[])
    {
        super(nombre,clave, dni, email, telefono, imagen);
        this.matricula = matricula;
        this.consultorio = consultorio;
        this.disponibilidad = disponibilidad;
        this.especialidades = especialidades;
    }
    
    public get matricula(): number {
        return this._matricula;
    }
    public set matricula(value: number) {
        this._matricula = value;
    }

    public get consultorio(): number {
        return this._consultorio;
    }
    public set consultorio(value: number) {
        this._consultorio = value;
    }

    public get disponibilidad(): string {
        return this._disponibilidad;
    }
    public set disponibilidad(value: string) {
        this._disponibilidad = value;
    }
    
    public get especialidades(): Especialidad[] {
        return this._especialidades;
    }
    public set especialidades(value: Especialidad[]) {
        this._especialidades = value;
    }
}

export enum Especialidad{
    General,
    Pediatría,
    Dermatología,
    Traumatología,
    Cardiología
}