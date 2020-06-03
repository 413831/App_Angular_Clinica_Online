import { Component, OnInit, Input, Inject } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/clases/Turno';
import { Paciente } from 'src/app/clases/Paciente';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { MiservicioService } from 'src/app/servicios/miservicio.service';

@Component({
  selector: 'app-dialog-medico',
  templateUrl: './dialog-medico.component.html',
  styleUrls: ['./dialog-medico.component.css']
})
export class DialogMedicoComponent implements OnInit {
  private turno: Turno;
  imgSrc: string;
  datosCompletos: Boolean = false;

  constructor( public dialogRef: MatDialogRef<DialogMedicoComponent>,
                @Inject(MAT_DIALOG_DATA) public medico: Medico,
                private route: ActivatedRoute, private router: Router,
                private servicio: MedicosService) 
  {
    console.log(medico);
  }

  ngOnInit(): void 
  {
    console.log(`URL Imagen: ${this.medico.imagen}`);
    MiservicioService.descargarImagen(this.medico.imagen)
                      .then( ()=> this.imgSrc = MiservicioService.imgSrc);
    
    this.turno = new Turno();
  }

  pedirTurno()
  {
    // Traer paciente para el turno
    let paciente = <Paciente>JSON.parse(localStorage.getItem('usuario-logueado'));
    
    // turno.nombrePaciente = paciente.nombre;
    this.turno.nombrePaciente = paciente.nombre;
    this.turno.nombreMedico = this.medico.nombre;
    // Ver solo especialidad seleccionada
    this.turno.consultorio = this.medico.consultorio;   
    localStorage.setItem('nuevoTurno',JSON.stringify(this.turno));
    // Se navega al alta de Turno
    this.router.navigate([`alta-turno/${this.medico.horasAtencion}/${this.medico.diasAtencion}`])
                .then(() => this.dialogRef.close());
    // Se cierra el modal
  }

  

  public especialidad(value){value.map( especialidad => this.turno.especialidad = especialidad.value)}
  public fecha(value)
  {
    value.map( fecha => this.turno.fecha = fecha.value)
  }
  public horario(value){value.map( horario => this.turno.horario = horario.value)}

}
