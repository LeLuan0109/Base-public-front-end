import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { FORGOT_PASS_MUTATE, LOGIN_MUTATE, REGISTER_MUTATE, VERIFY_MUTATE } from 'src/app/graphql/query/auth.graphql';
import { UserInfo } from 'src/app/shared/models/user-info.model';
import { CredInput } from '../models/cred-Input.model';
import { TokenResponse } from '../models/token.model';
import { ResponseMutate } from '@shared/models/response-mutate.model';
import { RegisterInput } from '../models/regiter.model';
import { ME_QUERY } from '@graphql/query/account.graphql';
import { ApiV2Service } from '@shared/services/api-v2.service';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';
import { error } from 'highcharts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: any;
  constructor(
    private graphqlService: GraphqlService,
    private aipV2Service: ApiV2Service
  ) { }

  login(input: CredInput): Observable<TokenResponse> {
    return this.aipV2Service.post('author/login', undefined, input)
  }

  getAuthor(): Observable<UserInfo> {
    return this.aipV2Service.get('author/getAuthor', undefined, undefined);
  }

  getMe(): Observable<UserInfo> {
    // this.messagingService.receiveMessage()
    return this.graphqlService.query<UserInfo>(ME_QUERY);
  }

  forgotPass(input: { email: string }): Observable<ResponseMutate> {
    return this.graphqlService.mutation(FORGOT_PASS_MUTATE, { input });
  }

  register(input: RegisterInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(REGISTER_MUTATE, { input });
  }
  verify(input: TokenResponse): Observable<ResponseMutate> {
    return this.graphqlService.mutation(VERIFY_MUTATE, { input });
  }
}
