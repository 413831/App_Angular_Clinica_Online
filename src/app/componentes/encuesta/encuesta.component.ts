import { Component, OnInit } from '@angular/core';
import { Especialidad, Medico } from 'src/app/clases/Medico';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/clases/Usuario';
import { Encuesta } from 'src/app/clases/Encuesta';
import { Turno } from 'src/app/clases/Turno';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicioEncuestasService } from 'src/app/servicios/servicio-encuestas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionComponent } from '../notificacion/notificacion.component';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  satisfaccion: number;
  sexo: string;
  primeraVez = false;
  recomendar = false;
  encuesta: Encuesta = new Encuesta();
  usuario: Usuario;
  turno: Turno;
  frecuencias: number[] = [1,2,5,10];
  selectedValue: number;
  especialidades: Especialidad[] = Medico.especialidades;
  medios: string[] = ["Diario", "Television", "Web", "Redes sociales", "Recomendacion", "Mail"];
  sexos: string[] = ["Masculino", "Femenino", "Otro"];
  educacion: string[] = ["Primaria", "Secundaria", "Terciaria", "Universitaria"];

  constructor(private route : ActivatedRoute, private router: Router,
               private servicio: ServicioEncuestasService,
               private _snackBar: MatSnackBar) 
  {
    this.usuario = Object.assign(new Usuario, 
                                  JSON.parse(localStorage.getItem('usuario')));  
    this.turno = Object.assign(new Turno, 
                                    JSON.parse(localStorage.getItem('turno-terminado'))); 
    this.encuesta.nombre = this.usuario.nombre;
    this.encuesta.especialidad = this.turno.especialidad;
    this.encuesta.fechaAtencion = this.turno.fecha;
    this.encuesta.idPaciente = this.usuario.id;
    this.encuesta.idTurno = this.turno.id;

  }

  ngOnInit(): void {
    
  }

  guardar()
  { 
    this.servicio.crear(this.encuesta)
                  .then(()=> this.router.navigate(["/menu"]));
    this._snackBar.openFromComponent(NotificacionComponent, {
      duration: 3 * 1000,
      data: 'Muchas gracias por completar la encuesta'
    });
    
  }

}
