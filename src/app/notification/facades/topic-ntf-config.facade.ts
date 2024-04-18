import { SocialSourceService } from './../../social-source-lot/services/social-source-lot.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, catchError, distinctUntilChanged, filter, from, mergeMap, takeLast, tap } from "rxjs";
import { PagingData } from "@shared/models/paging-data.model";
import { LazyLoadEvent } from "primeng/api";
import { convertFilter } from "@shared/utils/filter-params.util";
import { FilterTopicNtfInput, TopicNtfKeywordInfo, TopicNtfInfo } from "../models/topic-ntf.model";
import { TopicNtfConfigService } from "../services/topic-ntf-config.service";
import { ToastService } from "@shared/services/toast.service";
import { ERR_MESSAGE_LABEL } from "@shared/constants/error-message.constant";
import { ESolnAction } from "@shared/models/type-action.model";
import { NotificationConfigService } from "../services/notification-config.service";
import { NtfConfigInfo } from "../models/notification-config.model";
import { ISocialSourceInfo } from "src/app/social-source/models/social-source.model";

@Injectable({
  providedIn: 'root',
})
export class TopicNtfConfigFacade {
  private _ntfPaging = new BehaviorSubject<PagingData<TopicNtfKeywordInfo> | null>(null);
  private _action = new BehaviorSubject<ESolnAction>(ESolnAction.INSERT);
  private _topicNtf = new BehaviorSubject<TopicNtfKeywordInfo | null>(null);
  private _ntfConfigs = new BehaviorSubject<NtfConfigInfo[] | null>(null);
  private _profiles = new BehaviorSubject<ISocialSourceInfo[] | null>(null);

  constructor(
    private topicNtfConfigService: TopicNtfConfigService,
    private toastService: ToastService,
    private ntfConfigService: NotificationConfigService,
    private socialSourceService: SocialSourceService,
  ) {
  }

  get ntfPaging$(): Observable<PagingData<TopicNtfKeywordInfo>> {
    return this._ntfPaging.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get action$(): ESolnAction {
    return this._action.getValue();
  }

  set action(action: ESolnAction) {
    this._action.next(action);
  }

  get topicNtf$(): TopicNtfKeywordInfo {
    return this._topicNtf.getValue() ?? {};
  }

  set topicNtf(topicNtf: TopicNtfKeywordInfo) {
    this._topicNtf.next(topicNtf);
  }

  get ntfConfigs$(): Observable<NtfConfigInfo[]> {
    return this._ntfConfigs.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get profiles$(): Observable<ISocialSourceInfo[]> {
    return this._profiles.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    )
  }

  filterTopicNtf(event?: LazyLoadEvent) {
    const filter = convertFilter(event?.filters) as FilterTopicNtfInput;
    return this.topicNtfConfigService.filterTopicNtfKeyword(filter, '-updated', (event?.first ?? 0) / (event?.rows ?? 10),
      event?.rows ?? 10).subscribe(res => {
        this._ntfPaging.next(res);
      })
  }

  approveNtfConfig(topic: { id: number, ntfStatus: boolean }): Observable<TopicNtfInfo> {
    return this.topicNtfConfigService.addNtfConfig(topic.id, [], topic.ntfStatus === true ? 1 : 0).pipe(
      tap(() => {
        this.toastService.showSuccess(topic.ntfStatus === true ? 'Duyện chuyên đề thuộc diện cảnh báo thành công' : 'Huỷ chuyên đề thuộc diện cảnh báo thành công');
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return EMPTY;
      })
    );
  }

  // getNftConfigByTopicId(topicId: number) {
  //   this.ntfConfigService.getNftConfigByTopicId(topicId).subscribe(res => {
  //     this._ntfConfigs.next(res);
  //   })
  // }

  getAllSocialSourceByProfileId(profileIds: string[]) {
    this.socialSourceService.getAllSocialSourceByProfileId(profileIds).subscribe(res => {
      this._profiles.next(res);
    })
  }
}