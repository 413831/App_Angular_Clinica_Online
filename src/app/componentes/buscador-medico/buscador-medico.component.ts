import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { FormGroup, FormControl } from '@angular/forms';
import { Turno, Dia } from 'src/app/clases/Turno';

@Component({
  selector: 'app-buscador-medico',
  templateUrl: './buscador-medico.component.html',
  styleUrls: ['./buscador-medico.component.css']
})
export class BuscadorMedicoComponent implements OnInit {
  @Output() enviarListado: EventEmitter<any>= new EventEmitter<any>();
  @Input() listado: Medico[];
  franjaHoraria: string[] = ['mañana', 'tarde'];
  dias: Dia[] = Turno.dias;
  especialidades: string[] = ['pediatría', 'general', 'traumatología'];
  // form group
  filterForm = new FormGroup(
  {
    fecha: new FormControl(),
    especialidad: new FormControl(),
    nombre: new FormControl(),
  });
  
  constructor() { 
    this.listado = JSON.parse(localStorage.getItem('medicos'));
  }
  
  ngOnInit(): void {
  }


  get fecha() { return this.filterForm.get('fecha'); }
  get nombre() { return this.filterForm.get('nombre'); }
  get especialidad() { return this.filterForm.get('especialidad'); }

  buscar(){
    let filtro = {
      nombre: this.nombre.value,
      especialidad: this.especialidad.value,
      fecha: this.fecha.value
    }
    console.log(filtro);
    this.enviarListado.emit(filtro);
  }
  
}
