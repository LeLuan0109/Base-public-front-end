import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GraphqlService } from "src/app/graphql/graphql.service";
import { PagingData } from "src/app/shared/models/paging-data.model";
import { ResponseMutate } from "src/app/shared/models/response-mutate.model";
import { ChangePasswordInput, UpdateMeInput } from 'src/app/setting/models/user.modal';
import { ApiService } from "@shared/services/api.service";
import { CREATE_NTF_CONFIG_MUTATION, DELETE_NTF_CONFIG_MUTATION, FILTER_NTF_CONFIG_QUERY, GET_NFT_CONFIG_BY_TOPIC_QUERY, GET_NTF_CONFIG_DETAIL_QUERY, UPDATE_NTF_CONFIG_MUTATION, GET_ALL_EMAIL_NTF_QUERY, GET_ALL_TELEGRAM_NTF_QUERY  } from "@graphql/query/notification-config.graphql";
import { EmailNtfInfo, FilterNtfConfigInput, NtfConfigInfo, NtfConfigInput, TelegramNtfInfo } from "../models/notification-config.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationConfigService {
  API_ROOT = 'user';

  constructor(private graphqlService: GraphqlService, private apiService: ApiService) { }

  filterNtfConfig(filter: FilterNtfConfigInput, sort?: string, pageIndex?: number, pageSize?: number): Observable<PagingData<NtfConfigInfo>> {
    return this.graphqlService.query(FILTER_NTF_CONFIG_QUERY, { filter, sort, pageIndex, pageSize });
  }

  getNtfConfigDetail(id: number): Observable<NtfConfigInfo> {
    return this.graphqlService.query(GET_NTF_CONFIG_DETAIL_QUERY, { id });
  }

  getAllEmailNtf(): Observable<EmailNtfInfo[]> {
    return this.graphqlService.query(GET_ALL_EMAIL_NTF_QUERY);
  }

  getAllTelegramNtf(): Observable<TelegramNtfInfo[]> {
    return this.graphqlService.query(GET_ALL_TELEGRAM_NTF_QUERY);
  }

  getNftConfigByTopicId(topicId: number): Observable<NtfConfigInfo[]> {
    return this.graphqlService.query(GET_NFT_CONFIG_BY_TOPIC_QUERY, { topicId });
  }

  createNtfConfig(input: NtfConfigInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(CREATE_NTF_CONFIG_MUTATION, { input });
  }

  updateNtfConfig(id: number, input: NtfConfigInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_NTF_CONFIG_MUTATION, { id, input });
  }

  deleteNtfConfig(id: number): Observable<ResponseMutate> {
    return this.graphqlService.mutation(DELETE_NTF_CONFIG_MUTATION, { id });
  }
}
