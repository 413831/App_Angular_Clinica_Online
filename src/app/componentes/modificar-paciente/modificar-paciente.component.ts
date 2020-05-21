import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from 'src/app/clases/Paciente';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modificar-paciente',
  templateUrl: './modificar-paciente.component.html',
  styleUrls: ['./modificar-paciente.component.css']
})
export class ModificarPacienteComponent implements OnInit {
  @Input() paciente: Paciente;
  datosPaciente: FormGroup;
  
  constructor(private servicio: PacientesService) { 
    this.datosPaciente = new FormGroup({
      direccion: new FormControl(),
      telefono: new FormControl(),
      obraSocial: new FormControl(),
      numeroAfiliado: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  modificar()
  {
    this.paciente.direccion = this.direccion.value;
    this.paciente.telefono = this.telefono.value;
    this.paciente.obraSocial = this.obraSocial.value;
    this.paciente.numeroAfiliado = this.numeroAfiliado.value;

    this.servicio.actualizar(this.paciente);
  }

  get direccion() { return this.datosPaciente.get('direccion'); }
  get telefono() { return this.datosPaciente.get('telefono'); }
  get obraSocial() { return this.datosPaciente.get('obraSocial'); }
  get numeroAfiliado() { return this.datosPaciente.get('numeroAfiliado'); }
}
