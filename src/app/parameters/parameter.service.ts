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
  private _transactResult = new TransactResult();
  
  
  constructor(private http: HttpClient) { }
  
  get transactResult() { return this._transactResult; }
  
  passTransactResult(p: TransactResultType) {
    this.transactResult.assign(p);
    return this._transactResult;
  }
  
  getMedibusParameters(): Observable<MedibusParameter []> {
    return this.http.get<MedibusParameterType []>(this.url)
      .pipe(map((d:MedibusParameterType[]) => d.map((m: MedibusParameterType) => MedibusParameter.from(m))));
  }
  
  updateMedibusParameter(p: MedibusParameter): Observable<TransactResult>{
    return this.http.post<TransactResultType>(`${this.url}/upsert`, p).pipe(map(p =>  this.passTransactResult(p)));
  }
  
  createMedibusParameter(p: MedibusParameter): Observable<TransactResult>{
    return this.http.post<TransactResultType>(`${this.url}/save`, p).pipe(map(p => this.passTransactResult(p)));
  }
}
