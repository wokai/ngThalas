import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse }          from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MedibusParameterType } from '../model/medibus.param.model';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  
  private url = '/data/param';
  constructor(private http: HttpClient) { }
  
  getMedibusParameters(): Observable<MedibusParameterType []> {
    return this.http.get<MedibusParameterType []>(this.url)
      .pipe(map((d:ThxDeviceData[]) => d.map((x: ThxDeviceData) => ThxXenonDevice.from(x))));
  }
  
}
