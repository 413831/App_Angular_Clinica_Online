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

  public crear(medico: Medico): Promise<any>
  {
    return database().ref('medicos')
                  .push()
                  .then((snapshot) => medico.id = snapshot.key)
                  .then(() => this.actualizar(medico))
                  .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Medico[]
  {
    let medicos = [];
    console.info("Fetch de todos los medicos");
    
    database().ref('medicos').on('value',(snapshot) => {
        medicos = [];
        snapshot.forEach((child) =>{
          var data = child.val();
          medicos.push(Medico.CrearMedico(data.nombre, data.clave,
                                          data.dni, data.direccion, data.email,
                                          data.telefono, data.imagen, data.matricula,
                                          data.consultorio, data.diasAtencion , data.horasAtencion,
                                          data.especialidad, data.avatar, child.key, data.autorizado ));
        });
        console.info("Fetch medicos");
        console.log(medicos);         
        localStorage.setItem('medicos', JSON.stringify(medicos));
    })
    return medicos;
  }

  public actualizar(medico: Medico): Promise<any>
  {
    return database().ref('medicos/' + medico.id)
                  .update(medico)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number): Promise<any>
  {
    return database().ref('medicos/' + id)
                  .remove()
                  .then(() => console.info("Medico eliminado"))
                  .catch(() => console.info("No se pudo realizar la baja."));
  }
  
}
