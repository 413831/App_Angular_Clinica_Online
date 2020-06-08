import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {
  @Input() turnos: any;
  @Output() seleccionar: EventEmitter<Turno> = new EventEmitter<Turno>();
  public dataTurnos;
  columnasTurnos: string[] = ['especialidad', 'estado' ,'fecha'];
  
  constructor() 
  {
    
  }

  ngOnInit(): void {
    console.log(this.turnos);
    this.dataTurnos = new MatTableDataSource(this.turnos);

  }

  seleccionarTurno(turno: Turno)
  {
    // Seleccionar turno para modificar
    this.seleccionar.emit(turno);
  }


}
