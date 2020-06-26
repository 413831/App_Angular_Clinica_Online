import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasFaltantes'
})
export class DiasFaltantesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let fechaTurno = new Date(value);
    let diaActual =  new Date();
    let diasFaltantes;

    if(fechaTurno.getMonth() == diaActual.getMonth())
    {
      diasFaltantes = fechaTurno.getDate() - diaActual.getDate();
    }
    else if(fechaTurno.getMonth() > diaActual.getMonth())
    {
      diasFaltantes = Math.abs((diaActual.getDate() - fechaTurno.getDate()) -
                                this.getDaysInMonth(diaActual.getMonth(),diaActual.getFullYear()));
    }
    else
    {
      diasFaltantes = 0;
    }

    return diasFaltantes;
  }

  
  getDaysInMonth(month,year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
   return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
  };

}
