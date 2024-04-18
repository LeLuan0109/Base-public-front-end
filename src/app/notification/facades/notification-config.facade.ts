import { UserService } from './../../user/services/user.service';
import { NotificationConfigService } from './../services/notification-config.service';
import { Injectable } from "@angular/core";
import { PagingData } from "@shared/models/paging-data.model";
import { BehaviorSubject, EMPTY, Observable, catchError, distinctUntilChanged, filter, from, mergeMap, of, takeLast, tap } from "rxjs";
import { EmailNtfInfo, FilterNtfConfigInput, NtfConfigInfo, NtfConfigInput, TelegramNtfInfo } from "../models/notification-config.model";
import { LazyLoadEvent } from 'primeng/api';
import { convertFilter } from '@shared/utils/filter-params.util';
import { ESolnAction, setTitle } from '@shared/models/type-action.model';
import { ToastService } from '@shared/services/toast.service';
import { ResponseMutate } from '@shared/models/response-mutate.model';
import { ERR_MESSAGE_LABEL } from '@shared/constants/error-message.constant';
import { SocialTopicService } from 'src/app/social-topic/services/social-topic.service';
import { LabelValue, LabelValueStr } from '@shared/models/label-value.model';
import { NtfKeywordConfigService } from '../services/ntf-keyword-config.service';
import { FilterNtfKeywordConfigInput, NtfKeywordConfigInfo, NtfKeywordConfigInput } from '../models/ntf-keyword-config.model';
import { SocialSourceService } from 'src/app/social-source/services/social-source.service';
import { WebsiteSourceService } from 'src/app/website-source/services/website-source.service';
import { UserInfo } from 'src/app/user/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationConfigFacade {
  private _title = 'tùy chỉnh cảnh báo'
  private _ntfConfigPaging = new BehaviorSubject<PagingData<any> | null>(null);
  private _ntfConfigSingle = new BehaviorSubject<any | null>(null);
  private _action = new BehaviorSubject<ESolnAction>(ESolnAction.INSERT);
  private _emails = new BehaviorSubject<EmailNtfInfo[] | null>(null);
  private _telegrams = new BehaviorSubject<TelegramNtfInfo[] | null>(null);
  constructor(
    private notificationConfigService: NotificationConfigService,
    private topicService: SocialTopicService,
    private ntfkeywordConfigService: NtfKeywordConfigService,
    private toastService: ToastService,
    private socialSourceService: SocialSourceService,
    private websiteSourceService: WebsiteSourceService,
    private userService: UserService
  ) {
  }

  get ntfConfigPaging$(): Observable<PagingData<any>> {
    return this._ntfConfigPaging.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get ntfConfigSingle$(): Observable<any> {
    return this._ntfConfigSingle.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set ntfConfigSingle(ntf: any) {
    this._ntfConfigSingle.next(ntf);
  }

  get action$(): ESolnAction {
    return this._action.getValue();
  }

  set action(action: ESolnAction) {
    this._action.next(action);
  }

  get title(): string {
    return setTitle(this.action$, this._title);
  }

  get getAllEmailNtf$(): Observable<EmailNtfInfo[]> {

    return this._emails.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get getAllTelegramNtf$(): Observable<TelegramNtfInfo[]> {
    return this._telegrams.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  filterNtfConfig(event?: LazyLoadEvent) {
    const filter = convertFilter(event?.filters) as FilterNtfConfigInput;
    const sort = event?.sortField ? (event?.sortOrder === 1 ? `-${event?.sortField}` : `+${event?.sortField}`) : undefined;
    return this.notificationConfigService.filterNtfConfig(filter, sort, (event?.first ?? 0) / (event?.rows ?? 10),
      event?.rows ?? 10).subscribe(res => {
        this._ntfConfigPaging.next(res);
      })
  }

  filterNtfkeywordConfig(event?: LazyLoadEvent) {
    const filter = convertFilter(event?.filters) as FilterNtfKeywordConfigInput;
    const sort = event?.sortField ? (event?.sortOrder === 1 ? `-${event?.sortField}` : `+${event?.sortField}`) : '-updated';
    return this.ntfkeywordConfigService.filterNtfKeywordConfig(filter, sort, (event?.first ?? 0) / (event?.rows ?? 10),
      event?.rows ?? 10).subscribe(res => {
        this._ntfConfigPaging.next(res);
      })
  }

  getNtfConfigDetail(id: number): Observable<NtfConfigInfo> {
    return this.notificationConfigService.getNtfConfigDetail(id).pipe(tap(res => {
      this._ntfConfigSingle.next(res);
    }))
  }

  getNtfkeywordConfigDetail(id: number): Observable<NtfKeywordConfigInfo> {
    return this.ntfkeywordConfigService.getNtfKeywordConfigDetail(id).pipe(tap(res => {
      this._ntfConfigSingle.next(res);
    }))
  }

  loadEmail() {
    this.notificationConfigService.getAllEmailNtf().subscribe(res => {
      this._emails.next(res);
    })
  }

  loadTelegram() {
    this.notificationConfigService.getAllTelegramNtf().subscribe(res => {
      this._telegrams.next(res);
    })
  }

  deletes(ntfs: NtfConfigInfo[]): Observable<ResponseMutate> {
    return from(ntfs).pipe(
      mergeMap(res => {
        return this.notificationConfigService.deleteNtfConfig(res.id!);
      }),
      takeLast(1),
      tap((_) => {
        this.toastService.showSuccess('Xóa tuỳ chỉnh cảnh báo thành công');
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return EMPTY;
      })
    );
  }

  deletesNtfKeywordConfig(ntfs: NtfKeywordConfigInfo[]): Observable<ResponseMutate> {
    return from(ntfs).pipe(
      mergeMap(res => {
        return this.ntfkeywordConfigService.deleteNtfKeywordConfig(res.id!);
      }),
      takeLast(1),
      tap((_) => {
        this.toastService.showSuccess('Xóa tuỳ chỉnh cảnh báo thành công');
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return EMPTY;
      })
    );
  }

  save(input: NtfConfigInput, id?: number): Observable<Boolean> {
    if (id) {
      return this.notificationConfigService.updateNtfConfig(id!, input).pipe(
        mergeMap((_) => {
          this.toastService.showSuccess('Cập nhật tuỳ chỉnh cảnh báo thành công');
          return of(true);
        }),
        catchError(err => {
          this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
          return of(false);
        })
      );
    }
    return this.notificationConfigService.createNtfConfig(input).pipe(
      mergeMap((_) => {
        this.toastService.showSuccess('Tạo mới tuỳ chỉnh cảnh báo thành công');
        return of(true);
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of(false);
      })
    )
  }

  saveNtfKeywordConfig(formData: NtfKeywordConfigInput, id?: number): Observable<Boolean> {
    const input = { ...formData };
    input.keyword = formData.keyword ? JSON.stringify((formData.keyword as string[]).filter((r: any) => r && r.trim().length > 0).map(r => r.trim())) : JSON.stringify([]);
    input.profiles = this._convertProfile(formData.sources);
    input.sources = undefined;
    input.name = input.name?.trim();
    input.userIds = (input.userIds && input.userIds.length > 0) ? input.userIds.map((r: { id: number, fullName: string }) => r.id) : undefined;
    if (id) {
      return this.ntfkeywordConfigService.updateNtfKeywordConfig(id!, input).pipe(
        mergeMap((_) => {
          this.toastService.showSuccess('Cập nhật tuỳ chỉnh cảnh báo thành công');
          return of(true);
        }),
        catchError(err => {
          this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
          return of(false);
        })
      );
    }
    return this.ntfkeywordConfigService.createNtfKeywordConfig(input).pipe(
      mergeMap((_) => {
        this.toastService.showSuccess('Tạo mới tuỳ chỉnh cảnh báo thành công');
        return of(true);
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of(false);
      })
    )
  }

  filterTopic(param: { name?: string, sort?: string, pageIndex?: number, pageSize?: number }): Observable<PagingData<LabelValue>> {
    return this.topicService.filterNameSocialTopics(param).pipe(mergeMap(res => {
      const result = { ...res } as PagingData<LabelValue>;
      result.data = res.data?.map(p => ({ label: p.name, value: p.id } as LabelValue));
      return of(result);
    }));
  }

  filterUser(keyword?: string, pageIndex?: number, pageSize?: number): Observable<PagingData<{ id: number, fullName: string, email: string, phone: string }>> {
    return this.userService.searchUser(keyword ?? '', pageIndex ?? 0, pageSize ?? 10).pipe(
      mergeMap(res => {
        res.data?.map(r => ({ id: r.id, fullName: r.fullName, email: r.email }));
        return of(res as PagingData<{ id: number, fullName: string, email: string, phone: string }>);
      })
    );
  }

  searchTopicNotNtfKeywordConfig(param: { keyword?: string, pageIndex?: number, pageSize?: number }): Observable<PagingData<LabelValue>> {
    return this.topicService.searchTopicsNotNtfkeywordConfig(param).pipe(mergeMap(res => {
      const result = { ...res } as PagingData<LabelValue>;
      result.data = res.data?.map(p => ({ label: p.name, value: p.id } as LabelValue));
      return of(result);
    }));
  }

  searchProfile(param: { keyword: string, pageIndex: number, pageSize: number }): Observable<PagingData<LabelValueStr>> {
    return this.socialSourceService.filterSocialSource({
      name: param.keyword,
      groupId: undefined
    }, '-id', param.pageIndex, param.pageSize).pipe(mergeMap(res => {
      const result = { ...res } as PagingData<LabelValueStr>;
      result.data = res.data?.filter(r => r.profileId).map(p => ({ label: p.name, value: p.profileId } as LabelValueStr));
      return of(result);
    }));
  }

  searchDomain(param: { domain: string, pageIndex: number, pageSize: number }): Observable<PagingData<LabelValueStr>> {
    return this.websiteSourceService.filterWebsiteSource({
      domain: param.domain,
      startUrl: undefined,
      detector: undefined,
      scopes: undefined,
      position: undefined,
      sourceType: undefined,
      note: undefined,
      groupIds: undefined
    }, '-id', param.pageIndex, param.pageSize).pipe(mergeMap(res => {
      const result = { ...res } as PagingData<LabelValueStr>;
      result.data = res.data?.filter(r => r.domain).map(p => ({ label: p.domain, value: p.domain } as LabelValueStr));
      return of(result);
    }));
  }

  private _convertProfile(sources?: { type?: 'social' | 'website', profileId?: string }[]): string | undefined {
    if (sources) {
      const social = sources.filter(s => s.type === 'social' && !!s.profileId).map(r => r.profileId);
      const website = sources.filter(s => s.type === 'website' && !!s.profileId).map(r => r.profileId);
      return JSON.stringify({ social, website });
    }
    return JSON.stringify({ socila: [], website: [] });
  }
}