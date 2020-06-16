import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import * as ExportXLSX from 'highcharts/modules/export-data';
import { AppService } from 'src/app/servicios/app.service';
import { Usuario } from 'src/app/clases/Usuario';
import { Sesion } from 'src/app/clases/Sesion';
import { Turno, Dia } from 'src/app/clases/Turno';
import { DiaAtencionPipe } from 'src/app/pipes/dia-atencion.pipe';
import zipcelx from 'zipcelx';
Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Unica+One',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

HC_exporting(Highcharts);

interface Valor {
   name: string,
   data: any[]
}

@Component({
   selector: 'app-informes',
   templateUrl: './informes.component.html',
   styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
   usuario: Usuario;
   sesiones: Sesion[];
   turnos: Turno[];
   dias: string[] = Turno.dias.map(dia => new DiaAtencionPipe().transform(dia));
   horarios: string[] = Turno.horarios;
   highcharts = Highcharts;
   horas: Array<any> = [];
   valoresHoras: Valor;
   labelsEspecialidades: string[] = [];



   
  ////////////////////////////////

   @ViewChild('container', {static: false}) content: any;

   constructor(private appService: AppService) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

      if (this.usuario) {
         this.usuario = Object.assign(new Usuario, this.usuario);
         console.log(JSON.parse(localStorage.getItem('sesiones')));
         this.sesiones = (JSON.parse(localStorage.getItem('sesiones'))
            .filter(sesion => this.usuario.id == sesion.idUsuario)
            .map(sesion => Object.assign(new Sesion, sesion)));
         ///
         this.turnos = (JSON.parse(localStorage.getItem('turnos')))
            .map(turno => Object.assign(new Turno, turno));


         this.crearGraficos();
      }
   }

   ngOnInit(): void {
   }

   crearGraficos() {
      let horas: number[] = [];

      this.sesiones.sort((a, b) => this.ordenarDias(a, b));
      console.log(this.sesiones);
      this.sesiones.forEach(sesion => {
         console.log(new Date(sesion.fechaInicio).getHours());
         console.log(`${new Date(sesion.fechaInicio).getDay()} - ${new Date(sesion.fechaInicio).getHours()}`);
         horas.push(new Date(sesion.fechaInicio).getHours());
      })

      this.valoresHoras = {
         name: "Horas",
         data: horas
      }
   }

   ordenarDias(diaA: Sesion, diaB: Sesion) {
      if (new Date(diaA.fechaInicio).getDay() > new Date(diaB.fechaInicio).getDay()) {
         return 1;
      }
      else if (new Date(diaA.fechaInicio).getDay() < new Date(diaB.fechaInicio).getDay()) {
         return -1;
      }
      else {
         return 0;
      }
   }

   calcularOperaciones() {
      // Obtengo las diferentes especialidades para mostrar
      this.turnos.forEach(turno => {
         if (!this.labelsEspecialidades.includes(turno.especialidad)) {
            this.labelsEspecialidades.push(turno.especialidad);
         }
      });
   }

  

//    (function (H) {
//       if (window.zipcelx && H.getOptions().exporting) {
//           H.Chart.prototype.downloadXLSX = function () {
//               var div = document.createElement('div'),
//                   name,
//                   xlsxRows = [],
//                   rows;
//               div.style.display = 'none';
//               document.body.appendChild(div);
//               rows = this.getDataRows(true);
//               xlsxRows = H.map(rows.slice(1), function (row) {
//                   return H.map(row, function (column) {
//                       return {
//                           type: typeof column === 'number' ? 'number' : 'string',
//                           value: column
//                       };
//                   });
//               });
  
//               // Get the filename, copied from the Chart.fileDownload function
//               if (this.options.exporting.filename) {
//                   name = this.options.exporting.filename;
//               } else if (this.title && this.title.textStr) {
//                   name = this.title.textStr.replace(/ /g, '-').toLowerCase();
//               } else {
//                   name = 'chart';
//               }
  
//               window.zipcelx({
//                   filename: name,
//                   sheet: {
//                       data: xlsxRows
//                   }
//               });
//           };
  
//           // Default lang string, overridable in i18n options
//           H.getOptions().lang.downloadXLSX = 'Download XLSX';
  
//           // Add the menu item handler
//           H.getOptions().exporting.menuItemDefinitions.downloadXLSX = {
//               textKey: 'downloadXLSX',
//               onclick: function () {
//                   this.downloadXLSX();
//               }
//           };
  
//           // Replace the menu item
//           var menuItems = H.getOptions().exporting.buttons.contextButton.menuItems;
//           menuItems[menuItems.indexOf('downloadXLS')] = 'downloadXLSX';
//       }
  
//   }(Highcharts));

}
