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
    if(!database())    
    {
      super.init(); 
    }
  }

  public crear(turno: Turno) : Promise<any>
  {
    return database().ref('turnos')
              .push()
              .then((snapshot) => turno.id = snapshot.key)
              .then(() => this.actualizar(turno))
              .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Turno[]
  {
    let turnos ;                                                        
    console.info("Fetch de todos los turnos");

    database().ref('turnos').on('value',(snapshot) => {       
        turnos = [];  
        snapshot.forEach((child) =>{
          var data = child.val();
          turnos.push(Turno.CrearTurno(data.nombrePaciente, data.nombreMedico,
                                        data.fecha, data.horario ,data.duracion, data.especialidad,
                                        data.consultorio, data.detalle, data.estado, data.idPaciente,
                                        data.idMedico ,child.key,
                                        data.modificado, data.comentarios, data));
        });
        console.info("Turnos");
        console.log(turnos);         
        localStorage.setItem('turnos', JSON.stringify(turnos));
    })
    return turnos;
  }

  public actualizar(turno: Turno): Promise<any>
  {
    return database().ref('turnos/' + turno.id)
                  .update(turno)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number): Promise<any>
  {
    return database().ref('turnos/' + id)
                  .remove()
                  .then(() => console.info("Baja de turno realizada."))
                  .catch(() => console.info("No se pudo realizar la baja."));  
  }
}
