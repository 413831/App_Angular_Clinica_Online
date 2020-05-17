import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.css']
})
export class DetalleTurnoComponent implements OnInit {
  @Input() turno:Turno;
  constructor() { }

  ngOnInit(): void {
  }

}
