import { Usuario, Rol } from './Usuario';

export class Medico extends Usuario
{
    public matricula: number;
    public consultorio: number;
    public disponibilidad: string;
    public especialidad: Especialidad[];      
    public autorizado: boolean;
    
    public static CrearMedico(nombre: string, clave: string, dni: number, direccion: string,
                email: string, telefono: number,imagen: any,
                matricula: number, consultorio: number,
                disponibilidad: string,
                especialidad: Especialidad[], avatar: string,id: string): Medico
    {
        let medico = new Medico();
        medico.nombre = nombre;
        medico.clave = clave;
        medico.dni = dni;
        medico.direccion = direccion;
        medico.email = email;
        medico.telefono = telefono;
        medico.imagen = imagen;
        medico.matricula = matricula;
        medico.consultorio = consultorio;
        medico.disponibilidad = disponibilidad;
        medico.especialidad = especialidad;
        medico.avatar = avatar;
        medico.id = id;
        medico.rol = Rol.Medico;
        medico.autorizado = false;

        return medico;
    }    
    
}

export enum Especialidad{
    General = 'General',
    Pediatría = 'Pediatría',
    Dermatología = 'Dermatología',
    Traumatología = 'Traumatología',
    Cardiología = 'Cardiología'
}