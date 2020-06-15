import { Component, OnInit, Inject } from '@angular/core';
import { ServicioEncuestasService } from 'src/app/servicios/servicio-encuestas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMedicoComponent } from '../dialog-medico/dialog-medico.component';
import { Medico } from 'src/app/clases/Medico';
import { Encuesta } from 'src/app/clases/Encuesta';

@Component({
  selector: 'app-detalle-encuesta',
  templateUrl: './detalle-encuesta.component.html',
  styleUrls: ['./detalle-encuesta.component.css']
})
export class DetalleEncuestaComponent implements OnInit {
  public encuesta: Encuesta;

  constructor(public dialogRef: MatDialogRef<DialogMedicoComponent>,
              @Inject(MAT_DIALOG_DATA) public paciente: Medico,
              private servicio: ServicioEncuestasService) 
  {
    
   }

  ngOnInit(): void {
    let array = JSON.parse(localStorage.getItem('encuestas'))
                    .find( encuesta => encuesta.idPaciente == this.paciente.id);
    this.encuesta = (JSON.parse(localStorage.getItem('encuestas')))
                  .find( encuesta => encuesta.idPaciente == this.paciente.id);
    console.log(array);
  }

}
