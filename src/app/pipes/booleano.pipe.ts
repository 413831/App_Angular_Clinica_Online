import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleano'
})
export class BooleanoPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    return value ? "Si" : "No";
  }

}
