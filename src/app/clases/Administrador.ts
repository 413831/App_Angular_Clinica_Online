import { Usuario } from './Usuario';

export class Administrador extends Usuario{
    private avatar: string;

    public static CrearAdministrador(nombre: string, clave: string, dni: number, direccion: string,
        email: string, telefono: number,imagen: any, avatar: string,id: string): Administrador
    {
        let administrador = new Administrador();
        administrador.nombre = nombre;
        administrador.clave = clave;
        administrador.dni = dni;
        administrador.direccion = direccion;
        administrador.email = email;
        administrador.telefono = telefono;
        administrador.imagen = imagen;
        administrador.avatar = avatar;
        administrador.id = id;

        return administrador;
    }   

}