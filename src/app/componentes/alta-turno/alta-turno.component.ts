import { Component, OnInit, Input } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { Paciente } from 'src/app/clases/Paciente';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Turno, Estado } from 'src/app/clases/Turno';
import { FormGroup, FormControl } from '@angular/forms';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';

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
  
  constructor(private servicio: TurnosService) { 
    this.datosTurno = new FormGroup({
      nombrePaciente: new FormControl(),
      nombreMedico: new FormControl(),
      fecha: new FormControl(),
      duracion: new FormControl(),
      especialidad: new FormControl(),
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

  altaTurno()
  {
    console.info("Alta de turno");
    this.turno.especialidad = this.especialidad.value;
    this.turno.fecha = this.fecha.value;
    this.turno.duracion = 30;
    this.turno.detalle = 'vacio';
    this.turno.estado = Estado.Pendiente;

    console.log(this.turno);
    // this.servicio.crear(this.turno);

  }

  get nombrePaciente() { return this.datosTurno.get('nombrePaciente'); }
  get nombreMedico() { return this.datosTurno.get('nombreMedico'); }
  get fecha() { return this.datosTurno.get('fecha'); }
  get duracion() { return this.datosTurno.get('duracion'); }
  get especialidad() { return this.datosTurno.get('especialidad'); }
  get consultorio() { return this.datosTurno.get('consultorio'); }
  
  

}
