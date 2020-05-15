import { Usuario } from './Usuario';

export class Medico extends Usuario
{
    private _matricula: number;
    private _consultorio: number;
    private _disponibilidad: string;
    private _especialidad: Especialidad;    
   
    private _autorizado: boolean;

    constructor(nombre: string, clave: string, dni: number, direccion: string,
                email: string, telefono: number,imagen: any,
                matricula: number, consultorio: number,
                disponibilidad: string,
                especialidad: Especialidad)
    {
        super(nombre,clave, dni, direccion ,email, telefono,imagen);
        this.matricula = matricula;
        this.consultorio = consultorio;
        this.disponibilidad = disponibilidad;
        this.especialidad = especialidad;
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
  
    public get especialidad(): Especialidad {
        return this._especialidad;
    }
    public set especialidad(value: Especialidad) {
        this._especialidad = value;
    }
   

    public get autorizado(): boolean {
        return this._autorizado;
    }
    public set autorizado(value: boolean) {
        this._autorizado = value;
    }
    
}

export enum Especialidad{
    General,
    Pediatría,
    Dermatología,
    Traumatología,
    Cardiología
}