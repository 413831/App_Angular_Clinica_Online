import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { Medico } from '../clases/Medico';

@Injectable({
  providedIn: 'root'
})
export class ServicioMedicosService extends MiservicioService{

  constructor() { 
    super();
  }

  public crear(medico: Medico)
  {
    this.database.ref('medicos')
                  .push(medico)
                  .then(() => console.info("Alta exitosa"))
                  .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Medico
  {

    return null;
  }

  public actualizar(medico: Medico)
  {
    this.database.ref('medicos/' + medico.id)
                  .update(medico)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number)
  {
    this.database.ref('medicos/' + id)
                  .remove()
                  .then(() => console.info("Medico eliminado"))
                  .catch(() => console.info("No se pudo realizar la baja."));
  }
  
}
