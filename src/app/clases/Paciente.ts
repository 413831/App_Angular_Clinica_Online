import { Usuario, Rol } from './Usuario';

export class Paciente extends Usuario{
    public obraSocial: string;
    public numeroAfiliado: number;
  
    public static CrearPaciente(nombre: string, clave: string, dni: number, direccion: string,
                    email: string, telefono: number,imagen: string, obraSocial: string,
                    numeroAfiliado: number, avatar: string, id: string ): Paciente
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
        paciente.avatar = avatar;
        paciente.id = id;
        paciente.rol = Rol.Paciente;
        
        return paciente;
    }
}