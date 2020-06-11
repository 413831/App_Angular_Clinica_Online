import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {
  listado: Medico[];
  constructor() {}

  ngOnInit(): void {}

  // Se guarda el listado filtrado por el componente Buscador
  guardarListado(medicos: Medico[])
  {    
    this.listado = medicos;
  }



}
