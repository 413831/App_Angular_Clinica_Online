import { Component, OnInit, Input } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { Paciente } from 'src/app/clases/Paciente';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Turno, Estado, Dia } from 'src/app/clases/Turno';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  public turno: Turno;
  public horarios: string[] = new Array<string>();
  public dias: number[] = new Array<number>();
  public minDate: Date;
  public maxDate: Date;
  events: string[] = [];
  datosTurnos: FormGroup;
  filtroFecha;
  // Crear set de horarios de atención
  
  constructor(private _formBuilder: FormBuilder,private servicio: TurnosService,
              private route : ActivatedRoute) { 
    this.turno = JSON.parse(localStorage.getItem('nuevoTurno'));

    // Obtengo los datos por parametros de la ruta
    this.route.params.subscribe( params => 
    {
      this.horarios = params['horarios'].split(",");
      params['dias'].split(",").map( dia => this.dias.push(parseInt(dia)));
    });

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDay() + 15);
    console.log(this.dias);
    

    // Filtros segun datos del medico
    this.filtroFecha = (fecha: Date | null): boolean => 
    {
      const diaSeleccionado = (fecha || new Date()).getDay();
      let validate = this.dias.includes(diaSeleccionado);  
     
      return validate;
    }
    
    console.log(this.turno);
    this.datosTurnos = new FormGroup({
      nombrePaciente: new FormControl({value: this.turno.nombrePaciente, disabled: true},
                                       Validators.required),
      nombreMedico: new FormControl({value: this.turno.nombreMedico, disabled: true},
                                      Validators.required),
      fecha: new FormControl({value: this.turno.fecha, disabled: false},
                              Validators.required),
      horario: new FormControl({value: this.turno.horario, disabled: false},
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
    this.turno.fecha = this.fecha.value;
    this.turno.horario = this.horario.value;
    this.turno.detalle = 'vacio';
    this.turno.estado = Estado.Pendiente;

    console.log(this.turno);
    this.servicio.crear(this.turno);
  }

  get nombrePaciente() { return this.datosTurnos.get('nombrePaciente'); }
  get nombreMedico() { return this.datosTurnos.get('nombreMedico'); }
  get fecha() { return this.datosTurnos.get('fecha'); }
  get horario() { return this.datosTurnos.get('horario'); }
  get duracion() { return this.datosTurnos.get('duracion'); }
  get especialidad() { return this.datosTurnos.get('especialidad'); }
  get consultorio() { return this.datosTurnos.get('consultorio'); }
  
  

}
