import { Usuario, Rol } from './Usuario';
import { Dia } from './Turno';

export class Medico extends Usuario
{
    public autorizado: boolean;
    public matricula: number;
    public consultorio: number;
    public especialidad: Especialidad[];      
    public diasAtencion: Dia[];
    public horasAtencion: string[];
    
    public static CrearMedico(nombre: string, clave: string, dni: number, direccion: string,
                email: string, telefono: number,imagen: any,
                matricula: number, consultorio: number,
                diasAtencion: Dia[], horasAtencion: string[],
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
        medico.diasAtencion = diasAtencion;
        medico.horasAtencion = horasAtencion;
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