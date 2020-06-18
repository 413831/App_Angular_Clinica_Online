// Historia clinica de un paciente

import { Turno } from './Turno';


export class Historia 
{
    id: string;
    idPaciente: string;
    paciente: string;   
    consultas: Turno[] = [];
    adicionales: string[];

    public static CrearHistoria(id: string, idPaciente: string, paciente: string,
                                     consultas: Turno[], adicionales: string[])
    {
        let historia = new Historia();

        historia.id = id;
        historia.idPaciente = idPaciente;
        historia.paciente = paciente;
        historia.consultas = consultas;
        historia.adicionales = adicionales;

        return historia;
    }
    
}