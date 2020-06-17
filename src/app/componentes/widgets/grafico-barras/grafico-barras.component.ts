import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit {
  public highchart;
  public chartOptions;

  constructor() { }

  ngOnInit(): void {
  }

  crearGrafico() {
    this.highchart = Highcharts;

    this.chartOptions = {   
      chart: {
         type: 'bar'
      },
      title: {
         text: 'Historic World Population by Region'
      },
      legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 250,
         y: 100,
         floating: true,
         borderWidth: 1        
         },
         xAxis:{
            categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {
            text: null
         } 
      },
      yAxis : {
         min: 0, title: {
            text: 'Population (millions)', align: 'high'
         },
         labels: {
            overflow: 'justify'
         }
      },
      tooltip : {
         valueSuffix: ' millions'
      },
      plotOptions : {
         bar: {
            dataLabels: {
               enabled: true
            }
         }
      },
      credits:{
         enabled: false
      },
      series: [
         {
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
         }, 
         {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
         }, 
         {
            name: 'Year 2008',
            data: [973, 914, 4054, 732, 34]      
         }
      ]
   };
  

  }

}
