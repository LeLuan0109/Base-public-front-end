import { Injectable } from "@angular/core";
import { NotificationService } from "../services/notification.service";
import { FilterNtfInput, NtfInfo } from "../models/notification.model";
import { BehaviorSubject, Observable, distinctUntilChanged, filter, tap } from "rxjs";
import { PagingData } from "@shared/models/paging-data.model";
import { LazyLoadEvent } from "primeng/api";
import { convertFilter } from "@shared/utils/filter-params.util";
import { sortByTime } from '../models/notification.model'
@Injectable({
    providedIn: 'root',
})
export class NotificationFacade {
    private _ntfPaging = new BehaviorSubject<PagingData<NtfInfo> | null>(null);
    private _ntftop = new BehaviorSubject<any | null>(null);
    private _ntfSingle = new BehaviorSubject<NtfInfo | null>(null);

    constructor(private notificationService: NotificationService) {
    }

    get ntfPaging$(): Observable<PagingData<NtfInfo>> {
        return this._ntfPaging.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }

    get ntfTop$(): Observable<any> {
        return this._ntftop.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }


    get ntfSingle$(): Observable<NtfInfo> {
        return this._ntfSingle.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }

    set ntfSingle(ntf: NtfInfo) {
        this._ntfSingle.next(ntf);
    }

    filterNtf(sendType: number, index: number, event?: LazyLoadEvent) {
        const filter = convertFilter(event?.filters) as FilterNtfInput;
        filter.sendType = sendType;
        filter.ntfType = 'KEYWORD'
        const sort = event?.sortField ? (event?.sortOrder === 1 ? `-${event?.sortField}` : `+${event?.sortField}`) : '-send_time';
        return this.notificationService.filterNtf(filter, sort, (event?.first ?? 0) / (event?.rows ?? 10),
            event?.rows ?? 10).subscribe(res => {
                this._ntfPaging.next(res);
            })
    }

    getNtfDetail(id: number): Observable<NtfInfo> {
        return this.notificationService.getNtfDetail(id).pipe(tap(res => {
            this._ntfSingle.next(res);
        }))
    }

    getNtfTop(top: number) {
        return this.notificationService.getNtfTop(top).subscribe(async (res) => {   
            // Kiểm tra trong storage đã có noti hay chưa
            let _messages = sortByTime(JSON.parse(localStorage.getItem('__noti') ?? '[{}]') || [])
            // Kiểm tra noti mới nhất có trùng với noti đã lưu hay không?
            // Nếu trùng hoàn toàn thì sẽ ko làm gì cả
            // Nếu trùng một phần sẽ merge 2 chuổi để lấy ra 10 noti gần nhất

            let _messageStartIndex = await _messages.findIndex((item: any) => item.time === res[res.length - 1]?.sendTime)
            let _msg: any[] = []

            await res.forEach((item: NtfInfo, index: number) => {
                if (index < 9 - _messageStartIndex) {
                    _msg.unshift({
                    time: item.sendTime,
                    checked: false,
                    severity: 'info', summary: new Date(item.sendTime! * 1000).toLocaleString(),
                        detail: item.message?.slice(0, 50),
                    contents : item.message
                })
                }

            }) 
            let _newMsg = _messageStartIndex ? [..._msg, ..._messages.slice(0, _messageStartIndex + 1)] : _msg
            await localStorage.setItem('__noti', JSON.stringify(_newMsg))
            let _unRead = 0
            _newMsg.forEach((item: any) => { _unRead += item.checked ? 0 : 1 })

            this._ntftop.next({ mes: _newMsg, unRead: _unRead })
        })
    }

    readNtf(item: any) {
        let _messages: any[] = sortByTime(JSON.parse(localStorage.getItem('__noti') ?? '[{}]') || [])
        const idx = _messages.findIndex((_item: any) => _item.time == item.time)
        _messages[idx].checked = true
        localStorage.setItem('__noti', JSON.stringify(_messages))
        let _unRead = 0
        _messages.forEach((item: any) => { _unRead += item.checked ? 0 : 1 })
        this._ntftop.next({ mes: _messages, unRead: _unRead })
    }

}