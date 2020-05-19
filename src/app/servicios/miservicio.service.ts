import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment'
import { Usuario } from '../clases/Usuario';

@Injectable({
  providedIn: 'root'
})
export class MiservicioService {
  protected database;
  protected inicializado: boolean = false;

  constructor() 
  {
    if(!firebase.app)
    {
      this.init();      
    }
  }

  public init()
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

  public iniciarSesion(usuario: Usuario) {
    localStorage.setItem("usuario-logueado", JSON.stringify(usuario));
  }

  public cerrarSesion() {
    localStorage.removeItem("usuario-logueado");
  }

  public guardarImagen(imagen: File)
  {
    let formData = new FormData();

    formData.append('image',imagen,imagen.name);
    console.log(formData.get('image'));
    console.log(formData);
     //firebase.storage().ref().child('imagen').putString
}
