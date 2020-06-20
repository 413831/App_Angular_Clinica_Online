import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasFaltantes'
})
export class DiasFaltantesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let date = new Date(value);
    let diaActual =  new Date();
    let diasFaltantes = date.getDate() - diaActual.getDate();

    return diasFaltantes > 0 ? diasFaltantes : 0;
  }

}
