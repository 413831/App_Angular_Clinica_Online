import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Medico, Especialidad } from 'src/app/clases/Medico';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const MEDICOS: any[] = [
  { nombre: 'Pepito Marranos', imagen: 'FOTO', matricula: 12345, especialidad: Especialidad.General, disponibilidad: 'Mañana', consultorio: 1},
  { nombre: 'Maria de los Cascabeles', imagen: 'FOTO', matricula: 54321, especialidad: Especialidad.Dermatología, disponibilidad: 'Mañana', consultorio: 2},
  { nombre: 'Juan Perez', imagen: 'FOTO', matricula: 543523, especialidad: Especialidad.Traumatología, disponibilidad: 'Tarde', consultorio: 1},
  { nombre: 'Manuel Paredes', imagen: 'FOTO', matricula: 432154, especialidad: Especialidad.Cardiología, disponibilidad: 'Mañana', consultorio: 3},
  { nombre: 'Josefina Strauckbeer', imagen: 'FOTO', matricula: 546643, especialidad: Especialidad.General, disponibilidad: 'Tarde', consultorio: 2},
  { nombre: 'Ana Maria Angeles', imagen: 'FOTO', matricula: 585483, especialidad: Especialidad.Pediatría, disponibilidad: 'Tarde', consultorio: 1}
]

@Component({
  selector: 'app-listado-medicos',
  templateUrl: './listado-medicos.component.html',
  styleUrls: ['./listado-medicos.component.css']
})
export class ListadoMedicosComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  displayedColumns: string[] = ['nombre', 'imagen', 'matricula', 'especialidad', 'disponibilidad', 'consultorio'];
  dataSource = new MatTableDataSource(MEDICOS);
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
