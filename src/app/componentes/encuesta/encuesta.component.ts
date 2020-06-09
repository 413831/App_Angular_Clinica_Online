import { Component, OnInit } from '@angular/core';
import { Especialidad, Medico } from 'src/app/clases/Medico';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/clases/Usuario';
import { Encuesta } from 'src/app/clases/Encuesta';
import { Turno } from 'src/app/clases/Turno';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  datosEncuesta: FormGroup;
  satisfaccion: number;
  sexo: string;
  primeraVez = false;
  encuesta: Encuesta;
  usuario: Usuario;
  turno: Turno;
  frecuencias: number[] = [1,2,5,10];
  selectedValue: number;
  especialidades: Especialidad[] = Medico.especialidades;
  medios: string[] = ["Diario", "Television", "Web", "Redes sociales", "Recomendacion", "Mail"];
  sexos: string[] = ["Masculino", "Femenino", "Otro"];
  educacion: string[] = ["Primaria", "Secundaria", "Terciaria", "Universitaria"];

  constructor(private _formBuilder: FormBuilder,
                  private route : ActivatedRoute, private router: Router ) 
  {
    this.usuario = Object.assign(new Usuario, 
                                  JSON.parse(localStorage.getItem('usuario-logueado')));  
    this.turno = Object.assign(new Turno, 
                                    JSON.parse(localStorage.getItem('turno-terminado')));  
    this.datosEncuesta = new FormGroup({
      nombre: new FormControl({value: this.usuario.nombre, disabled: true}),
      edad: new FormControl('', [Validators.required]),
      fecha: new FormControl({value: this.turno.fecha, disabled: true},
                              Validators.required),
      especialidad: new FormControl({value: this.turno.especialidad, disabled: true},
                                    Validators.required),
      frecuenciaAtencion: new FormControl({value: ''},Validators.required),
      recomendacion: new FormControl({value: ''},Validators.required),
      medioComunicacion: new FormControl({value: ''},Validators.required),
      nivelEducacion: new FormControl({value: ''},Validators.required),
    });           
  }

  ngOnInit(): void {
    
  }

  guardar()
  {
    let encuesta = new Encuesta();

    console.log(encuesta);

  }

  get nombre() { return this.datosEncuesta.get('nombre'); }
  get edad() { return this.datosEncuesta.get('edad'); }
  get fecha() { return this.datosEncuesta.get('fecha'); }
  get especialidad() { return this.datosEncuesta.get('especialidad'); }
  get frecuenciaAtencion() { return this.datosEncuesta.get('frecuenciaAtencion'); }
  get recomendacion() { return this.datosEncuesta.get('recomendacion'); }
  get medioComunicacion() { return this.datosEncuesta.get('medioComunicacion'); }
  get nivelEducacion() { return this.datosEncuesta.get('nivelEducacion'); }
}
