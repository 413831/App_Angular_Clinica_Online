import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaAtencion'
})
export class DiaAtencionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let diaAbbr = value.toLocaleUpperCase().substring(0,2);

    return diaAbbr;
  }

}
