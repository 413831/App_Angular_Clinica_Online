import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { Turno } from '../clases/Turno';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TurnosService extends MiservicioService{

  constructor() 
  { 
    super();
  }

  public crear(turno: Turno)
  {
    database().ref('turnos')
                  .push(turno)
                  .then(() => console.info("Alta exitosa"))
                  .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Turno[]
  {
    let turnos = [];
    console.info("Fetch de todos los medicos");

    database().ref('turnos').on('value',(snapshot) => {         
        snapshot.forEach((child) =>{
          var data = child.val();
          turnos.push(Turno.CrearTurno(data._nombrePaciente, data._nombreMedico,
                                          data._fecha, data._duracion, data._especialidad,
                                          data._consultorio, data._detalle, data._estado,child.key ));
        });
        console.log(turnos);         
    })
    return turnos;
  }

  public actualizar(turno: Turno)
  {
    database().ref('turnos/' + turno.id)
                  .update(turno)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number)
  {
    database().ref('turnos/' + id)
                  .remove()
                  .then(() => console.info("Baja de turno realizada."))
                  .catch(() => console.info("No se pudo realizar la baja."));  
  }
}
