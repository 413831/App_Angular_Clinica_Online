import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';
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
  public campo: string;
  public valor: any;

  constructor() 
  { 
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if(this.usuario)
    {
      this.usuario = Object.assign(new Usuario, this.usuario);
    
      this.turnos = (JSON.parse(localStorage.getItem('turnos'))
                      .filter( turno => 
                      {
                        this.usuario.nombre == turno.nombrePaciente ||
                        this.usuario.nombre == turno.nombreMedico
                      }))
                      .map( turno => Object.assign(new Turno, turno));
    }
  }

  ngOnInit(): void {
    
    
  }


  filtrar()
  {
    // Busco los turnos con el campo ingresado en el buscador
    this.turnos = this.turnos.filter( () => Object.keys(this.turnos).includes(this.campo));
    // Busco los turnos con el valor ingresado en el buscador
    this.turnos = this.turnos.filter( () => Object.values(this.turnos).includes(this.valor));
  }
}
