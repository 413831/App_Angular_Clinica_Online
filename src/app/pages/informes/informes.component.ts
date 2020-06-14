import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import * as ExportXLSX from 'highcharts/modules/export-data';
import { AppService } from 'src/app/servicios/app.service';
import { Usuario } from 'src/app/clases/Usuario';
import { Sesion } from 'src/app/clases/Sesion';
import { Turno, Dia } from 'src/app/clases/Turno';
import { DiaAtencionPipe } from 'src/app/pipes/dia-atencion.pipe';
HC_exporting(Highcharts);

interface Valor{
   name : string,
   data : any[]
}

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
   usuario: Usuario;
   sesiones: Sesion[];
   turnos: Turno[];
   dias: string[] = Turno.dias.map(dia => new DiaAtencionPipe().transform(dia));
   horarios: string[] = Turno.horarios;
   highcharts = Highcharts;
   horas: Array<any> = [];
   valoresHoras : Valor;
   labelsEspecialidades: string[] = [];


   data = [{
      name: 'Turnos',
      data: [15, 20, 10, 30, 17, 10]
   },{
      name: 'Medicos',
      data: [13, 10, 9, 15, 16, 10]
   }];

  constructor(private appService : AppService) 
  {
      this.appService.getLoginData();
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

     if(this.usuario)
     {
         this.usuario = Object.assign(new Usuario, this.usuario);
         console.log(JSON.parse(localStorage.getItem('sesiones')));
         this.sesiones = (JSON.parse(localStorage.getItem('sesiones'))
                              .filter( sesion => this.usuario.id == sesion.idUsuario)
                              .map( sesion => Object.assign(new Sesion, sesion)));      
         ///
         this.turnos = (JSON.parse(localStorage.getItem('turnos')))
                             .map(turno => Object.assign(new Turno, turno));
         this.turnos.forEach(turno => {
            if(!this.labelsEspecialidades.includes(turno.especialidad))
            {
               this.labelsEspecialidades.push(turno.especialidad);
            }
         });
         
         this.crearGraficos();
     }
   }

  ngOnInit(): void {
  }

  crearGraficos()
  {
      let horas: number[] = [];

      this.sesiones.sort((a,b) => this.ordenarDias(a,b));
      console.log(this.sesiones);
      this.sesiones.forEach(sesion => {         
         console.log(new Date(sesion.fechaInicio).getHours());
         console.log(`${new Date(sesion.fechaInicio).getDay()} - ${new Date(sesion.fechaInicio).getHours()}`);
         horas.push(new Date(sesion.fechaInicio).getHours());
      })

      this.valoresHoras = {
         name : "Horas",
         data : horas
      }
  }


  configurarGrafico(XData : any, XTitle: string, YData: any, YTitle: string, data: any, titulo: string)
  {
  
   let chartOptions = {   
      chart: {
         type: "spline"
      },
      title: {
         text: titulo
      },
      xAxis:{
         categories: XData
      },
      exporting:{
         enabled: true,
      },
      yAxis: {          
         title:{
            text: YTitle
         }, 
         categories: YData
      },
      series: [data]
    };

    return chartOptions;
  }

  ordenarDias(diaA : Sesion, diaB: Sesion)
  {
        if(new Date(diaA.fechaInicio).getDay() > new Date(diaB.fechaInicio).getDay())
        {
            return 1;
        }
        else if(new Date(diaA.fechaInicio).getDay() < new Date(diaB.fechaInicio).getDay())
        {
            return -1;
        }
        else
        {
            return 0;
        }
  }
   
    
   
    
    
    

}
