import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytePrefix'
})
export class BytePrefixPipe implements PipeTransform {

  private units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  transform(bytes: number | null, precision: number = 2): string {
    if(bytes === null) {
      return '';
    }
    let unit = 0;
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }
    return `${bytes.toFixed(+precision)} ${this.units[unit]}`;
  }

}
