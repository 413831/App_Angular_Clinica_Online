import { Especialidad } from './Medico';

export enum Estado
{
    Pendiente = "Pendiente", // Estado por default para alta de turno
    Cancelado = "Cancelado", // Estado definido por el medico o el pacientepara cancelar turno
    Rechazado = "Rechazado", // Estado definido por el medico para rechazar turno pendiente
    Aceptado = "Aceptado", // Estado definido por el medico para confirmar turno pendiente
    Atendido = "Atendido" // Estado definido por el medico al dar presente del turno
}

export enum Dia
{
    Domingo,
    Lunes,
    Martes,
    Miercoles,
    Jueves,
    Viernes,
    Sabado
}

export class Turno
{
    public id: string;
    public detalle: string;
    public comentarios: string;
    public idPaciente: string;
    public idMedico: string;
    public nombrePaciente: string;
    public nombreMedico: string;
    public duracion: number;
    public estado: Estado;
    public fecha: string;
    public horario: string;
    public consultorio: number;
    public especialidad: Especialidad; 
    public modificado: boolean = false;
    public static horarios: string[] = ["8:00", "8:30" , "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", 
                                        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
                                        "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];
    public static dias: Dia[] = [Dia.Lunes, Dia.Martes, Dia.Miercoles, Dia.Jueves, Dia.Viernes, Dia.Sabado];
    public static atributosNativos : string[] = ['id','detalle','comentarios','idPaciente','idMedico',
                                                    'nombrePaciente','nombreMedico','duracion', 'estado',
                                                    'fecha','horario','consultorio','especialidad',
                                                    'modificado'];

    public static CrearTurno(nombrePaciente: string, nombreMedico: string, fecha: string, horario: string,
                                duracion: number, especialidad: Especialidad, consultorio: number,
                                detalle: string, estado: Estado, idPaciente: string, idMedico: string,
                                id: string, modificado?: boolean, comentarios?: string,...atributos): Turno
    {
        let turno = new Turno();   
        if(atributos)
        {                                                                                                                                                                                                                                           
            let extras = atributos.map( data => Object.entries(data)
                                                .filter(atributo => !this.atributosNativos.includes(atributo[0])))[0];
            extras.forEach( atributo => this.AgregarDato(turno, atributo[0], atributo[1]));
        }

        turno.nombrePaciente = nombrePaciente;
        turno.nombreMedico = nombreMedico;
        turno.fecha = fecha;
        turno.duracion = duracion;
        turno.especialidad = especialidad;
        turno.consultorio = consultorio;
        turno.detalle = detalle;
        turno.comentarios = comentarios;
        turno.estado = estado;
        turno.horario = horario;
        turno.id = id;
        turno.idPaciente = idPaciente;
        turno.idMedico = idMedico;
        turno.modificado = modificado;

        return turno;
    }

    public static AgregarDato(turno: Turno, key: string, value: any)
    {
        turno =  Object.defineProperty(turno, key, 
        {
            value: value,
            writable: true,
            enumerable: true,
        })
        return turno;
    }

    // Se parsean los dias de atencion de Dias a numero
    public static ParseDiasNumero(data: any)
    {
        Object.values(data).map(elemento => Object.entries(elemento).map(tuple => 
            {
                if(tuple[0] == "diasAtencion")
                {
        
                let dias = Array.of(elemento[tuple[0]]);
                let numeros: any = [];
                dias = Object.values(dias);
                dias.forEach(array => array.map(dia => numeros.push(Dia[dia])));

                elemento[tuple[0]] = numeros;
                }
            })
        );
    }

    // Se parsean los dias de atencion de numero a Dias
    public static ParseNumeroDias(data: any)
    {
        Object.values(data).map(elemento => Object.entries(elemento).map(tuple => 
            {
                if(tuple[0] == "diasAtencion")
                {
        
                let numeros = Array.of(elemento[tuple[0]]);
                let dias: any = [];
                numeros = Object.values(numeros);
                numeros.forEach(array => array.map(numero => dias.push(Dia[numero])));

                elemento[tuple[0]] = dias;
                }
            })
        );
    }

  
}

