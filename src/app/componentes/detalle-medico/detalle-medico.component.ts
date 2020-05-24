import { Component, OnInit, Input } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';

@Component({
  selector: 'app-detalle-medico',
  templateUrl: './detalle-medico.component.html',
  styleUrls: ['./detalle-medico.component.css']
})
export class DetalleMedicoComponent implements OnInit {
  @Input() medico: Medico;
  imgSrc: string;

  constructor() { }

  ngOnInit(): void {
  }

}
