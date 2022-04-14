import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class TimePoint {
  x : number;
  y : number;
  
  constructor(x = new Date().getTime(), y = 0) {
    this.x = x;
    this.y = y;
  }
}


@Injectable({
  providedIn: 'root'
})
export class TimeService extends Observable<TimePoint> {

  /// Returns (current) time truncated to last integral fraction of given
  /// time interval (60, 10:12 -> 10:00)
  fullMinutes (min: number, d=new Date()) {
    let ms = 60000 * min;
    return new Date(Math.trunc(d.getTime() / ms) * ms);
  }
  
  private startTime: Date;
  private endTime: Date;
  
  constructor() {
    super(subscriber => {
      let counter = 0;
      let time = new Date().getTime();
      
      
      /// Emit random values every second for 10 seconds
      let int = setInterval(() => {
        subscriber.next(new TimePoint(time, 5 + (Math.random() * 2 )));
        time += 5 * 60 * 1000;
        
        if(counter++ >= 10) {
          clearInterval(int);
          subscriber.complete();
        }
      }, 1000);
      
    })
    
    this.startTime = this.fullMinutes(60);
    this.endTime = new Date(this.startTime.getTime() + 2 * 3600 * 1000);
  }
  
  getStartTime() { return this.startTime.getTime(); }
  getEndTime()   { return this.endTime.getTime();   }
}
