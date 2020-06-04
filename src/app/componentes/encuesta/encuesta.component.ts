import { Component, OnInit } from '@angular/core';
import { Especialidad, Medico } from 'src/app/clases/Medico';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  frecuencias: number[] = [1,2,5,10];
  selectedValue: number;
  especialidades: Especialidad[] = Medico.especialidades;
  medios: string[] = ["diario", "television", "web", "redes sociales", "recomendacion", "mail"];

  constructor() { }

  ngOnInit(): void {
  }

}
