import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';
import { Turno } from 'src/app/clases/Turno';
import { Especialidad } from 'src/app/clases/Medico';
import { ArchivosService } from 'src/app/servicios/archivos.service';


@Component({
   selector: 'app-grafico-torta',
   templateUrl: './grafico-torta.component.html',
   styleUrls: ['./grafico-torta.component.css']
})
export class GraficoTortaComponent implements OnInit {
   public highchart;
   public chartOptions;
   public especialidades : Especialidad[] = [];
   public data = [];
   public turnos: Turno[];
   public totalTurnos: number;
   public totalMedicos: number;

   constructor(private archivos: ArchivosService) 
   {
      this.turnos = (JSON.parse(localStorage.getItem('turnos'))
                          .map(turno => Object.assign(new Turno, turno)));
   }

   ngOnInit(): void 
   {
      this.procesarDatos();
      this.crearGrafico();
   }

    
   guardarPDF(): void
   {
     this.archivos.exportarPDF(this.data, "medicosporturno");
   }

   procesarDatos()
   {
      this.totalTurnos = this.turnos.length;
      this.totalMedicos = 0;
      this.obtenerCategorias();

      this.especialidades.forEach(especialidad =>
      {
         let cantidadMedicos = 0;
         let value = [];

         this.turnos.forEach(turno => 
         {
            if(turno.especialidad == especialidad)
            {
               cantidadMedicos++;
            }
         });
         this.totalMedicos += cantidadMedicos;
         value.push(especialidad,cantidadMedicos / this.totalTurnos);
         this.data.push(value);
      });
   }

   obtenerCategorias() 
   {
      for (let index = 0; index < this.turnos.length; index++) 
      {
         const element = this.turnos[index];
         const especialidad = element.especialidad;

         if (!this.especialidades.includes(especialidad)) {
            this.especialidades.push(especialidad);
         }
      }
   }


   crearGrafico() {
      this.highchart = Highcharts;

      this.chartOptions = {   
         chart : {
            plotBorderWidth: null,
            plotShadow: false
         },
         title : {
            text: 'Proporcion de medicos por turno'   
         },
         subtitle : {
            text : `Total de turnos ${this.totalTurnos}`
         },
         tooltip : {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
         },
         credits :{
            enabled: false
         },
         plotOptions : {
            pie: {
               allowPointSelect: true,
               cursor: 'pointer',
         
               dataLabels: {
                  enabled: false           
               },
         
               showInLegend: true
            }
         },
         series : [{
            type: 'pie',
            name: 'Porcentaje ',
            data: this.data
         }]
      };
      HighchartExporting(Highcharts);
      HighchartExportData(Highcharts);
   }

}
