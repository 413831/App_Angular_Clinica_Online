import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {
  listado: Medico[];
  constructor() { }

  ngOnInit(): void {
  }

  guardarListado(medicos: Medico[])
  {
    this.listado = medicos;
  }

}
