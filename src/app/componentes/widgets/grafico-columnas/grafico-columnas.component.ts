import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';
import { Usuario } from 'src/app/clases/Usuario';
import { Turno, Estado, Dia } from 'src/app/clases/Turno';
import { Especialidad } from 'src/app/clases/Medico';
import { ArchivosService } from 'src/app/servicios/archivos.service';

interface Serie {
   name: string,
   data: any,
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
   public series: Serie[] ;
   public especialidades: Especialidad[] = [];
   public semana: Dia[] = [Dia.Lunes, Dia.Martes, Dia.Miercoles, Dia.Jueves, Dia.Viernes, Dia.Sabado];

   constructor(private archivos: ArchivosService) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

      if (this.usuario) {
         this.usuario = Object.assign(new Usuario, this.usuario);

         this.turnos = (JSON.parse(localStorage.getItem('turnos'))
            .map(turno => Object.assign(new Turno, turno)));
      }

   }

   ngOnInit(): void {
      this.procesarDatos();
      this.crearGrafico();
   }

   procesarDatos() {
      this.data = this.turnos;
      this.series = [];
      let operacionesPorDia = [];
      
      // Se obtienen las especialidades de los turnos para las categorias
      this.obtenerCategorias();
      // Por cada especialidad
      this.especialidades.forEach((especialidad) => 
      {
         operacionesPorDia = [];
         // Por cada dia de la semana 
         this.semana.forEach(dia => 
         {
            let operaciones = 0;

            // Busco operaciones de la especialidad y guardo por cada dia
            this.turnos.forEach(turno => 
            {            
               if (turno.especialidad == especialidad && turno.estado == Estado.Atendido &&
                  new Date(turno.fecha).getDay() == dia) {
                  operaciones++;
               }
            });
            operacionesPorDia.push(operaciones);            
         });
         this.series.push({
            name: especialidad,
            data: operacionesPorDia
         });
      });
   }

      
   guardarPDF(): void
   {
     this.archivos.exportarPDF(this.data, "medicosporturno");
   }

   obtenerCategorias() 
   {
      for (let index = 0; index < this.turnos.length; index++) 
      {
         const element = this.turnos[index];
         const especialidad = element.especialidad;

         if (!this.especialidades.includes(especialidad)) {
            console.log("In");
            this.especialidades.push(especialidad);
         }
      }
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
         subtitle: {
            text: 'Informe de turnos según especialidad por día de la semana'
         },
         credits: {
            enabled: false
         },
         xAxis: {
            categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            crosshair: true
         },
         yAxis: {
            min: 0,
            title: {
               text: 'Cantidad de turnos'
            }
         },
         tooltip: {
            headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
               '<td style = "padding:0"><b>{point.y} </b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
         },
         plotOptions: {
            column: {
               pointPadding: 0.2,
               borderWidth: 0
            }
         },
         series: this.series
      };


      HighchartExporting(Highcharts);
      HighchartExportData(Highcharts);
   }
}
