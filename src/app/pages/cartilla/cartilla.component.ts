import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
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
import { MockDataService } from 'src/app/servicios/mock-data.service';
import { Router } from '@angular/router';

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
  displayedColumns: string[] = ['avatar', 'nombre', 'especialidad', 'diasAtencion', 'consultorio', 'acciones'];
  dataSource: MatTableDataSource<Medico>;
  public isLoading: boolean = true;
  filterValues: any = {};
  filterSelectObj: any[] = [];
  filterForm = new FormGroup({
    nombre: new FormControl(''),
    especialidad: new FormControl(''),
    diasAtencion: new FormControl('')
  });

  @ViewChild('content', { static: false }) content: MatTable<Medico>;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }
  private paginator: MatPaginator;
  private sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public listadoRef: MatDialogRef<ListadoMedicosComponent>,
    private archivos: ArchivosService,
    private router: Router
  ) {
    this.filterSelectObj = [
      {
        name: 'Profesional',
        columnProp: 'nombre',
        placeholder: 'Buscar por nombre o apellido...',
        icon: 'person_search'
      },
      {
        name: 'Especialidad',
        columnProp: 'especialidad',
        placeholder: 'Seleccionar especialidad',
        options: Medico.especialidades,
        icon: 'medical_services'
      },
      {
        name: 'Día de Atención',
        columnProp: 'diasAtencion',
        placeholder: 'Seleccionar día',
        options: Turno.dias.map(dia => Dia[dia]),
        icon: 'today'
      }
    ];
  }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.isLoading = true;
    let medicos: Medico[] = [];
    const raw = localStorage.getItem('medicos');

    if (raw && raw !== 'null') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          medicos = parsed.filter(m => m.autorizado);
        }
      } catch (e) {
        medicos = [];
      }
    }

    if (medicos.length === 0) {
      medicos = MockDataService.getMockMedicos().filter(m => m.autorizado);
      localStorage.setItem('medicos', JSON.stringify(MockDataService.getMockMedicos()));
    }

    this.listado = medicos;
    this.dataSource = new MatTableDataSource(this.listado);
    this.dataSource.filterPredicate = this.createFilter();

    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
      this.isLoading = false;
    }, 450);
  }

  seleccionar(medico: Medico) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = medico;
    dialogConfig.width = '420px';
    dialogConfig.maxWidth = '95vw';

    const dialogRef = this.dialog.open(DialogMedicoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialogo medico cerrado.');
    });
    this.enviarMedico.emit(medico);
  }

  pedirTurno(medico: Medico, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/turnos']);
  }

  resetFiltros() {
    this.filterForm.reset({
      nombre: '',
      especialidad: '',
      diasAtencion: ''
    });
    this.filterValues = {};
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
  }

  guardarExcel(): void {
    if (this.dataSource && this.dataSource.data) {
      this.archivos.exportarExcel(this.dataSource.data, 'cartilla_medica');
    }
  }

  guardarPDF(): void {
    if (this.dataSource && this.dataSource.data) {
      this.archivos.exportarPDF(this.dataSource.data, 'cartilla_medica');
    }
  }

  filterChange(filter: any, event: any) {
    const val = event.target ? event.target.value.trim().toLowerCase() : '';
    this.filterValues[filter.columnProp] = val;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  autocompleteChange(filter: any, event: any) {
    this.filterValues[filter.columnProp] = event.option.value;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      if (!filter) return true;
      let searchTerms: any = {};
      try {
        searchTerms = JSON.parse(filter);
      } catch (e) {
        return true;
      }

      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col] && searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      if (!isFilterSet) return true;

      for (const col in searchTerms) {
        const term = searchTerms[col].toString().toLowerCase().trim();
        if (col === 'diasAtencion') {
          const diasList = Array.isArray(data.diasAtencion)
            ? data.diasAtencion.map((d: any) => (typeof d === 'number' ? Dia[d] : d).toLowerCase())
            : [];
          if (!diasList.some((d: string) => d.includes(term))) {
            return false;
          }
        } else if (col === 'especialidad') {
          const espList = Array.isArray(data.especialidad)
            ? data.especialidad.map((e: any) => e.toString().toLowerCase())
            : [data.especialidad ? data.especialidad.toString().toLowerCase() : ''];
          if (!espList.some((e: string) => e.includes(term))) {
            return false;
          }
        } else {
          const val = (data[col] || '').toString().toLowerCase();
          if (!val.includes(term)) {
            return false;
          }
        }
      }
      return true;
    };
    return filterFunction;
  }

  get diasAtencion() { return this.filterForm.get('diasAtencion'); }
  get nombre() { return this.filterForm.get('nombre'); }
  get especialidad() { return this.filterForm.get('especialidad'); }
}
