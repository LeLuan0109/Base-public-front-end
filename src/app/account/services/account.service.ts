import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GraphqlService } from "src/app/graphql/graphql.service";
import {
  CREATE_ACCOUNT_MUTATION, DELETE_ACCOUNT_MUTATION, FILTER_ACCOUNT_QUERY, UPDATE_ACCOUNT_MUTATION,
  CHANGE_PASSWORD_MUTATION, GET_ACCOUNT_DETAIL_QUERY, SET_PASSWORD_MUTATION, UPDATE_STATUS_MUTATION
} from "src/app/graphql/query/account.graphql";
import { PagingData } from "src/app/shared/models/paging-data.model";
import { ResponseMutate } from "src/app/shared/models/response-mutate.model";
import { FilterAccountInput, AccountInfo, AccountInput, ChangePasswordInput } from "../models/account.model";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private graphqlService: GraphqlService) { }

  filterAccount(filter: FilterAccountInput, pageIndex: number, pageSize: number): Observable<PagingData<AccountInfo>> {
    return this.graphqlService.query(FILTER_ACCOUNT_QUERY, { filter, pageIndex, pageSize });
  }

  getAccountDetail(id: number): Observable<AccountInfo> {
    return this.graphqlService.query(GET_ACCOUNT_DETAIL_QUERY, { id });
  }

  createAccount(input: AccountInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(CREATE_ACCOUNT_MUTATION, { input });
  }

  updateAccount(id: number, input: AccountInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_ACCOUNT_MUTATION, { id, input });
  }

  deleteAccount(id: number): Observable<ResponseMutate> {
    return this.graphqlService.mutation(DELETE_ACCOUNT_MUTATION, { id });
  }

  setPassword(id: number, password: string): Observable<ResponseMutate> {
    return this.graphqlService.mutation(SET_PASSWORD_MUTATION, { id, password });
  }

  changePassword(input: ChangePasswordInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(CHANGE_PASSWORD_MUTATION, { input });
  }

  updateStatus(id: number, status: number): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_STATUS_MUTATION, { id, status });
  }
}
