import { Component, OnInit } from '@angular/core';
import { Estado, Turno } from 'src/app/clases/Turno';

@Component({
  selector: 'app-modificar-turno',
  templateUrl: './modificar-turno.component.html',
  styleUrls: ['./modificar-turno.component.css']
})
export class ModificarTurnoComponent implements OnInit {
  public turno: Turno;

  constructor() 
  {
    this.turno = JSON.parse(localStorage.getItem('nuevoTurno'));
  }

  ngOnInit(): void {
  }

  cambiarEstado(estado: Estado)
  {
    this.turno.estado = estado;
  }
}
