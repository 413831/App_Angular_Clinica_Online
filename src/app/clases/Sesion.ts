export class Sesion
{
    id: string;
    idUsuario: string;
    nombreUsuario: string;
    fechaInicio : Date;
    fechaFin : Date;
    duracion : number;

    public static CrearSesion(idUsuario: string, nombreUsuario: string, fechaInicio: string,
                              id?: string, duracion?: number, fechaFin?: string)
    {
        let sesion = new Sesion();

        sesion.idUsuario = idUsuario;
        sesion.nombreUsuario = nombreUsuario;
        sesion.fechaInicio = new Date(fechaInicio);
        sesion.id = id ? id : null;
        sesion.duracion = duracion ? duracion : null;
        sesion.fechaFin = fechaFin ? new Date(fechaFin) : null;

        return sesion;
    }
}