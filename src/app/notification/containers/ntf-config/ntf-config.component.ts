import { filter } from 'rxjs';
import { FREQUENCY_OPT } from './../../../shared/constants/notification.constant';
import { MDialogService } from '@based/m-dialog/services/m-dialog.service';
import { NotificationConfigFacade } from './../../facades/notification-config.facade';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EToolBarAction } from '@based/m-toolbar/models/toolbar.model';
import { EToolTableAction } from '@based/m-tooltable/models/tooltable.model';
import { NtfConfigInfo } from '../../models/notification-config.model';
import { TIME_TYPE, TIME_TYPE_OPT } from '@shared/constants/notification.constant';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ESolnAction } from '@shared/models/type-action.model';
import { Location } from '@angular/common';
import { NtfConfigMutationComponent } from '../ntf-config-mutation/ntf-config-mutation.component';
import { LabelValue } from '@shared/models/label-value.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NtfKeywordConfigMutationComponent } from '../ntf-keyword-config-mutation/ntf-keyword-config-mutation.component';
import { NtfKeywordConfigInfo } from '../../models/ntf-keyword-config.model';
import { showDeleteLabel } from '@shared/utils/string.util';

@Component({
  selector: 'app-ntf-config',
  templateUrl: './ntf-config.component.html',
  styleUrls: ['./ntf-config.component.scss'],
  providers: [ConfirmationService]
})
export class NtfConfigComponent implements OnInit {
  delegateKeys = [];
  timeTypeOpt = TIME_TYPE_OPT;
  sendType = 1;
  timeType = TIME_TYPE;
  frequencyOpt = FREQUENCY_OPT;

  ntfConfigs: any[] = [];
  selectedItems: any[] = [];
  totalElement = 0;
  first = 0;
  tabIndex = 0;
  topicIndex = 0;
  topics: LabelValue[] = [];
  topicFilter = '';
  topicHasNext = true;

  constructor(
    private notificationConfigFacade: NotificationConfigFacade,
    private mDialogService: MDialogService,
    private loaction: Location,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const { index } = this.route.snapshot.queryParams;
    if (Number(index) && Number(index) === 1) {
      this.tabIndex = 1;
    }
  }

  ngOnInit(): void {
    this.notificationConfigFacade.ntfConfigPaging$.subscribe(res => {
      this.ntfConfigs = res.data ?? [];
      this.totalElement = res.totalCount ?? 0;
    })
  }

  toolBarClick(e: EToolBarAction) {
    switch (e) {
      case EToolBarAction.INSERT:
        this._create();
        break;
      case EToolBarAction.CLONE:
        this._update(this.selectedItems[0], ESolnAction.CLONE);
        break;
      case EToolBarAction.DELETE:
        // if (this.tabIndex === 0) {
        //   this._delete(this.selectedItems);
        // } else {
        this._deleteNtfKeywordConfig(this.selectedItems)
        // }
        break
    }
  }

  toolTableClick(e: EToolTableAction, item: any) {
    switch (e) {
      case EToolTableAction.VIEW:
        this._update(item, ESolnAction.VIEW);
        break;
      case EToolTableAction.UPDATE:
        this._update(item, ESolnAction.UPDATE);
        break;
      case EToolTableAction.DELETE:
        // if (this.tabIndex === 0) {
        //   this._delete([item]);
        // } else {
        this._deleteNtfKeywordConfig([item])
        // }
        break;
    }
  }

  lazyLoad(event?: LazyLoadEvent) {
    this.selectedItems = [];
    // if (this.tabIndex === 0) {
    //   this.notificationConfigFacade.filterNtfConfig(event);
    // } else {
    this.notificationConfigFacade.filterNtfkeywordConfig(event);
    // }
  }

  filterTopic(event?: any) {
    if (this.topicFilter !== event?.filter) {
      this.topicIndex = 0;
      this.topics = [];
    }
    if (this.topicFilter !== event?.filter || this.topicHasNext) {
      this.topicFilter = event?.filter;
      this.notificationConfigFacade.filterTopic({ name: this.topicFilter ?? '', pageIndex: this.topicIndex, pageSize: 34 }).subscribe(res => {
        const dataCopy = [...this.topics];
        dataCopy.push(...res.data ?? [])
        this.topics = dataCopy;
        this.topicHasNext = res.pageInfo?.hasNextPage ?? false;
      })
      this.topicIndex++;
    }
  }

  changeTabView() {
    this.router.navigate(
      [],
      {
        queryParams: { index: this.tabIndex },
        queryParamsHandling: 'merge'
      });
    this.topicIndex = 0;
  }

  private _create() {
    this.notificationConfigFacade.action = ESolnAction.INSERT;
    this.loaction.replaceState(`/notification/ntf-config/mutation`, `index=${this.tabIndex}`);
    // const ref = this.tabIndex === 0 ? this.mDialogService.open(NtfConfigMutationComponent) :
    //   this.mDialogService.open(NtfKeywordConfigMutationComponent);
    const ref = this.mDialogService.open(NtfKeywordConfigMutationComponent);
    ref.afterClosed.subscribe(res => {
      this.loaction.replaceState(`/notification/ntf-config`, `index=${this.tabIndex}`);
      if (res) {
        this.lazyLoad();
      }
    })
  }

  // private _delete(ntfs: NtfConfigInfo[]) {
  //   let _msg = '';
  //   if (ntfs.length > 1) {
  //     _msg = `Bạn đang chọn xóa ${ntfs.length} bản ghi cùng lúc! Nhấn nút "Xóa" để xóa bỏ hoặc nhấn nút "Hủy" để hủy bỏ thao tác`
  //   } else {
  //     const labelTime = this.timeTypeOpt.filter(r => r.value === ntfs[0].timesType);
  //     _msg = `Bạn thực sự muốn xóa bản ghi "${labelTime[0].label}"? Nhấn nút "Xóa" để xóa bỏ hoặc nhấn nút "Hủy" để hủy bỏ thao tác`
  //   }

  //   this.confirmationService.confirm({
  //     message: _msg,
  //     acceptLabel: 'Xóa',
  //     rejectLabel: 'Hủy',
  //     closeOnEscape: true,
  //     acceptIcon: 'pi pi-check-circle',
  //     acceptButtonStyleClass: 'btn-action red',
  //     rejectButtonStyleClass: 'btn-action gray',
  //     accept: () => {
  //       this.notificationConfigFacade.deletes(ntfs).subscribe(res => {
  //         if (res.id) {
  //           this.lazyLoad();
  //         }
  //       });
  //     },
  //   });
  // }

  private _deleteNtfKeywordConfig(ntfs: NtfKeywordConfigInfo[]) {
    this.confirmationService.confirm({
      message: showDeleteLabel(ntfs.length),
      acceptLabel: 'Xóa',
      rejectLabel: 'Hủy',
      closeOnEscape: true,
      acceptIcon: 'pi pi-check-circle',
      acceptButtonStyleClass: 'btn-action red',
      rejectButtonStyleClass: 'btn-action gray',
      accept: () => {
        this.notificationConfigFacade.deletesNtfKeywordConfig(ntfs).subscribe(res => {
          if (res.id) {
            this.lazyLoad();
          }
        });
      },
    });
  }

  private _update(item: any, action: ESolnAction) {
    this.notificationConfigFacade.action = action;
    this.loaction.replaceState(`/notification/ntf-config/mutation`, `id=${item.id}&action=${action}&index=${this.tabIndex}`);
    // this.notificationConfigFacade.ntfConfigSingle = item;
    // const ref = this.tabIndex === 0 ? this.mDialogService.open(NtfConfigMutationComponent) :
    //   this.mDialogService.open(NtfKeywordConfigMutationComponent);
    this.notificationConfigFacade.getNtfkeywordConfigDetail(item.id).subscribe();
    const ref = this.mDialogService.open(NtfKeywordConfigMutationComponent, {id: item.id});
    ref.afterClosed.subscribe(res => {
      this.loaction.replaceState(`/notification/ntf-config`, `index=${this.tabIndex}`);
      if (res) {
        this.lazyLoad();
      }
    })
  }
  scrollToTop() {
    document.getElementById('mainContent')?.scrollTo({ top: 0 } as ScrollToOptions)
  }
}
