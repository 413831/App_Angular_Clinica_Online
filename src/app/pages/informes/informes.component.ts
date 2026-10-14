import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import * as ExportXLSX from 'highcharts/modules/export-data';
import { AppService } from 'src/app/servicios/app.service';
import { Usuario } from 'src/app/clases/Usuario';
import { Sesion } from 'src/app/clases/Sesion';
import { Turno, Dia } from 'src/app/clases/Turno';
import { DiaAtencionPipe } from 'src/app/pipes/dia-atencion.pipe';
import zipcelx from 'zipcelx';
import { ArchivosService } from 'src/app/servicios/archivos.service';
Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Unica+One',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

HighchartExporting(Highcharts);

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


   @ViewChild('container', {static: false}) content: any;

   constructor(private appService: AppService, private archivos: ArchivosService) {
      const rawUser = localStorage.getItem('usuario');
      if (rawUser && rawUser !== 'null') {
         try {
            this.usuario = Object.assign(new Usuario(), JSON.parse(rawUser));
         } catch(e) {
            this.usuario = null;
         }
      }

      const rawSesiones = localStorage.getItem('sesiones');
      if (rawSesiones && rawSesiones !== 'null') {
         try {
            this.sesiones = JSON.parse(rawSesiones).map((s: any) => Object.assign(new Sesion(), s));
         } catch(e) {
            this.sesiones = [];
         }
      } else {
         // Generar sesiones de prueba para visualización de métricas
         const uId = this.usuario ? this.usuario.id : '-adm1';
         const uNom = this.usuario ? this.usuario.nombre : 'Admin General';
         this.sesiones = [
            Sesion.CrearSesion(uId, uNom, new Date(Date.now() - 86400000 * 4).toString()),
            Sesion.CrearSesion(uId, uNom, new Date(Date.now() - 86400000 * 3).toString()),
            Sesion.CrearSesion(uId, uNom, new Date(Date.now() - 86400000 * 2).toString()),
            Sesion.CrearSesion(uId, uNom, new Date(Date.now() - 86400000 * 1).toString()),
            Sesion.CrearSesion(uId, uNom, new Date().toString())
         ];
      }
   }

   ngOnInit(): void {
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

   guardarExcel(): void
   {
     this.archivos.exportarExcel(this.sesiones, "sesiones");
   }
 
   guardarPDF(): void
   {
     this.archivos.exportarPDF(this.sesiones, "sesiones");
   }
}
