import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { Turno } from '../clases/Turno';

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
    this.database.ref('turnos')
                  .push(turno)
                  .then(() => console.info("Alta exitosa"))
                  .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Turno[]
  {

    return null;
  }

  public actualizar(turno: Turno)
  {
    this.database.ref('turnos/' + turno.id)
                  .update(turno)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number)
  {
    this.database.ref('turnos/' + id)
                  .remove()
                  .then(() => console.info("Baja de turno realizada."))
                  .catch(() => console.info("No se pudo realizar la baja."));  
  }
}
