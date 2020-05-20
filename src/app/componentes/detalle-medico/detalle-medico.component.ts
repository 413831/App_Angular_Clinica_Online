import { Component, OnInit, Input, Inject } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/clases/Turno';
import { Paciente } from 'src/app/clases/Paciente';

@Component({
  selector: 'app-detalle-medico',
  templateUrl: './detalle-medico.component.html',
  styleUrls: ['./detalle-medico.component.css']
})
export class DetalleMedicoComponent implements OnInit {
  datosCompletos: Boolean = false;

  constructor( public dialogRef: MatDialogRef<DetalleMedicoComponent>,
                @Inject(MAT_DIALOG_DATA) public medico: Medico,
                private route: ActivatedRoute, private router: Router) 
  {
    console.log(medico);
  }

  ngOnInit(): void {}

  pedirTurno()
  {
    // Traer paciente para el turno
    let paciente = <Paciente>JSON.parse(localStorage.getItem('pacienteLogueado'));
    let turno = new Turno();
    turno.nombrePaciente = paciente.nombre;
    turno.nombreMedico = this.medico.nombre;
    // Ver solo especialidad seleccionada
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
