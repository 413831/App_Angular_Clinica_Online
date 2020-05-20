import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';

export class Imagen{
  nombre:string;
  base64: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }

}
