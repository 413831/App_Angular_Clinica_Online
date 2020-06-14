import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.css']
})
export class DetalleTurnoComponent implements OnInit {
  @Input() turno:Turno;
  privados = ["modificado","id","idPaciente","idMedico","comentarios","detalle"];
  atributos: any ;

  constructor() 
  { 
   
  }

  ngOnInit(): void {
    if(this.turno)
    {
      this.atributos = Object.entries(this.turno).filter(tuple => {
        return !this.privados.includes(tuple[0]);
      });
      console.log(this.atributos);
    }
  }

}
