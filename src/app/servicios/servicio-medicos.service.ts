import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { Medico } from '../clases/Medico';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MedicosService extends MiservicioService{

  constructor() { 
    super();
    if(!database())    
    {
      super.init(); 
    }
  }

  public crear(medico: Medico)
  {
    database().ref('medicos')
                  .push(medico)
                  .then(() => console.info("Alta exitosa"))
                  .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Medico[]
  {
    let medicos = [];
    console.info("Fetch de todos los medicos");

    database().ref('medicos').on('value',(snapshot) => {         
        snapshot.forEach((child) =>{
          var data = child.val();
          medicos.push(Medico.CrearMedico(data._nombre, data.clave,
                                          data._dni, data._direccion, data._email,
                                          data._telefono, data._imagen, data._matricula,
                                          data._consultorio, data._disponibilidad ,
                                          data._especialidad, data._avatar, child.key ));
        });
        console.log(medicos);         
    })
    return medicos;
  }

  public actualizar(medico: Medico)
  {
    database().ref('medicos/' + medico.id)
                  .update(medico)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number)
  {
    database().ref('medicos/' + id)
                  .remove()
                  .then(() => console.info("Medico eliminado"))
                  .catch(() => console.info("No se pudo realizar la baja."));
  }
  
}
