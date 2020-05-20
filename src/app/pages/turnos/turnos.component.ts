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
    
  }

  buscar()
  {
    // Se filtran los turnos de la especialidad seleccionada y fecha y estado
    // this.turnos ...
  }
}
