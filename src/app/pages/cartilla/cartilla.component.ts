import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ListadoMedicosComponent } from 'src/app/componentes/listado-medicos/listado-medicos.component';
import { ArchivosService } from 'src/app/servicios/archivos.service';
import { Turno, Dia } from 'src/app/clases/Turno';
import { DialogMedicoComponent } from 'src/app/componentes/dialog-medico/dialog-medico.component';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {
  @Input() listado: Medico[];
  @Output() enviarMedico: EventEmitter<any> = new EventEmitter<any>();
  @Output() enviarListado: EventEmitter<any> = new EventEmitter<any>();
  selection = new SelectionModel<Medico>(true, []);
  displayedColumns: string[] = ['nombre', 'especialidad', 'diasAtencion'];
  dataSource: MatTableDataSource<Medico>;
  filterValues = {};
  filterSelectObj = {};
  filterForm = new FormGroup(
  {
    nombre: new FormControl(),
    especialidad: new FormControl(),
    diasAtencion: new FormControl()
  });

  @ViewChild('content', {static: false}) content: MatTable<Medico>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor( public dialog: MatDialog, public listadoRef: MatDialogRef<ListadoMedicosComponent>,
              private archivos: ArchivosService) 
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
        options: Medico.especialidades
      }, {
        name: 'Dia',
        columnProp: 'diasAtencion',
        options: Turno.dias.map(dia => Dia[dia])
      }, 
    ]

  }
  
  ngOnInit()
  {    
    //this.dataSource.filterPredicate = this.createFilter();
    // Solamente se muestran los medicos autorizados
    this.listado = (JSON.parse(localStorage.getItem('medicos')))
                    .filter(medico => medico.autorizado);    
    this.dataSource = new MatTableDataSource(this.listado);
    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.sort = this.sort;    
    this.dataSource.paginator = this.paginator;
  }

  seleccionar(medico: Medico)
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = medico;
    dialogConfig.width = '400px';
    dialogConfig.height = '500px';
           
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
    let dia = this.diasAtencion.value ?  this.diasAtencion.value : "";

    let filtro = {
      nombre: nombre,
      especialidad: especialidad,
      dia: dia
    }
    console.log(filtro);
    this.dataSource.filter = filtro.nombre;
    this.dataSource.filter = filtro.especialidad;
  }

  guardarExcel(): void
  {
    this.archivos.exportarExcel(this.dataSource.data, "cartilla");
  }

  guardarPDF(): void
  {
    this.archivos.exportarPDF(this.dataSource.data, "cartilla");
  }

  // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    console.log(event.target.value.trim().toLowerCase());
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  autocompleteChange(filter, event)
  {
    console.log(event.option.value);
    this.filterValues[filter.columnProp] = event.option.value
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
      console.log(searchTerms);
      
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

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) 
        {
          for (const col in searchTerms) 
          {          
            searchTerms[col].trim().split(",").forEach(word=> 
            {
              word = col == "diasAtencion" ? Dia[word] : word;

              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) 
              {
                found = true;
              }
            });
          }

          return found;
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }


  get diasAtencion() { return this.filterForm.get('diasAtencion'); }
  get nombre() { return this.filterForm.get('nombre'); }
  get especialidad() { return this.filterForm.get('especialidad'); }
}
