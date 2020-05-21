import { Component, OnInit, Input, Inject } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/clases/Turno';
import { Paciente } from 'src/app/clases/Paciente';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';

@Component({
  selector: 'app-detalle-medico',
  templateUrl: './detalle-medico.component.html',
  styleUrls: ['./detalle-medico.component.css']
})
export class DetalleMedicoComponent implements OnInit {
  imgSrc: string;
  datosCompletos: Boolean = false;

  constructor( public dialogRef: MatDialogRef<DetalleMedicoComponent>,
                @Inject(MAT_DIALOG_DATA) public medico: Medico,
                private route: ActivatedRoute, private router: Router,
                private servicio: MedicosService) 
  {
    console.log("DATA MODAL ");
    console.log(medico);
  }

  ngOnInit(): void 
  {
    this.servicio.descargarImagen(this.medico.imagen).then( this.imgSrc = this.servicio.imgSrc);
  }

  pedirTurno()
  {
    // Traer paciente para el turno
    let paciente = <Paciente>JSON.parse(localStorage.getItem('pacienteLogueado'));
    let turno = new Turno();
    // turno.nombrePaciente = paciente.nombre;
    turno.nombrePaciente = 'test';
    turno.nombreMedico = this.medico.nombre;
    // Ver solo especialidad seleccionada
    turno.especialidad = this.medico.especialidad;
    turno.consultorio = this.medico.consultorio;    
  
    // La fecha se selecciona en menu de alta de turno
    localStorage.setItem('nuevoTurno',JSON.stringify(turno));

    this.router.navigate(['alta-turno']);
  }

  onNoClick(): void 
  {
    console.log("Cerrar dialog");
    this.dialogRef.close();
  }


}
