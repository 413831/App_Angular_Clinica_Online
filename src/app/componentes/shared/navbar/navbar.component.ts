import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
  
  }

}
