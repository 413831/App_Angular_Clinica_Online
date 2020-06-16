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
        type: "spline"
      },
      xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yAxis: {          
        title:{
           text:"Temperature °C"
        } 
     }, 


    };


    HC_exporting(Highcharts);
  }
}
