import { Component, OnInit, Input } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modificar-medico',
  templateUrl: './modificar-medico.component.html',
  styleUrls: ['./modificar-medico.component.css']
})
export class ModificarMedicoComponent implements OnInit {
  @Input() medico: Medico;
  datosMedico: FormGroup;
  franjaHoraria: string[] = ['mañana', 'tarde'];

  constructor() { 
    this.datosMedico = new FormGroup({
      direccion: new FormControl(),
      telefono: new FormControl(),
      disponibilidad: new FormControl(),
      consultorio: new FormControl()
    });
  }

  ngOnInit(): void {}

  get direccion() { return this.datosMedico.get('direccion'); }
  get telefono() { return this.datosMedico.get('telefono'); }
  get disponibilidad() { return this.datosMedico.get('disponibilidad'); }
  get consultorio() { return this.datosMedico.get('consultorio'); }
}
