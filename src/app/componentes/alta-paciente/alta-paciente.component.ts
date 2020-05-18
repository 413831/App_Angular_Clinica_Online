import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from 'src/app/clases/Paciente';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.css']
})
export class AltaPacienteComponent implements OnInit {     
  datosPaciente: FormGroup;
  obrasSociales: string[] = ['Galeno', 'OSPERYH', 'OSPSA', 'Medicus','Hospital Italiano'];

  constructor(private _formBuilder: FormBuilder,
              private servicio: PacientesService) 
  {    
    this.datosPaciente = new FormGroup({
      nombre: new FormControl(),
      dni: new FormControl(),
      direccion: new FormControl(),
      telefono: new FormControl(),
      imagen: new FormControl(),
      obraSocial: new FormControl(),
      numeroAfiliado: new FormControl(),
      disponibilidad: new FormControl(),
      imagenDos: new FormControl(),
      email: new FormControl(),
      clave: new FormControl(),
   });
  }

  ngOnInit() {
    // this.datosPaciente = this._formBuilder.group({
    //   dni: ['', Validators.required],
    //   email: ['', Validators.required],
    //   clave: ['', Validators.required]      
    // });
  }

  alta()
  {
    let paciente = Paciente.CrearPaciente(this.nombre.value, this.clave.value, this.dni.value,
                                          this.direccion.value,this.email.value, this.telefono.value,
                                          this.imagen.value, this.obraSocial.value, 
                                          this.numeroAfiliado.value, this.imagenDos.value);
    console.log(paciente);
    //this.servicio.crear(this.paciente);
  }

  get nombre() { return this.datosPaciente.get('nombre'); }
  get dni() { return this.datosPaciente.get('dni'); }
  get direccion() { return this.datosPaciente.get('direccion'); }
  get telefono() { return this.datosPaciente.get('telefono'); }
  get imagen() { return this.datosPaciente.get('imagen'); }
  get obraSocial() { return this.datosPaciente.get('obraSocial'); }
  get numeroAfiliado() { return this.datosPaciente.get('numeroAfiliado'); }
  get email() { return this.datosPaciente.get('email'); }
  get clave() { return this.datosPaciente.get('clave'); }
  get imagenDos() { return this.datosPaciente.get('imagenDos'); }
  
}
