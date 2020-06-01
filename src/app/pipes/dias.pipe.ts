import { Pipe, PipeTransform } from '@angular/core';
import { Dia } from '../clases/Turno';

@Pipe({
  name: 'dias'
})
export class DiasPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {
    let arrayStr: string[] = [];
    value.map( dia => arrayStr.push(Dia[dia]));
    console.log(arrayStr);
    
    return arrayStr.toString();
  }

}
