import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { Paciente } from '../clases/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService extends MiservicioService{

  constructor() { 
    super();
  }

  public crear(paciente: Paciente)
  {
    this.database.ref('pacientes')
                 .push(paciente)
                .then(() => console.info("Alta exitosa"))
                .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Paciente[]
  {

    return null;
  }

  public actualizar(paciente: Paciente)
  {
    this.database.ref('pacientes/' + paciente.id)
                  .update(paciente)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number)
  {
    this.database.ref('pacientes/' + id)
                  .remove()
                  .then(() => console.info("Paciente eliminado"))
                  .catch(() => console.info("No se pudo realizar la baja."));
  }
}
