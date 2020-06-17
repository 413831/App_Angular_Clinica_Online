import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
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
  private horarios: string[] = [  "00:00", "00:30","01:00", "01:30" , "02:00", "02:30", "03:00",
                                  "03:30", "04:00","04:30", "05:00" , "05:30", "06:00", "06:30",
                                  "07:00", "07:30","08:00", "08:30" , "09:00", "09:30", "10:00", 
                                  "10:30","11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                                  "14:00","14:30", "15:00", "15:30", "16:00", "16:30", "17:00", 
                                  "17:30","18:00", "18:30","19:00", "19:30", "20:00", "20:30",
                                  "21:00", "21:30", "22:00","22:30", "23:00", "23:30"];
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
    // Ordeno las sesiones por día
    this.data = this.sesiones.sort((a, b) => this.ordenarDias(a, b)).reverse();
    let aux = [];

    // Por cada fecha de inicio obtengo el día
    // El array de día contendrá dias diferentes para las categorias
    for (let index = 0; this.dias.length < 6; index++) 
    {
      const element = this.data[index];
      const diaSemana =  new Date(element.fechaInicio).getDay();

      // Al estar ordenado de manera descendente va a guardar el último logueo del día
      if(!this.dias.includes(diaSemana))
      {
        console.log("In");
        this.dias.push(diaSemana);
        aux.push(new Date(element.fechaInicio));
      } 
    }
    this.data = aux.reverse().map(fecha => fecha.getHours());

    this.XCategories = this.dias.map(dia => Dia[dia]).reverse();
    console.log(this.XCategories);
    console.log(this.data);
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
        text: this.usuario.nombre
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
        categories: this.horarios
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },
      tooltip: {
        valueSuffix: " °C"
      },
      series: [{
        name: 'Usuario',
        data: this.data
      },
      // {
      //   name: 'New York',
      //   data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      // },
      // {
      //   name: 'Berlin',
      //   data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      // },
      // {
      //   name: 'London',
      //   data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      // }
     ]
    };


    HC_exporting(Highcharts);
  }
}
