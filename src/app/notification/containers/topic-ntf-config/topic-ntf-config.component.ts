import { LazyLoadEvent } from 'primeng/api';
import { TopicNtfKeywordInfo, TopicNtfInfo } from '../../models/topic-ntf.model';
import { TopicNtfConfigFacade } from '../../facades/topic-ntf-config.facade';
import { Component, OnInit } from '@angular/core';
import { EToolTableAction } from '@based/m-tooltable/models/tooltable.model';
import { EToolBarAction } from '@based/m-toolbar/models/toolbar.model';
import { ESolnAction } from '@shared/models/type-action.model';
import { TIME_TYPE } from '@shared/constants/notification.constant';
import { MDialogService } from '@based/m-dialog/services/m-dialog.service';
import { TopicNtfConfigApproveComponent } from '../topic-ntf-config-approve/topic-ntf-config-approve.component';
import { NotificationConfigFacade } from '../../facades/notification-config.facade';

@Component({
  selector: 'app-topic-ntf-config',
  templateUrl: './topic-ntf-config.component.html',
  styleUrls: ['./topic-ntf-config.component.scss']
})
export class TopicNtfConfigComponent implements OnInit {
  statusOpt = [{ label: 'Đã duyệt', value: 1 }, { label: 'Chưa duyệt', value: 0 },]
  delegateKeys = [];
  timeType = TIME_TYPE;

  topicNtfs: TopicNtfKeywordInfo[] = [];
  selectedItems: TopicNtfKeywordInfo[] = [];
  totalElement = 0;
  first = 0;

  constructor(
    private topicNtfConfigFacade: TopicNtfConfigFacade,
    private mDialogService: MDialogService,
    private notificationConfigFacade: NotificationConfigFacade) {
  }

  ngOnInit(): void {
    this.topicNtfConfigFacade.ntfPaging$.subscribe(res => {
      this.topicNtfs = res.data ?? [];
      this.totalElement = res.totalCount ?? 0;
    })
  }

  lazyLoad(event?: LazyLoadEvent) {
    this.selectedItems = [];
    this.topicNtfConfigFacade.filterTopicNtf(event);
  }

  // toolbarClick(e: EToolBarAction) {
  //   switch (e) {
  //     case EToolBarAction.APPROVE:
  //       // this._create();
  //       this._addNtf(this.selectedItems, ESolnAction.UPDATE);
  //       break;
  //   }
  // }

  toolTableClick(e: EToolTableAction, item: TopicNtfKeywordInfo) {
    switch (e) {
      // case EToolTableAction.VIEW:
      //   this.topicNtfConfigFacade.getNftConfigByTopicId(item.id!);
      //   if(item.ntfKeywordConfig && item.ntfKeywordConfig.removed === false) {
      //     const ntfKeyword = JSON.parse(item.ntfKeywordConfig.profiles!);
      //     if(ntfKeyword.social && ntfKeyword.social.length > 0) {
      //       this.topicNtfConfigFacade.getAllSocialSourceByProfileId(ntfKeyword.social);
      //     }
      //   }
      //   this._addNtf([item], ESolnAction.VIEW);
      //   break;
      case EToolTableAction.UPDATE_STATUS:
        this._addNtf(item, ESolnAction.UPDATE);
        break;
    }
  }

  scrollToTop() {
    document.getElementById('mainContent')?.scrollTo({ top: 0 } as ScrollToOptions)
  }

  private _addNtf(topic: TopicNtfKeywordInfo, action: ESolnAction) {
    this.topicNtfConfigFacade.action = action;
    this.topicNtfConfigFacade.topicNtf = topic;
    this.notificationConfigFacade.getNtfkeywordConfigDetail(topic.ntfId!).subscribe();
    const ref = this.mDialogService.open(TopicNtfConfigApproveComponent);
    ref.afterClosed.subscribe((res) => {
      if (res) {
        this.lazyLoad();
      }
    })
  }
}
