import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/clases/Paciente';

@Component({
  selector: 'app-dialog-paciente',
  templateUrl: './dialog-paciente.component.html',
  styleUrls: ['./dialog-paciente.component.css']
})
export class DialogPacienteComponent implements OnInit {  
  imgSrc: string;

  constructor(public dialogRef: MatDialogRef<DialogPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente: Paciente)
  { }

  ngOnInit(): void {
  }

}
