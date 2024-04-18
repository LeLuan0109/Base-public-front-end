import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GqlTag } from 'src/app/graphql/gql';
import { environment } from '../../environments/environment';

export declare type EmptyObject = {
  [key: string]: any;
};

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private http: HttpClient) { }

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: ['application/json', 'text/plain', '*/*'],
  });

  private formatErrors(error: any) {
    return throwError(() => error);
  }

  query<T, V = EmptyObject>(query: GqlTag, variables?: V): Observable<T> {
    return this.http
      .post(`${environment.graphQLUri}`,
        {
          operationName: `${query.operationName.charAt(0).toLocaleUpperCase()}${query.operationName.substring(1)}`,
          query: query.query,
          variables
        }, {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.errors !== undefined && rs.errors !== null && rs.errors.length > 0) {
            throw rs.errors[0];
          }
          return rs.data[query.operationName];
        }),
        catchError(this.formatErrors)
      );
  }


  mutation<T, V = EmptyObject>(mutation: GqlTag, variables?: V): Observable<T> {
    return this.http
      .post(`${environment.graphQLUri}`,
        {
          operationName: `${mutation.operationName.charAt(0).toLocaleUpperCase()}${mutation.operationName.substring(1)}`,
          query: mutation.query,
          variables
        }, {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.errors !== undefined && rs.errors !== null && rs.errors.length > 0) {
            throw rs.errors[0];
          }
          return rs.data[mutation.operationName];
        }),
        catchError(this.formatErrors)
      );
  }
}

