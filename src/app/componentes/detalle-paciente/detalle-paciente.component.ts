import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/Paciente';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.css']
})
export class DetallePacienteComponent implements OnInit {
  imgSrc: string;

  constructor(public paciente: Paciente) { }

  ngOnInit(): void {
  }

}
