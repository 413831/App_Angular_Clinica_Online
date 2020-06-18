import { Component, OnInit, Input } from '@angular/core';
import { Usuario, Rol } from 'src/app/clases/Usuario';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { Turno, Estado } from 'src/app/clases/Turno';
import { Especialidad } from 'src/app/clases/Medico';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {  
  public usuario: Usuario;
  public turnos: Turno[];
  public turno: Turno;
  public campo: string;
  public valor: any;
  public filtro: string;

  constructor() 
  { 
    
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if(this.usuario)
    {
      this.usuario = Object.assign(new Usuario, this.usuario);
      //  Agregar validacion para llamar al servicio
      this.obtenerTurnos();
    }
    
  }


  filtrar(event: Event)
  {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    
    this.filtro = this.valor;
    
    console.log(this.turnos);
  }


  obtenerTurnos()
  {
    //  Agregar validacion para llamar al servicio
    switch(this.usuario.rol)
    {     
      case Rol.Medico: 
        this.turnos = (JSON.parse(localStorage.getItem('turnos'))
                      .filter( turno => this.usuario.id == turno.idMedico))
                      .map( turno => Object.assign(new Turno, turno));
        break;
      case Rol.Paciente:
        this.turnos = (JSON.parse(localStorage.getItem('turnos'))
                      .filter( turno => this.usuario.id == turno.idPaciente))
                      .map( turno => Object.assign(new Turno, turno));
        break;
      case Rol.Administrador:
          this.turnos = (JSON.parse(localStorage.getItem('turnos')))
                        .map( turno => Object.assign(new Turno, turno));
          break;
    }
  }

  seleccionarTurno(turno: Turno)
  {
    // Seleccionar turno para modificar
    this.turno = turno;
  }
}
