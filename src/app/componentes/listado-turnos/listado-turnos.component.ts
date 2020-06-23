import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {
  @Input() turnos: any;
  @Input() pages: number;
  @Input() filtro: string;
  @Output() seleccionar: EventEmitter<Turno> = new EventEmitter<Turno>();
  public dataTurnos;
  columnasTurnos: string[] = ['especialidad', 'estado' ,'fecha','horario'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() 
  {
    
  }

  ngOnInit(): void {
    console.log(this.turnos);
    this.dataTurnos = new MatTableDataSource(this.turnos);
    this.dataTurnos.paginator = this.paginator;

  }
  
  ngOnChanges(): void
  {
    this.dataTurnos = new MatTableDataSource(this.turnos);
    this.dataTurnos.filter = this.filtro;
  }

  seleccionarTurno(turno: Turno)
  {
    // Seleccionar turno para modificar
    this.seleccionar.emit(turno);
  }


}
