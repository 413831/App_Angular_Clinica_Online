import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';
import { Dia, Turno } from 'src/app/clases/Turno';

interface Serie {
   name: string,
   data: any,
}


@Component({
   selector: 'app-grafico-barras',
   templateUrl: './grafico-barras.component.html',
   styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit {
   public turnos: Turno[];
   public series: Serie[];
   public data;
   public highchart;
   public chartOptions;
   public semana: Dia[] = [Dia.Lunes, Dia.Martes, Dia.Miercoles, Dia.Jueves, Dia.Viernes, Dia.Sabado];

   constructor() 
   {
      this.turnos = (JSON.parse(localStorage.getItem('turnos'))
                          .map(turno => Object.assign(new Turno, turno)));
   }

   ngOnInit(): void {
      this.procesarDatos();
      this.crearGrafico();
   }

   procesarDatos() 
   {
      let turnosPorDia = [];

      this.semana.forEach(dia => 
      {
         let cantidad = 0;

         // Busco operaciones de la especialidad y guardo por cada dia
         this.turnos.forEach(turno => 
         {                    
            if (new Date(turno.fecha).getDay() == dia) {                  
               cantidad++;
            }
         });

         turnosPorDia.push(cantidad);            
      });
      
      this.data = {
         name : "Turnos",
         data : turnosPorDia
      };
   }

   crearGrafico() {
      this.highchart = Highcharts;

      this.chartOptions = {
         chart: {
            type: 'bar'
         },
         title: {
            text: 'Cantidad de turnos por dia'
         },
         legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 500,
            y: 100,
            floating: true,
            borderWidth: 1
         },
         xAxis: {
            categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado'], title: {
               text: null
            }
         },
         yAxis: {
            min: 0, title: {
               text: 'Cantidad de turnos por dia', align: 'high'
            },
            labels: {
               overflow: 'justify'
            }
         },
         tooltip: {
            valueSuffix: ''
         },
         plotOptions: {
            bar: {
               dataLabels: {
                  enabled: true
               }
            }
         },
         credits: {
            enabled: false
         },
         series: [this.data]
      };

      HighchartExporting(Highcharts);
      HighchartExportData(Highcharts);

   }

}
