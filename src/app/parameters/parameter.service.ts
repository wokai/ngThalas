import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse }          from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MedibusParameterType, MedibusParameter } from '../model/medibus.param.model';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  
  private url = '/data/param';
  constructor(private http: HttpClient) { }
  
  getMedibusParameters(): Observable<MedibusParameter []> {
    return this.http.get<MedibusParameterType []>(this.url)
      .pipe(map((d:MedibusParameterType[]) => d.map((m: MedibusParameterType) => MedibusParameter.from(m))));
  }
}
