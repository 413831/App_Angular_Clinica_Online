import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiservicioService } from './miservicio.service';
import { database } from 'firebase';
import { Historia } from '../clases/Historia';
import { Sesion } from '../clases/Sesion';

@Injectable({
  providedIn: 'root'
})
export class AppService extends MiservicioService{

  constructor(private http: HttpClient) 
  {
    super();
  }

  sendToken(token){
    return this.http.post<any>("/token_validate", {recaptcha: token})
  }

  ///////////////////////////////////Datos de sesiones///////////////////////////////////////////

  cargarLogin(login: Sesion)
  {
    return database().ref(`logs/sesion/${login.idUsuario}`)
                    .push()
                    .then((snapshot) => login.id = snapshot.key)
                    .then(() => this.actualizarLogin(login))
                    .catch((error) => console.info("No se pudo realizar alta: " + error));
  }

  public actualizarLogin(login: Sesion): Promise<any>
  {
    return database().ref(`logs/sesion/${login.idUsuario}/${login.id}`)
                  .update(login)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public actualizarLogout(login: Sesion): Promise<any>
  {
    return database().ref('logs/sesion/' + login.id)
                  .update(login)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }


  getLoginData()
  {
    let loginData;
    let registros = [];  
    console.info("Datos de sesion");

    database().ref('logs/sesion/').on('value',(snapshot) => {       
      loginData = [];  
        snapshot.forEach((child) =>{
          child.forEach(element => {
            var data = element.val();
            loginData.push(Sesion.CrearSesion(data.idUsuario, data.nombreUsuario,              
                                                data.fechaInicio, data.id,
                                                data.duracion, data.fechaFin));            
          });            
        });
        console.info("Registros de sesiones");      
        localStorage.setItem('sesiones', JSON.stringify(loginData));
    })
    return loginData;
  }

 

}
