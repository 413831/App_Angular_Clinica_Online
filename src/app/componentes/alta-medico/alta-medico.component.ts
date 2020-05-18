import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { Especialidad, Medico } from 'src/app/clases/Medico';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';

@Component({
  selector: 'app-alta-medico',
  templateUrl: './alta-medico.component.html',
  styleUrls: ['./alta-medico.component.css']
})
export class AltaMedicoComponent implements OnInit {
  datosMedico: FormGroup;
  medico: Medico;
  isLinear = false;
  seleccion = new SelectionModel<Especialidad>(true, []);
  franjaHoraria: string[] = ['mañana', 'tarde'];
  especialidades: Especialidad[] = [Especialidad.Cardiología,Especialidad.Dermatología,
                                    Especialidad.General, Especialidad.Pediatría,
                                     Especialidad.Traumatología];
  // public especialidades: Especialidad[];

  constructor(private _formBuilder: FormBuilder,
              private servicio: MedicosService) {    
    // Se pueden traer las especialidades creadas
    // this.especialidades = servicio.traerEspecialidades();
    this.datosMedico = new FormGroup({
      nombre: new FormControl(),
      dni: new FormControl(),
      direccion: new FormControl(),
      telefono: new FormControl(),
      imagen: new FormControl(),
      imagenDos: new FormControl(),
      disponibilidad: new FormControl(),
      email: new FormControl(),
      clave: new FormControl(),
      matricula: new FormControl(),
      especialidad: new FormControl(),
   });
  }

  ngOnInit() {
    this.medico = new Medico();
    
  }

  toggle(especialidad: Especialidad){

  }

  alta()
  {
    let medico = Medico.CrearMedico(this.nombre.value, this.clave.value, this.dni.value,
                                    this.direccion.value,this.email.value, this.telefono.value,
                                    this.imagen.value, this.matricula.value, 0,
                                    this.disponibilidad.value, this.especialidad.value);
    console.log(medico);
  }

  get nombre() { return this.datosMedico.get('nombre'); }
  get dni() { return this.datosMedico.get('dni'); }
  get direccion() { return this.datosMedico.get('direccion'); }
  get telefono() { return this.datosMedico.get('telefono'); }
  get imagen() { return this.datosMedico.get('imagen'); }
  get email() { return this.datosMedico.get('email'); }
  get clave() { return this.datosMedico.get('clave'); }
  get disponibilidad() { return this.datosMedico.get('disponibilidad'); }
  get imagenDos() { return this.datosMedico.get('imagenDos'); }
  get matricula() { return this.datosMedico.get('matricula'); }
  get especialidad() { return this.datosMedico.get('especialidad'); }
}
