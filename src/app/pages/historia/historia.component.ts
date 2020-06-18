import { Component, OnInit, Input } from '@angular/core';
import { Historia } from 'src/app/clases/Historia';
import { Paciente } from 'src/app/clases/Paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/clases/Turno';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {
  idPaciente: string;
  public paciente: Paciente;
  public historia: Historia;
  public turnos: Turno[];
  public datosAdicionales = [];
  public datos = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.idPaciente = params['paciente']);
  
  }

  ngOnInit(): void {
    this.paciente = (JSON.parse(localStorage.getItem('pacientes'))
                        .filter(paciente => this.idPaciente == paciente.id))
                        .map(paciente => Object.assign(new Paciente, paciente))[0];
    this.historia = JSON.parse(localStorage.getItem('historias'))
                        .filter(historia => historia.idPaciente == this.idPaciente)
                        .map(historia => Object.assign(new Historia, historia))[0];

    console.log(this.paciente);
    console.log(this.historia);
    // Si hay historia obtengo los datos
    if (this.historia != undefined) 
    {
      this.turnos = this.historia.consultas;
      this.datosAdicionales = this.historia.adicionales;

      if (this.datosAdicionales) 
      {

        this.datosAdicionales.forEach(dato => 
          {

            this.turnos.forEach(turno => 
              {
                if (Object.keys(turno) == dato) 
                {
                  console.log(turno[dato]);
                  this.datos.push({
                    key: dato,
                    value: turno[dato]
                  });
              }
          });
        })
        console.log(this.datos);
      }
    }

  }

}
