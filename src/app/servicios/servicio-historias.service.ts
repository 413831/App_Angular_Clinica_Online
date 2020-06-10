import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { database } from 'firebase';
import { Historia } from '../clases/Historia';

@Injectable({
  providedIn: 'root'
})
export class ServicioHistoriasService extends MiservicioService{

  constructor() 
  { 
    super();
    if(!database())    
    {
      super.init(); 
    }
  }

  public crear(historia)
  {
    database().ref('historias')
              .push()
              .then((snapshot) => historia.id = snapshot.key)
              .then(() => this.actualizar(historia))
              .catch(() => console.info("No se pudo realizar alta"));
  }

  public actualizar(historia)
  {
    database().ref('historias/' + historia.id)
                  .update(historia)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public leer():Historia[]
  {
    let historias ;                                                        
    console.info("Fetch de todas las historias");

    database().ref('historias').on('value',(snapshot) => {       
      historias = [];  
        snapshot.forEach((child) =>{
          var data = child.val();
          historias.push(Historia.CrearHistoria(data.id, data.idPaciente, data.paciente, data.sexo,
                                            data.consultas, data.adicionales));
        });
        console.info("Historias clinicas");
        console.log(historias);         
        localStorage.setItem('historias', JSON.stringify(historias));
    })
    return historias;
  }
}
