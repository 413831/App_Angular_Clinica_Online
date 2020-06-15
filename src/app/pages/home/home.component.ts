import { Component, OnInit } from '@angular/core';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';
import { Especialidad } from 'src/app/clases/Medico';
import { AdministradoresService } from 'src/app/servicios/servicio-administradores.service';
import { ServicioHistoriasService } from 'src/app/servicios/servicio-historias.service';
import { ServicioEncuestasService } from 'src/app/servicios/servicio-encuestas.service';

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
  especialidades: Especialidad[] = [Especialidad.Cardiología,Especialidad.Dermatología,
                                  Especialidad.General, Especialidad.Pediatría,
                                  Especialidad.Traumatología];

  constructor(private servicioMedicos: MedicosService,
              private servicioPacientes: PacientesService,
              private servicioTurnos: TurnosService,
              private servicioAdmin : AdministradoresService,
              private servicioHistoria : ServicioHistoriasService,
              private servicioEncuesta : ServicioEncuestasService) 
  {
   
  }

  ngOnInit(): void {
    this.activarServicios();
  }

  activarServicios(){
    // Se leen todos los datos para guardar en Local Storage
    // Se activa una suscripcion a la base de datos
    console.info("Se leen datos de la base de datos");

    this.servicioMedicos.leer();
    this.servicioPacientes.leer();
    this.servicioTurnos.leer();  
    this.servicioAdmin.leer();
    this.servicioHistoria.leer();
    this.servicioEncuesta.leer();
  }


}

  