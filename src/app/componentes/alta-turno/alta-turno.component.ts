import { Component, OnInit, Input } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { Paciente } from 'src/app/clases/Paciente';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Turno, Estado } from 'src/app/clases/Turno';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  public turno: Turno;
  public franjaHoraria: string[];
  public setMañana: string[] = ["8:00", "8:30" , "9:00", "9:30", "10:00", "10:30", "11:00", "11:30"];
  public setTarde: string[] = [ "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                              "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];
  events: string[] = [];
  datosTurnos: FormGroup;
  // Crear set de horarios de atención
  
  constructor(private _formBuilder: FormBuilder,private servicio: TurnosService) { 
    this.turno = JSON.parse(localStorage.getItem('nuevoTurno'));

    if(this.turno.horario == "mañana")
    {
      this.franjaHoraria = this.setMañana;
    }
    else if(this.turno.horario == "tarde")
    {
      this.franjaHoraria = this.setTarde;
    }

    console.log(this.turno);
    this.datosTurnos = new FormGroup({
      nombrePaciente: new FormControl({value: this.turno.nombrePaciente, disabled: true},
                                       Validators.required),
      nombreMedico: new FormControl({value: this.turno.nombreMedico, disabled: true},
                                      Validators.required),
      fecha: new FormControl({value: this.turno.fecha, disabled: false},
                              Validators.required),
      duracion: new FormControl({value: this.turno.duracion, disabled: true},
                                  Validators.required),
      especialidad: new FormControl({value: this.turno.especialidad, disabled: true},
                                    Validators.required),
      consultorio: new FormControl({value: this.turno.consultorio, disabled: true},
                                    Validators.required),
      estado: new FormControl({value: this.turno.estado, disabled: true},
                              Validators.required),
   });
   
  }


  ngOnInit(): void {
   
    
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
    this.servicio.crear(this.turno);

  }

  get nombrePaciente() { return this.datosTurnos.get('nombrePaciente'); }
  get nombreMedico() { return this.datosTurnos.get('nombreMedico'); }
  get fecha() { return this.datosTurnos.get('fecha'); }
  get duracion() { return this.datosTurnos.get('duracion'); }
  get especialidad() { return this.datosTurnos.get('especialidad'); }
  get consultorio() { return this.datosTurnos.get('consultorio'); }
  
  

}
