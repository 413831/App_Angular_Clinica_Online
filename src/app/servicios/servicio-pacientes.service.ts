import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { Paciente } from '../clases/Paciente';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PacientesService extends MiservicioService{

  constructor() { 
    super();
    if(!database())    
    {
      super.init(); 
    }
  }

  public crear(paciente: Paciente)
  {
    database().ref('pacientes')
                 .push(paciente)
                .then(() => console.info("Alta exitosa"))
                .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Paciente[]
  {
    let pacientes = [];
    console.info("Fetch de todos los pacientes");

    database().ref('pacientes').on('value',(snapshot) => {          
        snapshot.forEach((child) =>{
          var data = child.val();
          pacientes.push(Paciente.CrearPaciente(data._nombre, data.clave,
                                                data._dni, data._direccion, data._email,
                                                data._telefono, data._imagen, data._obraSocial,
                                                data._numeroAfiliado, data._avatar, child.key ));
        });
        console.log(pacientes);         
    })    
    return pacientes;
  }

  public actualizar(paciente: Paciente)
  {
    database().ref('pacientes/' + paciente.id)
                  .update(paciente)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number)
  {
    database().ref('pacientes/' + id)
                  .remove()
                  .then(() => console.info("Paciente eliminado"))
                  .catch(() => console.info("No se pudo realizar la baja."));
  }
}
