import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { Especialidad, Medico } from 'src/app/clases/Medico';

@Component({
  selector: 'app-alta-medico',
  templateUrl: './alta-medico.component.html',
  styleUrls: ['./alta-medico.component.css']
})
export class AltaMedicoComponent implements OnInit {
  medico: Medico;
  isLinear = false;
  seleccion = new SelectionModel<Especialidad>(true, []);
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  especialidades: Especialidad[] = [Especialidad.Cardiología,Especialidad.Dermatología,
                                    Especialidad.General, Especialidad.Pediatría, Especialidad.Traumatología];
  // public especialidades: Especialidad[];

  constructor(private _formBuilder: FormBuilder) {    
    // Se pueden traer las especialidades creadas
    // this.especialidades = servicio.traerEspecialidades();
  }

  ngOnInit() {
    this.medico = new Medico();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  toggle(especialidad: Especialidad){

  }

  alta()
  {
    
  }
}
