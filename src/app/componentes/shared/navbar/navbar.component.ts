import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Usuario } from 'src/app/clases/Usuario';
import { MiservicioService } from 'src/app/servicios/miservicio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario = null;

  public links = [
    { path: 'home', label: 'Inicio', icon: 'home', title: 'Página Principal' },
    { path: 'cartilla', label: 'Cartilla Médica', icon: 'medical_services', title: 'Listado de especialistas' },
    { path: 'turnos', label: 'Turnos', icon: 'event', title: 'Gestión de Turnos' },
    { path: 'contacto', label: 'Contacto', icon: 'support_agent', title: 'Sobre la Clínica' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUser();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkUser();
      }
    });
  }

  checkUser(): void {
    const raw = localStorage.getItem('usuario');
    if (raw && raw !== 'null') {
      try {
        this.usuario = JSON.parse(raw);
      } catch (e) {
        this.usuario = null;
      }
    } else {
      this.usuario = null;
    }
  }

  logout(): void {
    MiservicioService.cerrarSesion();
    this.usuario = null;
    this.router.navigate(['/home']);
  }
}

