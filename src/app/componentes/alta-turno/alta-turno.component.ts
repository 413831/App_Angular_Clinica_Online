import { Component, OnInit, Input } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { Paciente } from 'src/app/clases/Paciente';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Turno, Estado, Dia } from 'src/app/clases/Turno';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionComponent } from '../notificacion/notificacion.component';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  durationInSeconds = 5;
  habilitarHoras: boolean = false;
  public turno: Turno;
  public horarios: string[] = new Array<string>();
  public dias: number[] = new Array<number>();
  public minDate: Date;
  public maxDate: Date;
  events: string[] = [];
  datosTurnos: FormGroup;
  filtroFecha;
  
  constructor(private _formBuilder: FormBuilder,private servicio: TurnosService,
              private route : ActivatedRoute, private router: Router ,
              private _snackBar: MatSnackBar, private dialogRef: MatDialog) 
  { 
    this.dialogRef.closeAll();
    this.turno = Object.assign(new Turno,JSON.parse(localStorage.getItem('nuevoTurno')));

    // Obtengo los datos por parametros de la ruta
    this.route.params.subscribe( params => 
    {
      this.horarios = params['horarios'].split(",");
      params['dias'].split(",").map( dia => this.dias.push(parseInt(dia)));
    });
    
  }


  ngOnInit(): void {
    this.crearFiltros();
    this.crearControles();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  
  checkHoras()
  {
    this.habilitarHoras = true;
    console.log(this.fecha.value.getDay());
    

    if(this.fecha.value.getDay() == Dia.Sabado)
    {
      this.horarios = this.horarios.filter( hora => parseInt(hora) < 14);
      this.datosTurnos.patchValue({
        horario: this.horarios
      })
      
    }
  }

  altaTurno()
  {
    console.info("Alta de turno");
    this.turno.especialidad = this.especialidad.value;
    this.turno.fecha = this.fecha.value.toUTCString();
    this.turno.duracion = 30;
    this.turno.fecha = this.fecha.value.toUTCString();
    console.log(this.turno.fecha);
    this.turno.horario = this.horario.value;
    this.turno.detalle = 'Detalle';
    this.turno.comentarios = 'Comentarios';
    this.turno.estado = Estado.Pendiente;
    // VALOR SOLO PARA TESTING
    // this.turno.estado = Estado.Atendido;

    console.log(this.turno);
    this.servicio.crear(this.turno)
                 .then(()=>  this.router.navigate(["/menu"]));

    this._snackBar.openFromComponent(NotificacionComponent, {
      duration: this.durationInSeconds * 1000,
      data: 'Se ha cargado un nuevo turno.'
    });

  }

  crearFiltros()
  {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);

    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 15);

    // Filtros segun datos del medico
    this.filtroFecha = (fecha: Date | null): boolean => 
    {  
      const diaSeleccionado = (fecha || new Date()).getDay();
      let validate = this.dias.includes(diaSeleccionado);  
     
      return validate;
    }
  }

  crearControles()
  {
    this.datosTurnos = new FormGroup({
      nombrePaciente: new FormControl({value: this.turno.nombrePaciente, disabled: true}),
      nombreMedico: new FormControl({value: this.turno.nombreMedico, disabled: true},
                                      Validators.required),
      fecha: new FormControl({value: '', disabled: false},
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

  get nombrePaciente() { return this.datosTurnos.get('nombrePaciente'); }
  get nombreMedico() { return this.datosTurnos.get('nombreMedico'); }
  get fecha() { return this.datosTurnos.get('fecha'); }
  get horario() { return this.datosTurnos.get('horario'); }
  get duracion() { return this.datosTurnos.get('duracion'); }
  get especialidad() { return this.datosTurnos.get('especialidad'); }
  get consultorio() { return this.datosTurnos.get('consultorio'); }
  
  

}
