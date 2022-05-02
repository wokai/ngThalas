import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { ThxDeviceData, ThxStatusType, ThxIntervalType  } from '../model/thx.core.model';
import { ThxComStatusType, ThxComResult, ThxComStatus } from '../model/thx.com.status.model';
import { ThxOsStatusType, ThxOsStatus }                 from '../model/thx.os.status.model';
import { ThxXenonStatusType, ThxXenonStatus }           from '../model/thx.xenon.status.model';
import { ThxVentDataType, ThxVentData }                 from '../model/thx.vent.data.model';
import { ThxXenonDeviceType, ThxXenonDevice }           from '../model/thx.xenon.device.model';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private url = '/data/device';
  constructor(private http: HttpClient) { }
  
  
  getXenonDevices(): Observable<ThxXenonDevice []> {
    return this.http.get<ThxDeviceData []>(this.url)
      .pipe(map((d:ThxDeviceData[]) => d.map((x: ThxDeviceData) => ThxXenonDevice.from(x))));
  }
  ping(x: ThxXenonDevice): Observable<ThxComResult<boolean> > {
    return this.http.get<ThxComResult<boolean> >(`${this.url}/ping/${x.id}`);
  }
  getXenonStatus(x: ThxXenonDevice): Observable<ThxComResult<ThxXenonStatusType> >{ 
    return this.http.get<ThxComResult<ThxXenonStatusType> >(`${this.url}/port/status/${x.id}`);
  }
  getOsData(x: ThxXenonDevice): Observable<ThxComResult<ThxOsStatusType> > { 
    return this.http.get<ThxComResult<ThxOsStatusType> >(`${this.url}/os/${x.id}`)
  }
  getPortPaths(x: ThxXenonDevice): Observable<ThxComResult<string[]> > { 
    return this.http.get<ThxComResult<string[]> >(`${this.url}/port/paths/${x.id}`)
  }
  getPortOpen(x: ThxXenonDevice): Observable<ThxComResult<ThxXenonStatusType> >{
    return this.http.get<ThxComResult<ThxXenonStatusType> >(`${this.url}/port/open/${x.id}`)
  }
  getPortClose(x: ThxXenonDevice): Observable<ThxComResult<ThxXenonStatusType> > {
    return this.http.get<ThxComResult<ThxXenonStatusType> > (`${this.url}/port/close/${x.id}`)
  }
  getPortStop(x: ThxXenonDevice): Observable<ThxComResult<ThxXenonStatusType> > {
    return this.http.get<ThxComResult<ThxXenonStatusType> > (`${this.url}/port/stop/${x.id}`)
  }
  getVentData(x: ThxXenonDevice): Observable<ThxComResult<ThxVentDataType> > {
    return this.http.get<ThxComResult<ThxVentDataType> > (`${this.url}/port/vent/${x.id}`);
  }
  
  /// Interval 
  getIntervalStart(): Observable<ThxIntervalType> {
    return this.http.get<ThxIntervalType>(`${this.url}/interval/start`);
  }
  getIntervalStop(): Observable<ThxIntervalType> {
    return this.http.get<ThxIntervalType>(`${this.url}/interval/stop`);
  }
  getIntervalStatus(): Observable<ThxIntervalType> {
    return this.http.get<ThxIntervalType>(`${this.url}/interval/status`);
  }
  
}