import { Pipe, PipeTransform } from '@angular/core';
import { Dia } from '../clases/Turno';

@Pipe({
  name: 'disponibilidad'
})
export class DisponibilidadPipe implements PipeTransform {

  transform(value: Dia[], ...args: unknown[]): unknown {
    let dias: string[] = [];

    value.forEach(dia => dias.push(Dia[dia].substring(0,3)));
    
    console.log(dias);
    return dias;
  }

}
