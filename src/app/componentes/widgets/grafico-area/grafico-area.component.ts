import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-grafico-area',
  templateUrl: './grafico-area.component.html',
  styleUrls: ['./grafico-area.component.css']
})
export class GraficoAreaComponent implements OnInit {
  public highchart;
  public chartOptions;

  constructor() { }

  ngOnInit(): void {
    this.crearGrafico();
  }

  crearGrafico() {
    this.highchart = Highcharts;


    this.chartOptions = {   
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Average fruit consumption during one week'
      },
      subtitle : {
         style: {
            position: 'absolute',
            right: '0px',
            bottom: '10px'
         }
      },
      legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: -150,
         y: 100,
         floating: true,
         borderWidth: 1,
        
        
      },
      xAxis:{
         categories: ['Monday','Tuesday','Wednesday','Thursday',
            'Friday','Saturday','Sunday'] 
      },
      yAxis : {
         title: {
            text: 'Number of units'
         }
      },
      tooltip : {
         shared: true, valueSuffix: ' units'
      },
      plotOptions : {
         area: {
            fillOpacity: 0.5 
         }
      },
      credits:{
        enabled: false
      },
      series: [
         {
            name: 'John',
            data: [3, 4, 3, 5, 4, 10, 12]
         }, 
         {
            name: 'Jane',
            data: [1, 3, 4, 3, 3, 5, 4]
         }
      ]
   };


    HC_exporting(Highcharts);
  }
}
