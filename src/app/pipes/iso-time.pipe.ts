import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoTime'
})
export class IsoTimePipe implements PipeTransform {
  
  transform(time: string | null): string {
    if(time === null) {
      return '00:00:00';
    }
    return time.substr(11, 8);
  }
}
