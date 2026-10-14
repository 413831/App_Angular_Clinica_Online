import { Component, OnInit } from '@angular/core';
import { Usuario, Rol } from 'src/app/clases/Usuario';
import { Turno } from 'src/app/clases/Turno';
import { MockDataService } from 'src/app/servicios/mock-data.service';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  public usuario: Usuario;
  public turnos: Turno[] = [];
  public turno: Turno;
  public campo: string;
  public valor: any;
  public filtro: string;
  public isLoading: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.checkSession();
  }

  checkSession(): void {
    const raw = localStorage.getItem('usuario');
    if (raw && raw !== 'null') {
      try {
        this.usuario = Object.assign(new Usuario(), JSON.parse(raw));
        this.obtenerTurnos();
      } catch (e) {
        this.usuario = null;
      }
    } else {
      this.usuario = null;
    }
  }

  filtrar(event: Event) {
    this.filtro = this.valor;
  }

  obtenerTurnos() {
    this.isLoading = true;
    MockDataService.seedIfEmpty();

    setTimeout(() => {
      let turnosRaw: any[] = [];
      const raw = localStorage.getItem('turnos');
      if (raw && raw !== 'null') {
        try {
          turnosRaw = JSON.parse(raw);
        } catch (e) {
          turnosRaw = MockDataService.getMockTurnos();
        }
      } else {
        turnosRaw = MockDataService.getMockTurnos();
      }

      if (!this.usuario) {
        this.turnos = turnosRaw.map(t => Object.assign(new Turno(), t));
        this.isLoading = false;
        return;
      }

      switch (this.usuario.rol) {
        case Rol.Medico:
          this.turnos = turnosRaw
            .filter(t => this.usuario.id === t.idMedico || this.usuario.nombre === t.nombreMedico)
            .map(t => Object.assign(new Turno(), t));
          if (this.turnos.length === 0) {
            this.turnos = turnosRaw.map(t => Object.assign(new Turno(), t));
          }
          break;
        case Rol.Paciente:
          this.turnos = turnosRaw
            .filter(t => this.usuario.id === t.idPaciente || this.usuario.nombre === t.nombrePaciente)
            .map(t => Object.assign(new Turno(), t));
          if (this.turnos.length === 0) {
            this.turnos = turnosRaw.map(t => Object.assign(new Turno(), t));
          }
          break;
        case Rol.Administrador:
        default:
          this.turnos = turnosRaw.map(t => Object.assign(new Turno(), t));
          break;
      }

      this.isLoading = false;
    }, 300);
  }

  seleccionarTurno(turno: Turno) {
    this.turno = turno;
  }

  loginDemo(perfil: 'paciente' | 'medico' | 'admin') {
    let targetUser: Usuario;
    if (perfil === 'paciente') {
      targetUser = MockDataService.getMockPacientes()[0];
    } else if (perfil === 'medico') {
      targetUser = MockDataService.getMockMedicos()[0];
    } else {
      targetUser = MockDataService.getMockAdministradores()[0];
    }

    MiservicioService.iniciarSesion(targetUser, this.appService).then(() => {
      this.checkSession();
    });
  }
}
