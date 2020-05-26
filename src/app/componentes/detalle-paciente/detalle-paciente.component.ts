import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from 'src/app/clases/Paciente';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.css']
})
export class DetallePacienteComponent implements OnInit {
  @Input() imgPerfil: string;
  @Input() imgAvatar: string;
  @Input() public paciente: Paciente;

  constructor() { }

  ngOnInit(): void {
  }

}
