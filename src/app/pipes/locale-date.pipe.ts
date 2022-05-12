import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate'
})
export class LocaleDatePipe implements PipeTransform {
  
  transform(time: string | null): string {
    if(time === null || time === undefined) {
      return '0000-00-00';
    }
    return new Date(time).toLocaleDateString();
  }
}
