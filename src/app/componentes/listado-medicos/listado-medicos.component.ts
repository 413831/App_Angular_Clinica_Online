import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Medico, Especialidad } from 'src/app/clases/Medico';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DetalleMedicoComponent } from '../detalle-medico/detalle-medico.component';
import { SelectionModel } from '@angular/cdk/collections';


const MEDICOS: any[] = [
  { nombre: 'Pepito Marranos', imagen: '/imagenes/corona-4944191_1280.png', matricula: 12345, especialidad: [Especialidad.General , Especialidad.General], disponibilidad: 'Mañana', consultorio: 1},
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
  @Input() listado: Medico[];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<Medico>(true, []);
  displayedColumns: string[] = ['nombre', 'especialidad', 'disponibilidad'];
  dataSource: MatTableDataSource<Medico>;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(public dialog: MatDialog) 
  {
    this.listado = JSON.parse(localStorage.getItem('medicos'));
    console.log(this.listado);
    this.dataSource = new MatTableDataSource(this.listado);
  }
   
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  seleccionar(element: any)
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = element;
    dialogConfig.width = '400px';
    dialogConfig.height = '700px';
           
    const dialogRef = this.dialog.open(DetalleMedicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
