import { MsgService } from '../../websocket/msg.service';
import { Injectable } from '@angular/core';
import { PagingData } from '../../shared/models/paging-data.model';
import { BehaviorSubject, Observable, catchError, distinctUntilChanged, filter, map, of, tap } from 'rxjs';
import { MsgInfo, UnreadMsgInfo } from '../models/ntf-message.model';
import { LazyLoadEvent } from 'primeng/api';
import { NtfMessageService } from '../services/ntf-message.service';
import { ResponseMutate } from '../../shared/models/response-mutate.model';
import { MsgMetaData } from 'src/app/websocket/model/msg.model';

@Injectable({
  providedIn: 'root'
})
export class NtfMessageFacade {
  private _ntfMsgPaging = new BehaviorSubject<PagingData<MsgInfo> | null>(null);
  private _ntfMsgSingle = new BehaviorSubject<MsgInfo | null>(null);
  private _totalUnreadMsg = new BehaviorSubject<UnreadMsgInfo | null>(null);

  constructor(private ntfMessageService: NtfMessageService, private msgService: MsgService) {}

  get ntfMsgPaging$(): Observable<PagingData<MsgInfo>> {
    return this._ntfMsgPaging.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set ntfMsgPaging$(msg: any) {
    this._ntfMsgPaging.next(msg);
  }

  get ntfMsgSingle$(): Observable<MsgInfo> {
    return this._ntfMsgSingle.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get totalUnreadMsg$(): Observable<UnreadMsgInfo> {
    return this._totalUnreadMsg.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set totalUnreadMsg$(unreadMsginfo: any) {
    this._totalUnreadMsg.next(unreadMsginfo);
  }

  getMsgList(event?: LazyLoadEvent) {
    return this.ntfMessageService.getMsgList(event?.first ?? 0, event?.rows ?? 25).subscribe(res => {
      this._ntfMsgPaging.next(res);
    });
  }

  getMessages(event?: LazyLoadEvent) {
    return this.ntfMessageService.getMsgList(event?.first ?? 0, event?.rows ?? 25);
  }

  getMsgDetail(id: string): Observable<MsgInfo> {
    return this.ntfMessageService.getMsgDetail(id).pipe(
      tap(res => {
        this._ntfMsgSingle.next(res);
      })
    );
  }

  getTotalUnreadMsg(): Observable<UnreadMsgInfo> {
    return this.ntfMessageService.getTotalUnreadMsg().pipe(
      tap(res => {
        this._totalUnreadMsg.next(res);
      })
    );
  }

  updateStatus(id: string, status: number): Observable<ResponseMutate> {
    return this.ntfMessageService.updateStatus(id, status).pipe(catchError(_ => of({} as ResponseMutate)));
  }

  getLiveMsgData() {
    return this.msgService._messages$.pipe(
      map(({ data }) => {
        let msgData: MsgMetaData | null = null;
        try {
          msgData = JSON.parse(data);
        } catch (_) {}
        return msgData;
      }),
      filter((data: any) => data)
    );
  }
}
