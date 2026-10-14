import { Component, OnInit } from '@angular/core';
import { MiservicioService } from './servicios/miservicio.service';
import { slideInAnimation } from './animation';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './clases/Usuario';
import { MedicosService } from './servicios/servicio-medicos.service';
import { PacientesService } from './servicios/servicio-pacientes.service';
import { TurnosService } from './servicios/servicio-turnos.service';
import { AdministradoresService } from './servicios/servicio-administradores.service';
import { ServicioHistoriasService } from './servicios/servicio-historias.service';
import { ServicioEncuestasService } from './servicios/servicio-encuestas.service';
import { MockDataService } from './servicios/mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'clinica-online';
  public usuario: Usuario = null;

  constructor(
    private servicioMedicos: MedicosService,
    private servicioPacientes: PacientesService,
    private servicioTurnos: TurnosService,
    private servicioAdmin: AdministradoresService,
    private servicioHistoria: ServicioHistoriasService,
    private servicioEncuesta: ServicioEncuestasService
  ) {
    if (!MiservicioService.inicializado) {
      MiservicioService.init();
    }
    // Garantizar datos semilla inmediatos para evitar bloqueos por null
    MockDataService.seedIfEmpty();
  }

  ngOnInit(): void {
    this.refreshUser();
    this.syncFirebaseData();
  }

  refreshUser(): void {
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

  syncFirebaseData(): void {
    try {
      this.servicioMedicos.leer();
      this.servicioPacientes.leer();
      this.servicioTurnos.leer();
      this.servicioAdmin.leer();
      this.servicioHistoria.leer();
      this.servicioEncuesta.leer();
    } catch (error) {
      console.warn('Firebase sync offline or deferred, continuing with cached seed data.', error);
    }
  }

  preparedRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
