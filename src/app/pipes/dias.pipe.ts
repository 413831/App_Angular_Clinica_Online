import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dias'
})
export class DiasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);
    return null;
  }

}
