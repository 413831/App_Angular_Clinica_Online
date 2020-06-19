import { Component, OnInit, Input, Inject } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/clases/Turno';
import { Paciente } from 'src/app/clases/Paciente';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { Rol, Usuario } from 'src/app/clases/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionComponent } from '../notificacion/notificacion.component';

@Component({
  selector: 'app-dialog-medico',
  templateUrl: './dialog-medico.component.html',
  styleUrls: ['./dialog-medico.component.css']
})
export class DialogMedicoComponent implements OnInit {
  private opened: boolean = false;
  private turno: Turno;
  public usuario: Usuario;
  imgSrc: string;
  avatarSrc: string;
  datosCompletos: Boolean = false;

  constructor( public dialogRef: MatDialogRef<DialogMedicoComponent>,
                @Inject(MAT_DIALOG_DATA) public medico: Medico,
                private route: ActivatedRoute, private router: Router,
                private servicio: MedicosService,
                private _snackBar: MatSnackBar) 
  {
    this.usuario = Object.assign(new Usuario,JSON.parse(localStorage.getItem('usuario')));
  }

  ngOnInit(): void 
  {
    console.log(`URL Imagen: ${this.medico.imagen}`);
    MiservicioService.descargarImagen(this.medico.imagen)
                      .then( ()=> this.imgSrc = MiservicioService.imgSrc);
    MiservicioService.descargarImagen(this.medico.avatar)
                      .then( ()=> this.avatarSrc = MiservicioService.imgSrc);      
    this.turno = new Turno();
  }

  pedirTurno()
  {
    if(this.usuario && this.usuario.rol == Rol.Paciente)
    {
      this.usuario = Object.assign(new Paciente , this.usuario);
        
      // turno.nombrePaciente = paciente.nombre;
      this.turno.nombrePaciente = this.usuario.nombre;
      this.turno.idPaciente = this.usuario.id;
      this.turno.nombreMedico = this.medico.nombre;
      this.turno.idMedico = this.medico.id;
      // Ver solo especialidad seleccionada
      this.turno.consultorio = this.medico.consultorio;  

      localStorage.setItem('nuevoTurno',JSON.stringify(this.turno));
      // Se navega al alta de Turno
      this.router.navigate([`alta-turno/${this.medico.horasAtencion}/${this.medico.diasAtencion}`])
                  .then(() => this.dialogRef.close());
      // Se cierra el modal
    }
  }

  autorizar()
  {
    this.medico.autorizado = true;
    this.medico.consultorio = Math.floor(Math.random() * 6) + 1; 

    this.servicio.actualizar(this.medico);
    this._snackBar.openFromComponent(NotificacionComponent, {
      duration: 3 * 1000,
      data: `Medico ${this.medico.nombre} - 
              ${this.medico.matricula} autorizado.`
    });
    
  }

  public especialidad(value){value.map( especialidad => this.turno.especialidad = especialidad.value)}
  public fecha(value){value.map( fecha => this.turno.fecha = fecha.value)}
  public horario(value){value.map( horario => this.turno.horario = horario.value)}

}
