import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Paciente } from 'src/app/clases/Paciente';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogPacienteComponent } from '../dialog-paciente/dialog-paciente.component';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit {
  @Input() listado: Paciente[];
  selection = new SelectionModel<Paciente>(true, []);
  displayedColumns: string[] = ['nombre', 'especialidad', 'disponibilidad'];
  dataSource: MatTableDataSource<Paciente>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog) 
  {
    this.listado = JSON.parse(localStorage.getItem('pacientes'));
    console.log(this.listado);
    this.dataSource = new MatTableDataSource(this.listado);
  }

  ngOnInit(): void 
  {
    this.dataSource.sort = this.sort;
  }

  seleccionar(element: any)
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = element;
    dialogConfig.width = '400px';
    dialogConfig.height = '700px';
           
    const dialogRef = this.dialog.open(DialogPacienteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
