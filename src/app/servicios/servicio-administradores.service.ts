import { Injectable } from '@angular/core';
import { MiservicioService } from './miservicio.service';
import { Administrador } from '../clases/Administrador';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService extends MiservicioService {

  constructor() { 
    super();
    // if(!database())    
    // {
    //   super.init(); 
    // }
  }

  public crear(administrador: Administrador): Promise<any>
  {
    return database().ref('administradores')
              .push()
              .then((snapshot) => administrador.id = snapshot.key)
              .then(() => this.actualizar(administrador))
              .catch(() => console.info("No se pudo realizar alta"));
  }

  public leer(): Administrador[]
  {
    let administradores = [];
    console.info("Fetch de todos los administradores");

    database().ref('administradores').on('value',(snapshot) => {          
        administradores = [];  
        snapshot.forEach((child) =>{
          var data = child.val();
          administradores.push(Administrador.CrearAdministrador(data.nombre, data.clave,
                                                data.dni, data.direccion, data.email,
                                                data.telefono, data.imagen, data.avatar, child.key ));
        });
        console.info("Fetch administradores");
        console.log(administradores);
        localStorage.setItem('administradores', JSON.stringify(administradores));
    })
    return administradores;
  }

  public actualizar(administrador: Administrador): Promise<any>
  {
    return database().ref('administradores/' + administrador.id)
                  .update(administrador)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number): Promise<any>
  {
    return database().ref('administradores/' + id)
                  .remove()
                  .then(() => console.info("administrador eliminado"))
                  .catch(() => console.info("No se pudo realizar la baja."));
  }
}
