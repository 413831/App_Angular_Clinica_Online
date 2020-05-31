import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Medico, Especialidad } from 'src/app/clases/Medico';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DialogMedicoComponent } from '../dialog-medico/dialog-medico.component';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-listado-medicos',
  templateUrl: './listado-medicos.component.html',
  styleUrls: ['./listado-medicos.component.css']
})
export class ListadoMedicosComponent implements OnInit {
  @Input() listado: Medico[];
  @Output() enviarMedico: EventEmitter<any> = new EventEmitter<any>();
  selection = new SelectionModel<Medico>(true, []);
  displayedColumns: string[] = ['nombre', 'especialidad', 'disponibilidad'];
  dataSource: MatTableDataSource<Medico>;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(public dialogRef: MatDialogRef<DialogMedicoComponent>,
              @Inject(MAT_DIALOG_DATA) public medico: Medico,
              public dialog: MatDialog) 
  {
    this.listado = JSON.parse(localStorage.getItem('medicos'));
    console.log(this.listado);
    this.dataSource = new MatTableDataSource(this.listado);
  }
   
  ngOnInit()
  {
    this.dataSource.sort = this.sort;
  }

  seleccionar(medico: Medico)
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = medico;
    dialogConfig.width = '400px';
    dialogConfig.height = '700px';
           
    const dialogRef = this.dialog.open(DialogMedicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
    this.enviarMedico.emit(medico);
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
