import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { Turno, Estado } from 'src/app/clases/Turno';
import { Especialidad } from 'src/app/clases/Medico';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  @Input() usuario: Usuario;
  public turnos: Turno[];

  constructor(private servicioTurnos: TurnosService) 
  { }

  ngOnInit(): void {
    // Reemplazar con Local Storage
    // this.turnos = this.servicioTurnos.leer();
    this.turnos = [
      {id: 'test', nombrePaciente: 'Pepito',nombreMedico: 'Maria Angeles Sarasa', fecha: new Date(),
        duracion: 30, especialidad: Especialidad.General, consultorio: 1, detalle: 'Ayuno', estado: Estado.Pendiente},
      {id: 'test', nombrePaciente: 'Manuela',nombreMedico: 'Christian Sanchez', fecha: new Date(),
      duracion: 30, especialidad: Especialidad.Traumatología, consultorio: 1, detalle: 'Ayuno', estado : Estado.Pendiente},
    ]
  }

  buscar()
  {
    // Se filtran los turnos de la especialidad seleccionada y fecha y estado
    // this.turnos ...
  }
}
