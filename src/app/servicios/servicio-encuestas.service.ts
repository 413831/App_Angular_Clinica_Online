import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { database } from 'firebase';
import { Encuesta } from '../clases/Encuesta';

@Injectable({
  providedIn: 'root'
})
export class ServicioEncuestasService extends MiservicioService{

  constructor() 
  { 
    super();
    // if(!database())    
    // {
    //   super.init(); 
    // }
  }

  public crear(encuesta): Promise<any>
  {
    return database().ref('encuestas')
              .push()
              .then((snapshot) => encuesta.id = snapshot.key)
              .then(() => this.actualizar(encuesta))
              .catch(() => console.info("No se pudo realizar alta"));
  }

  public actualizar(encuesta): Promise<any>
  {
    return database().ref('encuestas/' + encuesta.id)
                  .update(encuesta)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public leer():Encuesta[]
  {
    let encuestas;                                                        
    console.info("Fetch de todas las encuestas");

    database().ref('encuestas').on('value',(snapshot) => {       
        encuestas = [];  
        snapshot.forEach((child) =>{
          var data = child.val();
          encuestas.push(Encuesta.CrearEncuesta(data.id, data.idTurno, data.idPaciente, data.nombre,
                                            data.edad, data.sexo, data.fechaAtencion,
                                            data.especialidad, data.primeraAtencion,
                                            data.satisfaccion, data.frecuencia, data.recomienda,
                                            data.medioComunicacion, data.educacion));
        });
        console.info("Encuestas");
        console.log(encuestas);         
        localStorage.setItem('encuestas', JSON.stringify(encuestas));
    })
    return encuestas;
  }

}
