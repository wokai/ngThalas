import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSegments'
})
export class TimeSegmentsPipe implements PipeTransform {
  
  transform(seconds: number | null): string {
    if(seconds === null) {
      return '';
    }
    seconds = Math.floor(seconds)
    
    let d = Math.floor(seconds / 86400);
    seconds -= d * 86400;
    let h = Math.floor(seconds / 3600);
    seconds -= h * 3600;
    let m = Math.floor(seconds / 60);
    seconds -= m * 60;
    let s = seconds;
    
    let dd = d > 0 ? `${d}D ` : "";
    let hd = h > 0 ? `${h}H ` : "";
    let md = m > 0 ? `${m}M ` : "";
    let sd = s > 0 ? `${s}S ` : "";
    return `${dd}${hd}${md}${sd}`;
  }

}
