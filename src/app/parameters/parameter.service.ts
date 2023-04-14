import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse }          from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MedibusParameterType, MedibusParameter, TransactResultType, TransactResult } from '../model/medibus.param.model';

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
  
  updateMedibusParameter(p: MedibusParameter): Observable<TransactResult>{
    return this.http.post<TransactResultType>(`${this.url}/upsert`, p).pipe(map(p => TransactResult.from(p)));
  }
  
  createMedibusParameter(p: MedibusParameter): Observable<TransactResult>{
    return this.http.post<TransactResultType>(`${this.url}/save`, p).pipe(map(p => TransactResult.from(p)));
  }
}
