import { Usuario, Rol } from './Usuario';
import { Dia } from './Turno';


export enum Especialidad{
    General = 'General',
    Pediatría = 'Pediatría',
    Dermatología = 'Dermatología',
    Traumatología = 'Traumatología',
    Cardiología = 'Cardiología'
}

export class Medico extends Usuario
{
    public autorizado: boolean;
    public matricula: number;
    public consultorio: number;
    public especialidad: Especialidad[];      
    public diasAtencion: Dia[];
    public horasAtencion: string[];
    public static especialidades: Especialidad[] = [Especialidad.Cardiología, Especialidad.Dermatología,
                                Especialidad.General, Especialidad.Pediatría, Especialidad.Traumatología];
    
    public static CrearMedico(nombre: string, clave: string, dni: number, direccion: string,
                email: string, telefono: number,imagen: any,
                matricula: number, consultorio: number,
                diasAtencion: Dia[], horasAtencion: string[],
                especialidad: Especialidad[], avatar: string,id: string,autorizado? : boolean): Medico
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
        medico.especialidad = especialidad;
        medico.consultorio = consultorio;
        medico.diasAtencion = diasAtencion;
        medico.horasAtencion = horasAtencion;
        medico.avatar = avatar;
        medico.id = id;
        medico.rol = Rol.Medico;
        medico.autorizado = autorizado;

        return medico;
    }    
    
}
