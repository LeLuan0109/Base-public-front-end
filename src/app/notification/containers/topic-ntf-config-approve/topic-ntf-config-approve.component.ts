import { Subject } from 'rxjs';
import { TopicNtfConfigFacade } from './../../facades/topic-ntf-config.facade';
import { Component, OnInit } from '@angular/core';
import { TopicNtfKeywordInfo, TopicNtfInfo } from '../../models/topic-ntf.model';
import { FREQUENCY_OPT, TIME_TYPE, TIME_TYPE_OPT } from '@shared/constants/notification.constant';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';
import { ESolnAction } from '@shared/models/type-action.model';
import { NtfConfigInfo } from '../../models/notification-config.model';
import { NtfKeywordConfigInfo } from '../../models/ntf-keyword-config.model';
import { ISocialSourceInfo } from 'src/app/social-source/models/social-source.model';
import { NotificationConfigFacade } from '../../facades/notification-config.facade';

@Component({
  selector: 'app-topic-ntf-config-approve',
  templateUrl: './topic-ntf-config-approve.component.html',
  styleUrls: ['./topic-ntf-config-approve.component.scss']
})
export class TopicNtfConfigApproveComponent implements OnInit {
  frequencyOpt = FREQUENCY_OPT;
  timesTypeOpt = TIME_TYPE_OPT;
  timesTypeConst = TIME_TYPE;
  topicNtf: TopicNtfKeywordInfo = {};
  // timesType: number[] = [];
  action = ESolnAction.INSERT;
  ntfKeywordConfig?: NtfKeywordConfigInfo;
  socialSources: ISocialSourceInfo[] = [];
  approveNtf = false;

  constructor(
    private topicNtfConfigFacade: TopicNtfConfigFacade,
    private dialogRef: MDialogRef,
    private notificationConfigFacade: NotificationConfigFacade) {
  }

  ngOnInit(): void {
    this.action = this.topicNtfConfigFacade.action$;
    this.topicNtf = this.topicNtfConfigFacade.topicNtf$
    this.topicNtfConfigFacade.profiles$.subscribe(pr => {
      this.socialSources = pr;
    });
    this.notificationConfigFacade.ntfConfigSingle$.subscribe(res => {
      console.log(res);
      this.ntfKeywordConfig = res;
      this.approveNtf = res.status === 1 ? true : false;
      this.ntfKeywordConfig!.keyword = (res.keyword && res.keyword.length > 2) ? JSON.parse(res.keyword as string) : undefined;
      this.ntfKeywordConfig!.sources = (res.profiles && res.profiles.langth > 2) ? JSON.parse(res.profiles!) : undefined;
      if (this.ntfKeywordConfig?.sources?.social && this.ntfKeywordConfig?.sources?.social.length > 0) {
        this.topicNtfConfigFacade.getAllSocialSourceByProfileId(this.ntfKeywordConfig?.sources?.social);
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.topicNtfConfigFacade.approveNtfConfig({ id: this.topicNtf.id!, ntfStatus: this.approveNtf }).subscribe(res => {
      this.dialogRef.close(res);
    })
  }
}
