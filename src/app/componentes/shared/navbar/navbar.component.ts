import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: Usuario;
 public links = [
  { path: 'home', label: "Home", title: "Principal"},
  { path: 'login', label: "Iniciar Sesión" , title: "Iniciar sesión"},
  { path: 'cartilla', label: "Cartilla", title: "Listado de médicos"},
  { path: 'turnos', label: "Turnos", title: "Turnos"},
  { path: 'contacto', label: "Contacto", title: "Sobre nosotros"},
  
 ];

  constructor() {
    
   }

  ngOnInit(): void {
    let usuario = JSON.parse(localStorage.getItem('usuario-logueado'));
    console.log(usuario);
    if(!usuario)
    {
      this.usuario = usuario;
    }
  }

}
