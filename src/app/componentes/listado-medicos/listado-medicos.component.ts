import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { Medico, Especialidad } from 'src/app/clases/Medico';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DialogMedicoComponent } from '../dialog-medico/dialog-medico.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl } from '@angular/forms';
import { Dia, Turno } from 'src/app/clases/Turno';
import { MatPaginator } from '@angular/material/paginator';
import { ArchivosService } from 'src/app/servicios/archivos.service';

@Component({
  selector: 'app-listado-medicos',
  templateUrl: './listado-medicos.component.html',
  styleUrls: ['./listado-medicos.component.css']
})
export class ListadoMedicosComponent implements OnInit {
  @Input() listado: Medico[];
  @Input() pages: number;
  selection = new SelectionModel<Medico>(true, []);
  columnasMedicos: string[] = ['nombre', 'afiliado','obraSocial'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog) 
  {
    this.listado = JSON.parse(localStorage.getItem('medicos'));
    console.log(this.listado);
    this.dataSource = new MatTableDataSource(this.listado);
  }

  ngOnInit(): void 
  {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  seleccionar(element: any)
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = element;
    dialogConfig.width = '400px';
    dialogConfig.height = '700px';
           
    const dialogRef = this.dialog.open(DialogMedicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
