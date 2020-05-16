import { Usuario } from './Usuario';

export class Paciente extends Usuario{
    obraSocial: string;
    numeroAfiliado: number;
    imagenDos: any;
    
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
}