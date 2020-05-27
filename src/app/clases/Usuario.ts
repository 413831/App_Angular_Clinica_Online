export class Usuario
{
    public id;
    public nombre: string;
    public clave: string;
    public dni: number;
    public direccion: string;
    public email: string;
    public telefono: number;
    public imagen: string;
    public avatar: string;
    public rol: Rol;

}


export enum Rol{
    Administrador = 1,
    Medico = 2,
    Paciente = 3
  }