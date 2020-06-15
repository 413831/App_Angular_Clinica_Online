import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';
import { MatBottomSheetConfig, MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoTurnoComponent } from '../info-turno/info-turno.component';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { Medico } from 'src/app/clases/Medico';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.css']
})
export class DetalleTurnoComponent implements OnInit {
  @Input() turno:Turno;
  private medico: Medico;
  privados = Turno.atributosNativos;
  atributos: any ;
  imgSrc: string;

  constructor(private _bottomSheet: MatBottomSheet) 
  { 
   
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void{
    if(this.turno)
    {
      this.medico = (JSON.parse(localStorage.getItem('medicos')))
                         .find( medico => medico.id == this.turno.idMedico);
                         console.log(this.medico);
      MiservicioService.descargarImagen(this.medico.imagen)
                       .then( ()=> this.imgSrc = MiservicioService.imgSrc);

      this.atributos = Object.entries(this.turno).filter(tuple => {
        return !this.privados.includes(tuple[0]);
      });
    }
  }

  verDetalles()
  {
    let config = new MatBottomSheetConfig()
    config.data = this.turno;

    this._bottomSheet.open(InfoTurnoComponent, config);
  }

  modificar()
  {

  }

}
