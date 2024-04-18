import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  private formatErrors(error: any) {
    return throwError(() => error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.apiBaseUrl}${path}`, { params })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          return rs.response;
        }),
        catchError(this.formatErrors)
      );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.apiBaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          return rs.response;
        }),
        catchError(this.formatErrors)
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiBaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          return rs.response;
        }),
        catchError(this.formatErrors)
      );
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http
      .patch(`${environment.apiBaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          return rs.response;
        }),
        catchError(this.formatErrors)
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}${path}`).pipe(
      map((rs: any) => {
        if (rs.error !== undefined && rs.error !== null) {
          throw new Error(rs.error.cause);
        }
        return rs.response;
      }),
      catchError(this.formatErrors)
    );
  }

  postUploadFile(path: string, body: FormData): Observable<any> {
    return this.http
      .post(`${environment.apiBaseUrl}${path}`, body, {
        headers: {
          Accept: 'application/json',
          enctype: 'multipart/form-data',
        },
      }).pipe(
        catchError(this.formatErrors)
      );
  }

  getJSON(path: string): Observable<any> {
    return this.http.get(path);
  }

  export(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}${path}`, {
      params,
      observe: 'response',
      responseType: 'blob',
    });
  }
}
