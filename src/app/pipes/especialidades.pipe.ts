import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from '../clases/Medico';

@Pipe({
  name: 'especialidades'
})
export class EspecialidadesPipe implements PipeTransform {

  transform(value: Especialidad[], ...args: unknown[]): unknown {
    let stringValue: string[] = [];

    value.forEach( especialidad => stringValue.push(especialidad));
    
    return value;
  }

}
