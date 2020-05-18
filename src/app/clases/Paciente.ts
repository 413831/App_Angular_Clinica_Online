import { Usuario } from './Usuario';

export class Paciente extends Usuario{
    private _obraSocial: string;
    private _numeroAfiliado: number;
    private _imagenDos: any;
  
    public static CrearPaciente(nombre: string, clave: string, dni: number, direccion: string,
                    email: string, telefono: number,imagen: any, obraSocial: string,
                    numeroAfiliado: number, avatar: any): Paciente
    {
        let paciente = new Paciente();

        paciente.nombre = nombre;
        paciente.clave = clave;
        paciente.dni = dni;
        paciente.direccion = direccion;
        paciente.email = email;
        paciente.telefono = telefono;
        paciente.imagen = imagen;
        paciente.obraSocial = obraSocial;
        paciente.numeroAfiliado = numeroAfiliado;
        paciente.imagenDos = avatar;

        return paciente;
    }

    public get obraSocial(): string {
        return this._obraSocial;
    }
    public set obraSocial(value: string) {
        this._obraSocial = value;
    }
   
    public get numeroAfiliado(): number {
        return this._numeroAfiliado;
    }
    public set numeroAfiliado(value: number) {
        this._numeroAfiliado = value;
    }
    public get imagenDos(): any {
        return this._imagenDos;
    }
    public set imagenDos(value: any) {
        this._imagenDos = value;
    }
    
}