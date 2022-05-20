import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse }          from '@angular/common/http';
import { Observable, Subject, of, from } from 'rxjs';

import { ThxDeviceData }                                      from '../model/thx.core.model';
import { ThxXenonDeviceType, ThxXenonDevice }                 from '../model/thx.xenon.device.model';
import { 
          ThxRespDataType, ThxGasDataType, ThxInhalDataType, ThxEpisodeDataType,
          ThxEpisodeRespDataType, ThxEpisodeCountDataType
       }  from '../model/thx.db.data.model';





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
  
  private _episodes: ThxEpisodeDataType[] = [];
  episodes: Subject<ThxEpisodeDataType[]> = new Subject();
  
    
  
  constructor(private http: HttpClient) {
    
    this.startTime = this.fullMinutes(60);
    this.endTime = new Date(this.startTime.getTime() + 2 * 3600 * 1000);
  }
  
  getDeviceData(): Observable<ThxDeviceData[]> {
    return this.http.get<ThxDeviceData[]> (`${this.url}/device`);
  }

  getEpisodeObservable(): Observable<ThxEpisodeDataType[]> {
    return this.episodes;
  }
  
  getEpisodeUpdate(): void {
    this.http.get<ThxEpisodeDataType[]> (`${this.url}/episode`)
      .subscribe((e: ThxEpisodeDataType[]) => {
        this._episodes.length = 0;
        this._episodes.push(...e);
        this.episodes.next(this._episodes);
      })
  }


  getEpisodeData(): Observable<ThxEpisodeDataType[]> {
    return this.http.get<ThxEpisodeDataType[]> (`${this.url}/episode`);
  }
  
  updateEpisodeData(episode: ThxEpisodeDataType): Observable<number>{
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    /// http returns 1 on success and 0 on error
    return this.http.put<number>(`${this.url}/episode/update/time`, episode)
    .pipe(val => {return val;} );
  }
  
  getEpisodeRespData(): Observable<ThxEpisodeRespDataType[]> {
    return this.http.get<ThxEpisodeRespDataType[]> (`${this.url}/episode/resp/`)
  }
  
  getRespData(episode: number): Observable<ThxRespDataType[]> {
    return this.http.get<ThxRespDataType[]> (`${this.url}/resp/${episode}`);
  }
  
  getGasData(episode: number): Observable<ThxGasDataType[]>{
    return this.http.get<ThxGasDataType[]> (`${this.url}/gas/${episode}`);
  }
  
  deleteEpisode(episode: number): Observable<ThxEpisodeCountDataType> {
    return this.http.get<ThxEpisodeCountDataType> (`${this.url}/delete/${episode}`);
  }
}
