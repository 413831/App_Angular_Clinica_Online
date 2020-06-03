import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Medico, Especialidad } from 'src/app/clases/Medico';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DialogMedicoComponent } from '../dialog-medico/dialog-medico.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl } from '@angular/forms';
import { Dia, Turno } from 'src/app/clases/Turno';


@Component({
  selector: 'app-listado-medicos',
  templateUrl: './listado-medicos.component.html',
  styleUrls: ['./listado-medicos.component.css']
})
export class ListadoMedicosComponent implements OnInit {
  @Input() listado: Medico[];
  @Output() enviarMedico: EventEmitter<any> = new EventEmitter<any>();
  selection = new SelectionModel<Medico>(true, []);
  displayedColumns: string[] = ['nombre', 'especialidad', 'diasAtencion'];
  dataSource: MatTableDataSource<Medico>;
  /////
  filterValues = {};
  dias: Dia[] = Turno.dias;
  especialidades: string[] = ['pediatría', 'general', 'traumatología'];
  filterSelectObj = {};
  filterForm = new FormGroup(
  {
    dia: new FormControl(),
    especialidad: new FormControl(),
    nombre: new FormControl(),
  });
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
    
  constructor( public dialog: MatDialog, public listadoRef: MatDialogRef<ListadoMedicosComponent>) 
  {
    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'Apellido',
        columnProp: 'nombre',
        options: []
      }, {
        name: 'Especialidad',
        columnProp: 'especialidad',
        options: []
      }, {
        name: 'Dia',
        columnProp: 'dia',
        options: []
      }, 
    ]

  }
  
  ngOnInit()
  {    
    //this.dataSource.filterPredicate = this.createFilter();
    this.listado = JSON.parse(localStorage.getItem('medicos'));    
    this.dataSource = new MatTableDataSource(this.listado);
    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
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
      console.log('Dialogo medico cerrado.');
    });
    this.enviarMedico.emit(medico);
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  buscar(){
    let nombre = this.nombre.value ?  this.nombre.value : "";
    let especialidad = this.especialidad.value ?  this.especialidad.value : "";
    let dia = this.diaAtencion.value ?  this.diaAtencion.value : "";

    let filtro = {
      nombre: nombre,
      especialidad: especialidad,
      dia: dia
    }
    console.log(filtro);
    this.dataSource.filter = filtro.nombre;
    this.dataSource.filter = filtro.especialidad;
  }

  // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    console.log(filter);
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

   // Custom filter method fot Angular Material Datatable
   createFilter()
  {
    let filterFunction = function (data: any, filter: string): boolean 
    {
      let searchTerms = JSON.parse(filter);
      //searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      
      for (const col in searchTerms) 
      {
        if (searchTerms[col].toString() !== '') 
        {
          isFilterSet = true;
        }
        else 
        {
          delete searchTerms[col];
        }
      }
      
      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) 
        {
          for (const col in searchTerms) 
          {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => 
            {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) 
              {
                found = true
              }
            });
          }

          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  get diaAtencion() { return this.filterForm.get('dia'); }
  get nombre() { return this.filterForm.get('nombre'); }
  get especialidad() { return this.filterForm.get('especialidad'); }

}
