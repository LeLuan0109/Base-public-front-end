import { ResponseMutate } from '../../shared/models/response-mutate.model';
import {
  GET_MESSAGES_QUERY,
  GET_MESSAGE_DETAIL_QUERY,
  GET_TOTAL_UNREAD_MSG,
  UPDATE_STATUS_MUTATION
} from '../../graphql/query/ntf-message.graphql';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MsgInfo, UnreadMsgInfo } from '../models/ntf-message.model';
import { GraphqlService } from './../../graphql/graphql.service';
import { PagingData } from '../../shared/models/paging-data.model';

@Injectable({
  providedIn: 'root'
})
export class NtfMessageService {
  constructor(private graphqlService: GraphqlService) { }

  getMsgList(pageIndex?: number, pageSize?: number): Observable<PagingData<MsgInfo>> {
    return this.graphqlService.query(GET_MESSAGES_QUERY, {
      pageIndex,
      pageSize
    });
  }

  getMsgDetail(id: string): Observable<MsgInfo> {
    return this.graphqlService.query(GET_MESSAGE_DETAIL_QUERY, {
      id
    });
  }

  getTotalUnreadMsg(): Observable<UnreadMsgInfo> {
    return this.graphqlService.query(GET_TOTAL_UNREAD_MSG);
  }

  updateStatus(id: string, status: number): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_STATUS_MUTATION, {
      id,
      status
    });
  }
}
