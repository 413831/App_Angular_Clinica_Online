import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';
import { Turno, Dia } from 'src/app/clases/Turno';
import { Sesion } from 'src/app/clases/Sesion';
import { Usuario } from 'src/app/clases/Usuario';



@Component({
  selector: 'app-grafico-lineas',
  templateUrl: './grafico-lineas.component.html',
  styleUrls: ['./grafico-lineas.component.css']
})
export class GraficoLineasComponent implements OnInit {
  @Input() sesiones: Sesion[];
  private usuario: Usuario;
  public highchart;
  public chartOptions;
  private data;
  private XCategories : Array<any>;
  // private horarios: number[] = [  0, 1, 2, 3 , 4, 5, 6 ,7, 8 ,9 , 10 ,11 ,12 ,13 ,14 ,15 ,16, 17 ,];
  private dias: Dia[] = [];

  constructor() 
  {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
      
    if (this.usuario) 
    {
       this.usuario = Object.assign(new Usuario, this.usuario);

       this.sesiones = (JSON.parse(localStorage.getItem('sesiones'))
                            .filter(sesion => this.usuario.id == sesion.idUsuario)
                            .map(sesion => Object.assign(new Sesion, sesion)));
    }
  }
  
  ngOnInit(): void {
    this.procesarDatos();
    this.crearGrafico();
  }

  ordenarDias(diaA: Sesion, diaB: Sesion) 
  {
    if (new Date(diaA.fechaInicio).getTime() > new Date(diaB.fechaInicio).getTime()) {
      return 1;
    }
    else if (new Date(diaA.fechaInicio).getTime() < new Date(diaB.fechaInicio).getTime()) {
      return -1;
    }
    else {
      return 0;
    }
  }

  procesarDatos()
  {
     // Ordeno las sesiones por día
     this.data = [];
     this.data = this.sesiones.sort((a, b) => this.ordenarDias(a, b)).reverse();
     let aux = [];
 
     console.log(this.data);
     // Por cada fecha de inicio obtengo el día
     // El array de día contendrá dias diferentes para las categorias
     for (let index = 0; index < this.data.length ; index++) 
     {
       const element = this.data[index];
       console.log(element);
       const diaSemana =  new Date(element.fechaInicio).getDay();
 
       // Al estar ordenado de manera descendente va a guardar el último logueo del día
       if(!this.dias.includes(diaSemana))
       {
         console.log("In");
         this.dias.push(diaSemana);
         aux.push(new Date(element.fechaInicio));
       } 
     }
     console.log(aux);
     this.data = aux.reverse().map(fecha => (<Date>fecha).getHours());
     this.XCategories = this.dias.map(dia => Dia[dia]).reverse();
  }



  crearGrafico() {
    this.highchart = Highcharts;

    this.chartOptions = {
      chart: {
        type: "spline"
      },
      title: {
        text: "Inicios de sesión del usuario"
      },
      subtitle: {
        text: `Usuario: ${this.usuario.nombre}`
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.XCategories
      },
      yAxis: {
        title: {
          text: "Horarios"
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },
      tooltip: {
        valueSuffix: " hr"
      },
      series: [{
        name: 'Usuario',
        data: this.data
        }
      ]
    };


    HighchartExporting(Highcharts);
    HighchartExportData(Highcharts);
  }
}
