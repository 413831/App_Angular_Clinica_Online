import { Component, OnInit } from '@angular/core';
import { Especialidad, Medico } from 'src/app/clases/Medico';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/clases/Usuario';
import { Encuesta } from 'src/app/clases/Encuesta';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  encuesta: Encuesta;
  usuario: Usuario;
  frecuencias: number[] = [1,2,5,10];
  selectedValue: number;
  especialidades: Especialidad[] = Medico.especialidades;
  medios: string[] = ["diario", "television", "web", "redes sociales", "recomendacion", "mail"];

  constructor(private _formBuilder: FormBuilder,
                  private route : ActivatedRoute, private router: Router ) 
  {
     this.usuario = Object.assign(new Usuario, 
                                  JSON.parse(localStorage.getItem('usuario-logueado')));
  }

  ngOnInit(): void {
  }

  guardar()
  {

  }

}
