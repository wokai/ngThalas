import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeTime'
})
export class LocaleTimePipe implements PipeTransform {
  
  transform(time: string | null): string {
    if(time === null ||  time === undefined) {
      return '00:00:00';
    }
    return new Date(time).toTimeString().substr(0, 8);
  }
}
