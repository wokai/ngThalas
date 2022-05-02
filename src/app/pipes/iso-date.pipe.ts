import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoDate'
})
export class IsoDatePipe implements PipeTransform {
  
  transform(time: string | null): string {
    if(time === null || time === undefined) {
      return '0000-00-00';
    }
    return time.substr(0, 10);
  }
}
