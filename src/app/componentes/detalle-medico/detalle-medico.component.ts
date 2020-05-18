import { Component, OnInit, Input, Inject } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-medico',
  templateUrl: './detalle-medico.component.html',
  styleUrls: ['./detalle-medico.component.css']
})
export class DetalleMedicoComponent implements OnInit {
  datosCompletos: Boolean = true;

  constructor( public dialogRef: MatDialogRef<DetalleMedicoComponent>,
                @Inject(MAT_DIALOG_DATA) public medico: Medico) 
  {
    console.log(medico);
   }

  ngOnInit(): void {}

  pedirTurno()
  {

  }

  onNoClick(): void 
  {
    console.log("Cerrar dialog");
    this.dialogRef.close();
  }


}
