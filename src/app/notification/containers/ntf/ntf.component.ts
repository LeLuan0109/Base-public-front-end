import { NotificationFacade } from './../../facades/notification.facade';
import { Component, OnInit } from '@angular/core';
import { EToolBarAction } from '@based/m-toolbar/models/toolbar.model';
import { EToolTableAction } from '@based/m-tooltable/models/tooltable.model';
import { TIME_TYPE, TIME_TYPE_OPT, FREQUENCY_OPT } from '@shared/constants/notification.constant';
import { NtfInfo } from '../../models/notification.model';
import { LazyLoadEvent } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MDialogService } from '@based/m-dialog/services/m-dialog.service';
import { NtfViewComponent } from '../ntf-view/ntf-view.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ntf',
  templateUrl: './ntf.component.html',
  styleUrls: ['./ntf.component.scss']
})
export class NtfComponent implements OnInit {
  delegateKeys = [];
  timeTypeOpt = TIME_TYPE_OPT;
  frequncyOpt = FREQUENCY_OPT;
  sendType = 1;
  timeType = TIME_TYPE;

  ntfs: NtfInfo[] = [];
  totalElement = 0;
  maxDate = new Date();
  tabIndex = 0;
  first = 0;

  constructor(
    private notificationFacade: NotificationFacade,
    private activatedRoute: ActivatedRoute,
    private mDailogService: MDialogService,
    private loaction: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const { type, index } = this.activatedRoute.snapshot.queryParams;
    if (Number(type) && Number(type) === 2) {
      this.sendType = 2;
    }
    if (Number(index) && Number(index) === 1) {
      this.tabIndex = 1;
    }
    this.notificationFacade.ntfPaging$.subscribe(res => {
      this.ntfs = res.data ?? [];
      this.totalElement = res.totalCount ?? 0;
    })
  }

  toolBarClick(e: EToolBarAction) {
    switch (e) {
      case EToolBarAction.INSERT:
        break;
      case EToolBarAction.CLONE:
        break;
      case EToolBarAction.UPLOAD:
        break
        break;
      case EToolBarAction.EXPORT:
        break
      case EToolBarAction.DELETE:
        break
    }
  }

  toolTableClick(e: EToolTableAction, item: NtfInfo) {
    switch (e) {
      case EToolTableAction.VIEW:
        this._viewDetail(item);
        break;
      case EToolTableAction.UPDATE:
        break;
      case EToolTableAction.DELETE:
        break;
      case EToolTableAction.ROLE:
        break;
    }
  }

  lazyLoadNtf(event?: LazyLoadEvent) {
    this.notificationFacade.filterNtf(this.sendType, this.tabIndex, event);
  }

  _viewDetail(item: NtfInfo) {
    this.notificationFacade.ntfSingle = item;
    this.loaction.replaceState('/notification/ntf-detail', `id=${item.id}&type=${this.sendType}`);
    const ref = this.mDailogService.open(NtfViewComponent)
  }

  changeTabView() {
    this.router.navigate(
      [],
      {
        queryParams: { index: this.tabIndex, type: this.sendType },
        queryParamsHandling: 'merge'
      });
  }

  scrollToTop() {
    document.getElementById('mainContent')?.scrollTo({ top: 0 } as ScrollToOptions)
  }
}
