import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';
import { Medico } from 'src/app/clases/Medico';
import { Dia } from 'src/app/clases/Turno';
import { ArchivosService } from 'src/app/servicios/archivos.service';

interface Serie {
   name: string,
   data: any,
}


@Component({
   selector: 'app-grafico-area',
   templateUrl: './grafico-area.component.html',
   styleUrls: ['./grafico-area.component.css']
})
export class GraficoAreaComponent implements OnInit {
   public highchart;
   public chartOptions;
   public medicos: Medico[];
   public data = [];
   public series: Serie[] = [];
   public totalMedicos: number;
   public semana: Dia[] = [Dia.Lunes, Dia.Martes, Dia.Miercoles, Dia.Jueves, Dia.Viernes, Dia.Sabado];

   constructor(private archivos: ArchivosService)
   {
      this.medicos = (JSON.parse(localStorage.getItem('medicos'))
                             .map(medico => Object.assign(new Medico, medico)));
   }

   ngOnInit(): void {
      this.procesarDatos();
      this.crearGrafico();
   }

   guardarPDF(): void
   {
     this.archivos.exportarPDF(this.series, "semanamedicos");
   }

   procesarDatos() {
      let medicosPorDia = [];
      this.totalMedicos = this.medicos.length;

      this.semana.forEach(dia =>
      {
         let cantidadMedicos = 0;

         this.medicos.forEach(medico =>
         {
            if(medico.diasAtencion.includes(dia))
            {
               cantidadMedicos++;
            }
         });
         medicosPorDia.push(cantidadMedicos);
      });
      this.series.push({
         name: "Medicos",
         data: medicosPorDia
      });
   }

   crearGrafico() {
      this.highchart = Highcharts;


      this.chartOptions = {
         chart: {
            type: 'areaspline'
         },
         title: {
            text: 'Cantidad de medicos por día de la semana'
         },
         subtitle: {
            style: {
               position: 'absolute',
               right: '0px',
               bottom: '10px'
            }
         },
         legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: -150,
            y: 100,
            floating: true,
            borderWidth: 1,


         },
         xAxis: {
            categories: this.semana.map(dia => Dia[dia])
         },
         yAxis: {
            title: {
               text: 'Cantidad de medicos'
            }
         },
         tooltip: {
            shared: true, valueSuffix: ' profesionales'
         },
         plotOptions: {
            area: {
               fillOpacity: 0.5
            }
         },
         credits: {
            enabled: false
         },
         series: this.series
      };


      HighchartExporting(Highcharts);
      HighchartExportData(Highcharts);
   }
}
