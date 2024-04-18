import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GraphqlService } from "src/app/graphql/graphql.service";
import {
  CREATE_USER_MUTATION, DELETE_USER_MUTATION, FILTER_USER_QUERY, UPDATE_USER_MUTATION, GET_USER_DETAIL_QUERY, UPDATE_ME_MUTATION, GET_ALL_USER_QUERY, SEARCH_USER_QUERY, SEARCH_USER_NOT_GROUP_QUERY, UPDATE_GROUP_ID_USER_MUTATION
} from "src/app/graphql/query/user.graphql";
import { PagingData } from "src/app/shared/models/paging-data.model";
import { ResponseMutate } from "src/app/shared/models/response-mutate.model";
import { FilterUserInput, UserInfo, UserInput } from "../models/user.model";
import { UpdateMeInput } from 'src/app/setting/models/user.modal';
import { ApiService } from "@shared/services/api.service";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_ROOT = 'user';

  constructor(private graphqlService: GraphqlService, private apiService: ApiService) { }

  filterUser(filter: FilterUserInput, pageIndex: number, pageSize: number): Observable<PagingData<UserInfo>> {
    return this.graphqlService.query(FILTER_USER_QUERY, { filter, pageIndex, pageSize });
  }

  getAllUserNotAccount(): Observable<UserInfo[]> {
    return this.graphqlService.query(GET_ALL_USER_QUERY);
  }

  searchUser(keyword: string, pageIndex: number, pageSize: number): Observable<PagingData<UserInfo>> {
    return this.graphqlService.query(SEARCH_USER_QUERY, { keyword, pageIndex, pageSize });
  }

  getUserDetail(id: number): Observable<UserInfo> {
    return this.graphqlService.query(GET_USER_DETAIL_QUERY, { id });
  }

  createUser(input: UserInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(CREATE_USER_MUTATION, { input });
  }

  updateUser(id: number, input: UserInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_USER_MUTATION, { id, input });
  }

  deleteUser(id: number): Observable<ResponseMutate> {
    return this.graphqlService.mutation(DELETE_USER_MUTATION, { id });
  }

  updateMe(input: UpdateMeInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_ME_MUTATION, { input });
  }

  getTemplate(): Observable<any> {
    return this.apiService.export(`${this.API_ROOT}/get-template`);
  }

  upload(body: FormData): Observable<ResponseMutate> {
    return this.apiService.postUploadFile(`${this.API_ROOT}/import`, body);
  }

  export(params: HttpParams): Observable<any> {
    return this.apiService.export(`${this.API_ROOT}/export`, params);
  }

  searchUserNotGroup(keyword: string, pageIndex: number = 0, pageSize: number = 10): Observable<PagingData<{fullName: string, id: number}>> {
    return this.graphqlService.query(SEARCH_USER_NOT_GROUP_QUERY, { keyword, pageIndex, pageSize });
  }

  updateGrouIdUser(groupId: number, ids: number[]): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_GROUP_ID_USER_MUTATION, { groupId, ids });
  }

  exportIds(ids: number[]): Observable<any> {
    return this.apiService.export(`${this.API_ROOT}/export-ids`, { ids } as unknown as HttpParams);
  }
}
