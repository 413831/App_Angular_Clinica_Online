import { Component, OnInit } from '@angular/core';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  base64textString: string;
  reader: FileReader;
  selectedFile: File;
  centered = true;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private servicioMedicos: MedicosService,
              private servicioPacientes: PacientesService,
              private servicioTurnos: TurnosService) 
  {
    this.activarServicios();
  }

  ngOnInit(): void {
  }

  activarServicios(){
    // Se leen todos los datos para guardar en Local Storage
    // Se activa una suscripcion a la base de datos
    console.info("Se leen datos de la base de datos");

    this.servicioMedicos.leer();
    this.servicioPacientes.leer();
    this.servicioTurnos.leer();  
  }


}

  