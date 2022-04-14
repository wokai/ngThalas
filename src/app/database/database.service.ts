import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse }          from '@angular/common/http';

import { ThxXenonDeviceType, ThxXenonDevice }                 from '../model/thx.xenon.device.model';
import { ThxVentDataType, ThxGasDataType, ThxInhalDataType }  from '../model/thx.db.data.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url = '/data/db';
  constructor(private http: HttpClient) { }
  
  
  getRespData(x: ThxXenonDevice): Observable<ThxVentDataType[]> {
    return this.http.get<ThxVentDataType[]> (`${this.url}/db/vent/${x.id}`);
  }
  
}
