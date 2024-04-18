import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GraphqlService } from "src/app/graphql/graphql.service";
import { PagingData } from "src/app/shared/models/paging-data.model";
import { ResponseMutate } from "src/app/shared/models/response-mutate.model";
import { ApiService } from "@shared/services/api.service";
import {
  CREATE_NTF_KEYWORD_CONFIG_MUTATION, DELETE_NTF_KEYWORD_CONFIG_MUTATION, FILTER_NTF_KEYWORD_CONFIG_QUERY, GET_NTF_KEYWORD_CONFIG_DETAIL_QUERY, UPDATE_NTF_KEYWORD_CONFIG_MUTATION
} from "@graphql/query/ntf-keyword-config.graphql";
import { FilterNtfKeywordConfigInput, NtfKeyConfigLstInfo, NtfKeywordConfigInfo, NtfKeywordConfigInput } from "../models/ntf-keyword-config.model";

@Injectable({
  providedIn: 'root',
})
export class NtfKeywordConfigService {
  API_ROOT = 'user';

  constructor(private graphqlService: GraphqlService, private apiService: ApiService) { }

  filterNtfKeywordConfig(filter: FilterNtfKeywordConfigInput, sort?: string, pageIndex?: number, pageSize?: number): Observable<PagingData<NtfKeyConfigLstInfo>> {
    return this.graphqlService.query(FILTER_NTF_KEYWORD_CONFIG_QUERY, { filter, sort, pageIndex, pageSize });
  }

  getNtfKeywordConfigDetail(id: number): Observable<NtfKeywordConfigInfo> {
    return this.graphqlService.query(GET_NTF_KEYWORD_CONFIG_DETAIL_QUERY, { id });
  }

  createNtfKeywordConfig(input: NtfKeywordConfigInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(CREATE_NTF_KEYWORD_CONFIG_MUTATION, { input });
  }

  updateNtfKeywordConfig(id: number, input: NtfKeywordConfigInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_NTF_KEYWORD_CONFIG_MUTATION, { id, input });
  }

  deleteNtfKeywordConfig(id: number): Observable<ResponseMutate> {
    return this.graphqlService.mutation(DELETE_NTF_KEYWORD_CONFIG_MUTATION, { id });
  }
}
