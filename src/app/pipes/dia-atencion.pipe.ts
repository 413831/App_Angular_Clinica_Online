import { Pipe, PipeTransform } from '@angular/core';
import { Dia } from '../clases/Turno';

@Pipe({
  name: 'diaAtencion'
})
export class DiaAtencionPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Dia[value];
  }

}
