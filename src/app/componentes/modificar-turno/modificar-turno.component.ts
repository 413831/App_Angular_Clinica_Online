import { Component, OnInit } from '@angular/core';
import { Estado, Turno } from 'src/app/clases/Turno';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Usuario, Rol } from 'src/app/clases/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { CambioTurnoSnackbarComponent } from '../cambio-turno-snackbar/cambio-turno-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { InfoTurnoComponent } from '../info-turno/info-turno.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogExtrasComponent } from '../dialog-extras/dialog-extras.component';

@Component({
  selector: 'app-modificar-turno',
  templateUrl: './modificar-turno.component.html',
  styleUrls: ['./modificar-turno.component.css']
})
export class ModificarTurnoComponent implements OnInit {
  durationInSeconds = 3;
  public usuario: Usuario;
  public turno: Turno;
  public horarios: string[] = new Array<string>();
  public dias: number[] = Turno.dias;
  public minDate: Date;
  public maxDate: Date;
  events: string[] = [];
  datosTurnos: FormGroup;
  filtroFecha;

  constructor(private _formBuilder: FormBuilder,private servicio: TurnosService,
              private route: ActivatedRoute, private router: Router,
              private _snackBar: MatSnackBar, private _bottomSheet: MatBottomSheet,
              public nuevoAtributo: MatDialog) 
  {
    
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.turno = JSON.parse(localStorage.getItem('nuevoTurno'));
    this.dias = JSON.parse(localStorage.getItem('medicos'))
                          .filter(medico => medico.nombre == this.turno.nombreMedico)[0].diasAtencion;
    this.crearFiltros();
    this.crearControles();
  }

  modificar()
  {
    this.turno.fecha = this.fecha.value != '' ? this.fecha.value : this.turno.fecha  ;
    this.turno.horario = this.horario.value != '' ? this.horario.value : this.turno.horario;
    this.turno.detalle = this.detalle.value != '' ? this.detalle.value : this.turno.detalle;
    this.turno.comentarios = this.comentarios.value != '' ? this.comentarios.value : this.turno.comentarios;
    this.turno.modificado = true;

    console.log(this.turno);
    this.servicio.actualizar(this.turno);
    this.router.navigate(["/menu"]).then(()=> 
      this._snackBar.openFromComponent(CambioTurnoSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      })
    );
  }

  verDetalles()
  {
    let config = new MatBottomSheetConfig()
    config.data = this.turno;

    this._bottomSheet.open(InfoTurnoComponent, config);
  }

  cambiarEstado(estado: Estado)
  {
    this.turno.estado = estado;
  }

  crearControles()
  {
    this.datosTurnos = new FormGroup({
      nombrePaciente: new FormControl({value: this.turno.nombrePaciente, disabled: true}),
      nombreMedico: new FormControl({value: this.turno.nombreMedico, disabled: true}),
      fecha: new FormControl(this.turno.fecha),
      horario: new FormControl({value: this.turno.horario, disabled: false}),
      duracion: new FormControl({value: this.turno.duracion, disabled: true},
                                  Validators.required),
      especialidad: new FormControl({value: this.turno.especialidad, disabled: true}),
      consultorio: new FormControl({value: this.turno.consultorio, disabled: true}),
      estado: new FormControl({value: this.turno.estado, disabled: true}),
      detalle: new FormControl({ value:'Comentarios', disabled: false}),
      comentarios: new FormControl({ value:'Reseña', disabled: false})
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    console.log(`Valores de calendario: ${this.events}`);
  }

  crearFiltros()
  {
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
  }

  agregarInfo()
  {
    let dialogConfig = new MatDialogConfig();
    let dialogRef;
    dialogConfig.data = this.turno;
    dialogConfig.width = '400px';
    dialogConfig.height = '35px';
    dialogConfig.panelClass = "dialog";

    dialogRef = this.nuevoAtributo.open(DialogExtrasComponent, dialogConfig);
  }

  get nombrePaciente() { return this.datosTurnos.get('nombrePaciente'); }
  get nombreMedico() { return this.datosTurnos.get('nombreMedico'); }
  get fecha() { return this.datosTurnos.get('fecha'); }
  get horario() { return this.datosTurnos.get('horario'); }
  get duracion() { return this.datosTurnos.get('duracion'); }
  get detalle() { return this.datosTurnos.get('detalle'); }
  get comentarios() { return this.datosTurnos.get('comentarios'); }
  get especialidad() { return this.datosTurnos.get('especialidad'); }
  get consultorio() { return this.datosTurnos.get('consultorio'); }
}
