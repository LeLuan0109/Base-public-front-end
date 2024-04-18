import { NtfMessageFacade } from './../../../../notification/facades/ntf-message.facade';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SessionService } from 'src/app/shared/services/session.service';
import { OrganizationInfo, UserInfo } from 'src/app/shared/models/user-info.model';
import { GET_TITLE } from '../../../constants/title.constant';
import { Title } from '@angular/platform-browser';
import { MsgInfo } from '../../../../notification/models/ntf-message.model';
import { tap } from 'rxjs';
import { FilterParam, SearchService } from 'src/app/layout/services/search.service';
import { ORGANIZATION_LIST } from '@shared/constants/organization.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = 'BF0ENXsAlIYoR4aPXiPcMm8rgxBBIiwFof0NV19swmgkUiEfLdPFcQTZg4O41izSueVt2A0O-UReYOt3Pqhj4kk';
  isAdmin: boolean = false;
  currentOrg: OrganizationInfo = {};
  orgOptions: OrganizationInfo[] = ORGANIZATION_LIST;
  user: UserInfo = {};
  title = '';
  companyName = '';
  logo = '';

  items: MenuItem[] = [];
  messages: MsgInfo[] = [];
  totalUnreadMsg: number = 0;
  totalElement: number = 0;
  isDone = false;
  first = 0;
  rows = 25;
  isShowSearch: boolean = false;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private ntfMessageFacade: NtfMessageFacade,
    private titleService: Title,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.user = this.sessionService.retrieveAccountInfo() as UserInfo;
    this.isAdmin = this.user.admin!;
    // this.isAdmin = true;
    this.currentOrg = this.user.organization?.[0]!;
    this.orgOptions = this.user?.organization!;
    console.log(this.orgOptions, "danh sach to chuc ");

    this.companyName = this.user.organization?.[0]?.companyName ?? '';
    this.logo = this.user.organization?.[0].logo ?? 'assets/images/logos/abp.png';
    this.router.events.subscribe(() => {
      const data = GET_TITLE(this.router, this.router.routerState.root.snapshot.children);
      this.titleService.setTitle(data.title ?? '');
      this.title = this.titleService.getTitle();
      this.isShowSearch = data.showSearch ?? false;
    });
  }

  getMessagesPaging() {
    this.ntfMessageFacade.ntfMsgPaging$.subscribe((res) => {
      this.isDone = true;
      this.messages = [...this.messages, ...(res?.data ?? [])];
      this.totalElement = res?.totalCount ?? 0;
    });
  }

  getTotalUnreadMsg() {
    this.ntfMessageFacade.totalUnreadMsg$.subscribe((unreadMsgInfo) => {
      this.totalUnreadMsg = unreadMsgInfo.total;
    });
    this.ntfMessageFacade.getTotalUnreadMsg().subscribe();
  }

  readMessage(item: MsgInfo) {
    item?.id &&
      this.ntfMessageFacade.updateStatus(item?.id, 1).subscribe((_) => {
        --this.totalUnreadMsg;
        item.status = 1;
        window.open(item?.url, '_blank');
      });
  }

  updateTotalUnreadMsg() {
    this.ntfMessageFacade.getLiveMsgData().subscribe((msgData) => {
      const {
        payload: { user_ids: userIds },
      } = msgData;

      if (userIds?.includes(this.user.id!)) {
        ++this.totalUnreadMsg;
      }
    });
  }

  loadNotify(noti: any, event: any) {
    this.ntfMessageFacade
      .getMessages({ first: this.first, rows: this.rows })
      .pipe(tap((res) => (this.ntfMessageFacade.ntfMsgPaging$ = res)))
      .subscribe((_) => {
        noti.toggle(event);
      });
  }

  onSearch(searchParam: FilterParam) {
    this.searchService.onSearch = searchParam;
  }

  changeOrganization(organization: OrganizationInfo) {
    // const newUserInfo: UserInfo = { ...this.user, organization?.[0] };
    // this.sessionService.serveAccountInfo(newUserInfo);
    // location.reload();
  }

  @HostListener('document:wheel', ['$event.target'])
  onScoll(event: any) {
    if (this.messages.length < this.totalElement) {
      if (event.parentNode?.parentNode?.parentNode?.id === 'notification' || event.parentNode?.parentNode?.parentNode?.parentNode?.id === 'notification') {
        const element = document.getElementById('notification')?.querySelector('.nofificaion-scroll') as HTMLElement;

        if (this.isDone && element && element.clientHeight + element.scrollTop + 1 >= element.scrollHeight) {
          ++this.first;
          this.isDone = false;
          this.ntfMessageFacade.getMsgList({ first: this.first, rows: this.rows });
        }
      }
    }
  }
}
