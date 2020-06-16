import { Component, OnInit } from '@angular/core';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';
import { Especialidad } from 'src/app/clases/Medico';
import { AdministradoresService } from 'src/app/servicios/servicio-administradores.service';
import { ServicioHistoriasService } from 'src/app/servicios/servicio-historias.service';
import { ServicioEncuestasService } from 'src/app/servicios/servicio-encuestas.service';
import { Turno, Estado } from 'src/app/clases/Turno';

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
    this.mocker();
  }

  activarServicios() : Promise<any>{
    let promesa;
    // Se leen todos los datos para guardar en Local Storage
    // Se activa una suscripcion a la base de datos
    console.info("Se leen datos de la base de datos");


    promesa = new Promise( () => {
      this.servicioMedicos.leer();
      this.servicioPacientes.leer();
      this.servicioTurnos.leer();  
      this.servicioAdmin.leer();
      this.servicioHistoria.leer();
      this.servicioEncuesta.leer();
    });

    return promesa;
  }

  mocker() {
    console.log("Mocker");
    let turno1 = Turno.CrearTurno("Antonio Ruedas", "Juliana Julians", "15/3/2020", "10:00",
                                  30, Especialidad.Dermatología, 0, "Detalle", Estado.Atendido,
                                  "-M9_xN9UNjqTY8bgm-nS", "-M9pIrAdOyRfQSXPh0nv", "0", false, 
                                  "comentarios", "");
    let turno2 = Turno.CrearTurno("Antonio Ruedas", "Juliana Julians", "25/3/2020", "09:00",
                                  30, Especialidad.Dermatología, 0, "Detalle", Estado.Atendido,
                                  "-M9_xN9UNjqTY8bgm-nS", "-M9pIrAdOyRfQSXPh0nv", "0", false, 
                                  "comentarios", "");
    let turno3 = Turno.CrearTurno("Antonio Ruedas", "Juliana Julians", "05/4/2020", "10:00",
                                  30, Especialidad.Dermatología, 0, "Detalle", Estado.Atendido,
                                  "-M9_xN9UNjqTY8bgm-nS", "-M9pIrAdOyRfQSXPh0nv", "0", false, 
                                  "comentarios", "");
    let turno4 = Turno.CrearTurno("Antonio Ruedas", "Emanuel Ortega", "15/3/2020", "10:00",
                                  30, Especialidad.Traumatología, 0, "Detalle", Estado.Atendido,
                                  "-M9_xN9UNjqTY8bgm-nS", "-M9_x40xTu5GJKFrWb5G", "0", false, 
                                  "comentarios", "");
    let turno5 = Turno.CrearTurno("Antonio Ruedas", "Emanuel Ortega", "25/3/2020", "09:00",
                                  30, Especialidad.Traumatología, 0, "Detalle", Estado.Atendido,
                                  "-M9_xN9UNjqTY8bgm-nS", "-M9_x40xTu5GJKFrWb5G", "0", false, 
                                  "comentarios", "");
    let turno6 = Turno.CrearTurno("Antonio Ruedas", "Emanuel Ortega", "05/4/2020", "16:00",
                                  30, Especialidad.Traumatología, 0, "Detalle", Estado.Atendido,
                                  "-M9_xN9UNjqTY8bgm-nS", "-M9_x40xTu5GJKFrWb5G", "0", false, 
                                  "comentarios", "");
    let turnos = [turno1, turno2, turno3, turno4, turno5, turno6];
                                
    //////////////////////////////
    turnos.forEach(turno =>  this.servicioTurnos.crear(turno));

  }


}

  