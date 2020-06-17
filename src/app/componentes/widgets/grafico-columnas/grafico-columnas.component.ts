import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Usuario } from 'src/app/clases/Usuario';
import { Turno, Estado } from 'src/app/clases/Turno';
import { Especialidad } from 'src/app/clases/Medico';

interface Serie
{
   name: string,
   data : any,
}


@Component({
  selector: 'app-grafico-columnas',
  templateUrl: './grafico-columnas.component.html',
  styleUrls: ['./grafico-columnas.component.css']
})
export class GraficoColumnasComponent implements OnInit {
  public usuario: Usuario;
  public turnos: Turno[] = [];
  public highchart;
  public chartOptions;
  public data;
  public especialidades : Especialidad[] = [];

  constructor() 
  {
   this.usuario = JSON.parse(localStorage.getItem('usuario'));
      
      if (this.usuario) 
      {
         this.usuario = Object.assign(new Usuario, this.usuario);

         this.turnos = (JSON.parse(localStorage.getItem('turnos'))
                              .map(turno => Object.assign(new Turno, turno)));
      }

   }

  ngOnInit(): void {
   this.procesarDatos();
    this.crearGrafico();
  }

  procesarDatos()
  {
     this.data = this.turnos;
     let aux = [];
   
     // Por cada fecha de inicio obtengo el día
     // El array de día contendrá dias diferentes para las categorias
     for (let index = 0; index < this.turnos.length; index++) 
     {
         const element = this.data[index];
         const especialidad =  element.especialidad;
         
         if(!this.especialidades.includes(especialidad))
         {
            console.log("In");
            this.especialidades.push(especialidad);
            // aux.push(new Date(element.fechaInicio));
         } 
     }

     console.log(this.especialidades);

     this.especialidades.forEach((especialidad) =>
     {
         let operaciones = 0;
         this.turnos.forEach(turno => 
         {        
            if(turno.especialidad == especialidad && turno.estado == Estado.Atendido)
            {
               operaciones++;
            }
         });
         aux.push({
            name : especialidad,
            data : [operaciones]
         });
      
     });
     
     console.log(aux);
     this.data = aux;
  }

  crearGrafico() {
    this.highchart = Highcharts;


    this.chartOptions = {   
      chart: {
         type: 'column'
      },
      title: {
         text: 'Turnos atendidos por día'
      },
      credits : {
         enabled : false
      },
      xAxis:{
         categories: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
         crosshair: true        
      },     
      yAxis : {
         min: 0,
         title: {
            text: 'Cantidad de turnos'         
         }      
      },
      tooltip : {
         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
      },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: this.data
   };


    HC_exporting(Highcharts);
  }
}
