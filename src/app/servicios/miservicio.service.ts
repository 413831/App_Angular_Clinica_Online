import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment'
import { Usuario } from '../clases/Usuario';
import { Sesion } from '../clases/Sesion';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class MiservicioService {
  public static imgSrc;
  protected static database;
  public static inicializado: boolean = false
  public static usuarioPrivado: Usuario = null;
  public usuarioPublico:Usuario;

  constructor() 
  {
    this.getUsuario(this);
    console.log(this.usuarioPublico);
  }

  public static init()
  {
    // var firebaseConfig = {
    //   apiKey: "AIzaSyCS42LNdtLkC3whUk1CcDIp07XDH7xYTMo",
    //   authDomain: "tp-clinica-online---labiv.firebaseapp.com",
    //   databaseURL: "https://tp-clinica-online---labiv.firebaseio.com",
    //   projectId: "tp-clinica-online---labiv",
    //   storageBucket: "tp-clinica-online---labiv.appspot.com",
    //   messagingSenderId: "859953441106",
    //   appId: "1:859953441106:web:4438a2d7a5b7d116fc328b",
    //   measurementId: "G-YGGBT9VCC2"
    // };
    // Initialize Firebase
    console.log("Se inicializa servicio para Firebase Database");
    firebase.initializeApp(environment.firebaseConfig);
    firebase.analytics();
    this.database = firebase.database();
    this.inicializado = true;
  }

  getUsuario(servicio : MiservicioService)
  {
    servicio.usuarioPublico = MiservicioService.usuarioPrivado;

    return servicio;
  }

  public static iniciarSesion(usuario: Usuario, servicio: AppService) : Promise<any>
  {
    // Llamar multiples servicios segun el usuario logueado ?
    let promesa = new Promise( (resolve,reject) => {
      console.log("Inicio de sesion");
      localStorage.setItem("usuario", JSON.stringify(usuario));
      MiservicioService.usuarioPrivado = usuario;
      
      let sesion = Sesion.CrearSesion( usuario.id, usuario.nombre, new Date().toString());
      servicio.cargarLogin(sesion).then(() => resolve(sesion.id) );
    });
    
    return promesa;
  }

  public static cerrarSesion(){
    localStorage.removeItem("usuario");
    MiservicioService.usuarioPrivado = null;

  }

  public static guardarImagen(imagen: string, base64string: string, usuario: string, dni: string)
  {
    // let formData = new FormData();
    // formData.append('image',imagen,imagen.name);
    let metadata = {
      contentType: 'image/jpeg',
      user : usuario,
      id : dni
    };
    console.log("Guardando imagen");
    return firebase.storage().ref().child('imagenes/'+imagen)
                    .putString( base64string, 'base64', metadata );            
  }

  public static descargarImagen(url: string)
  {
    this.imgSrc = '';

    return firebase.storage().ref().child(`${url}`).getDownloadURL()
                            .then((url)=> this.imgSrc = url)
                            .catch(error => console.error(error));
  }
}
