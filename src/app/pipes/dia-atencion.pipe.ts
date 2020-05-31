import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaAtencion'
})
export class DiaAtencionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let arrayString: string[] = value.split(",");
    arrayString = arrayString.map( value => value.concat(" - "));

    return arrayString.join(" - ");
  }

}
