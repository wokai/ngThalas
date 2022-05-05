import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse }          from '@angular/common/http';
import { Observable, of, from } from 'rxjs';


import { ThxDeviceData }                                      from '../model/thx.core.model';
import { ThxXenonDeviceType, ThxXenonDevice }                 from '../model/thx.xenon.device.model';
import { ThxRespDataType, ThxGasDataType, ThxInhalDataType, ThxEpisodeDataType }  from '../model/thx.db.data.model';



export class RespTimePoint {
  x : number;
  y : number;
  
  constructor(x = new Date().getTime(), y = 0) {
    this.x = x;
    this.y = y;
  }
}

export class ChartTimePoint {
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
export class DatabaseService {
  
  /// Returns (current) time truncated to last integral fraction of given
  /// time interval (60, 10:12 -> 10:00)
  fullMinutes (min: number, d=new Date()) {
    let ms = 60000 * min;
    return new Date(Math.trunc(d.getTime() / ms) * ms);
  }
  private startTime: Date;
  private endTime: Date;

  private url = '/data/db';
  
  
  constructor(private http: HttpClient) {
    
    this.startTime = this.fullMinutes(60);
    this.endTime = new Date(this.startTime.getTime() + 2 * 3600 * 1000);
  }
  
  getDeviceData(): Observable<ThxDeviceData[]> {
    return this.http.get<ThxDeviceData[]> (`${this.url}/device`);
  }

  getEpisodeData(): Observable<ThxEpisodeDataType[]> {
    return this.http.get<ThxEpisodeDataType[]> (`${this.url}/episode`);
  }
  
  getRespData(x: ThxXenonDevice, episode: number): Observable<ThxRespDataType[]> {
    return this.http.get<ThxRespDataType[]> (`${this.url}/resp/${x.id}/${episode}`);
  }
  
}
