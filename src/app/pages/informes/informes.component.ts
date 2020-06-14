import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import * as ExportXLSX from 'highcharts/modules/export-data';
HC_exporting(Highcharts);

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'myHighchart';
   
    data = [{
            name: 'Turnos',
            data: [15, 20, 10, 30, 17, 10]
         },{
            name: 'Medicos',
            data: [13, 10, 9, 15, 16, 10]
         }];
   
    highcharts = Highcharts;
    
    chartOptions = {   
      chart: {
         type: "spline"
      },
      title: {
         text: "Cantidad de Turnos por Día"
      },
      xAxis:{
         categories:["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
      },
      exporting:{
         enabled: true,
      },
      yAxis: {          
         title:{
            text:"Turnos"
         } 
      },
      series: this.data
    };

}
