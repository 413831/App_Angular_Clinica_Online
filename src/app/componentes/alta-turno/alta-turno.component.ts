import { Component, OnInit, Input } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { Paciente } from 'src/app/clases/Paciente';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Turno } from 'src/app/clases/Turno';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  public turno: Turno;
  events: string[] = [];
  datosTurno: FormGroup;
  // Crear set de horarios de atención
  
  constructor() { 
    this.datosTurno = new FormGroup({
      nombrePaciente: new FormControl(),
      nombreMedico: new FormControl(),
      fecha: new FormControl(),
      duracion: new FormControl(),
      espcialidad: new FormControl(),
      consultorio: new FormControl(),
      detalle: new FormControl(),
      estado: new FormControl(),
   });
  }

  ngOnInit(): void {
    this.turno = JSON.parse(localStorage.getItem('nuevoTurno'));
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    console.log(`Valores de calendario: ${this.events}`);
  }


}
