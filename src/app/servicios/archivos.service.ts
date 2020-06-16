import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'; // // typescript without esModuleInterop flag
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { Dia, Turno } from '../clases/Turno';
import { DiaAtencionPipe } from '../pipes/dia-atencion.pipe';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; chatset = UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  private static privados = ["imagen","autorizado","id","rol","direccion","email","telefono",
                            "clave", "avatar", "horasAtencion"];

  constructor() { }

  exportarExcel(json:any[] , nombreArchivo: string): void 
  {
    // Elimino los campos privados que no deben imprimirse
    json = Object.values(json).map(elemento => Object.entries(elemento).map(tuple => 
      {
        if(ArchivosService.privados.includes(tuple[0])) 
        { 
          delete elemento[tuple[0]];
        }
      })
    );

    const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { 
      Sheets : {'data': worksheet}, 
      SheetNames:['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType : 'xlsx', type: 'array' });
    // Llamada al metodo enviar buffer y nombre de archivo
    this.descargarExcel(excelBuffer, nombreArchivo);
  }  

  private descargarExcel(buffer: any, nombreArchivo: string): void
  {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE});
    FileSaver.saveAs(data, nombreArchivo + '_export_' +   Date.now() + EXCEL_EXT);
  }

  exportarPDF(json:any[],  nombreArchivo: string)
  {
    const pdf = new jsPDF();

    let values: any;
    let data = json;  
    
    let header = Object.keys(data[0]).filter(key => !ArchivosService.privados.includes(key));
    // data.map( (elemento,i) => console.log(`Indice:${i} ${Object.values(elemento)}`));
    Turno.ParseNumeroDias(data);

    // Elimino los campos privados que no deben imprimirse
    values = Object.values(data).map(elemento => Object.entries(elemento).map(tuple => 
      {
        if(ArchivosService.privados.includes(tuple[0])) 
        { 
          delete elemento[tuple[0]];
        }
      })
    );
    // Obtengo los valores de los campos a imprimir
    values = data.map( (elemento) => Object.values(elemento));
  
    autoTable(pdf,
    {
      theme: 'striped',
      headStyles: {  halign: 'center', minCellWidth: 15 , cellPadding : 5 },
      bodyStyles: {  halign: 'center', minCellWidth: 15 , cellPadding : 5 },
      margin: { top: 10 },
      head: [header],
      body: values,
    })
    
    console.log("Impresion PDF");
    pdf.save(nombreArchivo + '.pdf');
    Turno.ParseDiasNumero(data);
  }
}
