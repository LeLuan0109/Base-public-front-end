import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiV2Service {
  constructor(private http: HttpClient) { }

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
  });

  private formatErrors(error: any) {
    return throwError(() => error);
  }

  get(path: string, queryName?: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiV2BaseUrl}${path}`, { params, headers: this.defaultHeaders }).pipe(
      map((rs: any) => {

        if (rs.error !== undefined && rs.error !== null) {
          console.log("rs : ", rs);

          throw new Error(rs.error.cause);
        }
        if (queryName) {
          return rs.data[queryName];
        } else {
          console.log("rs : ", rs);

          return rs.data;
        }
      }),
      catchError(this.formatErrors)
    );
  }

  post(path: string, queryName?: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.apiV2BaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          console.log("rs : ", rs);
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          if (queryName) {
            return rs.data[queryName];
          } else {
            return rs.data;
          }
        }),
        catchError(this.formatErrors)
      );
  }


  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiV2BaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          return rs.data;
        }),
        catchError(this.formatErrors)
      );
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http
      .patch(`${environment.apiV2BaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          return rs.data;
        }),
        catchError(this.formatErrors)
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiV2BaseUrl}${path}`).pipe(
      map((rs: any) => {
        if (rs.error !== undefined && rs.error !== null) {
          throw new Error(rs.error.cause);
        }
        return rs.data;
      }),
      catchError(this.formatErrors)
    );
  }

  postUploadFile(path: string, body: FormData): Observable<any> {
    return this.http
      .post(`${environment.apiV2BaseUrl}${path}`, body, {
        headers: {
          Accept: 'application/json',
          enctype: 'multipart/form-data',
        },
      })
      .pipe(catchError(this.formatErrors));
  }

  getJSON(path: string): Observable<any> {
    return this.http.get(path);
  }

  export(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiV2BaseUrl}${path}`, {
      params,
      observe: 'response',
      responseType: 'blob',
    });
  }
}
