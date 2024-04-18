import { SessionService } from './../../../../shared/services/session.service';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserInfo } from 'src/app/shared/models/user-info.model';
import { collapse, collapseMenu } from '@shared/animations/animations';
import { RoleInfo } from '@shared/models/role.model';
import { MenuFacade } from 'src/app/menu/facades/menu.facade';
import { ETheme } from '@shared/constants/theme.constant';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangePasswordComponent } from 'src/app/setting/containers/change-password/change-password.component';
import { AuthFacade } from 'src/app/auth/facade/auth.facade';
import { Router } from '@angular/router';
import { MessagingService } from '@shared/services/messaging.service';
import { NotificationFacade } from 'src/app/notification/facades/notification.facade';
import { Title } from '@angular/platform-browser';
import { ThemeService } from '@shared/services/theme.service';
import { ESubMenuPosition } from 'src/app/layout/constants/sub-menu-position.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [DialogService],
  animations: [collapseMenu(150), collapse(150)],
})
export class SidebarComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = 'BF0ENXsAlIYoR4aPXiPcMm8rgxBBIiwFof0NV19swmgkUiEfLdPFcQTZg4O41izSueVt2A0O-UReYOt3Pqhj4kk';

  ESubMenuPosition = ESubMenuPosition;
  items: MenuItem[] = [];
  messages: any[] = [];
  totalMessage: number = 0;
  user: UserInfo = {};
  title = '';
  notifications: any;
  logo = 'assets/images/logos/abp.png';
  logoSmall = 'assets/images/logos/abp-small.png';
  logoWatermark = 'assets/images/logos/abp-watermark.png';

  isCollapse = true;
  @Output() onChangeSize = new EventEmitter<boolean>();

  menu: { [key: string]: MenuItem[] } = {
    dashboard: [],
    report: [],
    main: [],
    setting: [],
  };

  themeMenu: { [key: string]: MenuItem[] } = {};
  bottomMenuItem: MenuItem[] = [];

  toggle = true;
  isMobile = false;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private themeService: ThemeService,
    private menuFacade: MenuFacade,
    private authFacade: AuthFacade,
    private dialogService: DialogService,
    private msgService: MessagingService,
    private notiFacade: NotificationFacade,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.user = this.sessionService.retrieveAccountInfo() as UserInfo;
    console.log(this.user.id?.valueOf());

    console.log(this.user.fullName?.valueOf(), "chao bn ");

    this.menu = {
      ...this.sessionService.retrieveMenuInfo(),
      dashboard: [
        {
          label: 'Tổng quan',
          routerLink: '/dashboard',
          icon: 'pi pi-th-large',
        },
      ],
      emportReport: [
        {
          label: 'Báo cáo',
          routerLink: '/emport-report',
          icon: 'bi bi-card-text',
        },
      ],
    };
    this.themeMenu = {
      [ETheme.LIGHT]: [
        {
          label: 'Chế độ sáng',
          icon: 'bi bi-sun',
          command: () => {
            this.themeService.theme = ETheme.DARK;
          },
        },
      ],
      [ETheme.DARK]: [
        {
          label: 'Chế độ tối',
          icon: 'bi bi-moon',
          command: () => {
            this.themeService.theme = ETheme.LIGHT;
          },
        },
      ],
    };

    this.bottomMenuItem = [
      // {
      //   label: "Toàn màn hình",
      //   icon: "pi pi-window-maximize",
      //   command: () => {
      //     this.toggleFullscreen();
      //   }
      // },
      {
        label: this.user.fullName!,
        icon: 'bi bi-person-circle text-2xl',
        styleClass: 'user-menu',
        items: [
          { label: 'Hồ sơ', routerLink: '/setting', icon: 'pi pi-user' },
          {
            label: 'Đổi mật khẩu',
            icon: 'pi pi-lock',
            command: () => {
              this.changePassword();
            },
          },
          {
            label: 'Đăng xuất',
            icon: 'pi pi-sign-out',
            styleClass: 'logout-btn',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];

    // this.initMenu();
    if (window.innerWidth < 991) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 991) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  @HostListener('window:click', ['$event'])
  onClick(event: any) {
    var path = event?.composedPath ? event.composedPath() : event?.path;
    if (
      !path ||
      path.findIndex(
        (r: any) => r && r.className && typeof r.className === 'string' && (r.className.includes('btn-nav') || r.className.includes('navBar') || r.className.includes('pointer'))
      ) < 0
    ) {
      this.toggle = false;
    }
  }

  changePassword() {
    this.dialogService.open(ChangePasswordComponent, {
      showHeader: false,
      styleClass: 'custom-dynamic-model custom-model-sm',
    });
  }

  logout() {
    this.authFacade.logout().subscribe((res) => {
      if (res) {
        // this.router.navigateByUrl('/auth/login');
        location.reload();
      }
    });
  }

  private initMenu() {
    this.menu['main'].push(
      ...[
        {
          label: 'Thu thập dữ liệu MXH',
          icon: 'pi pi-share-alt',
          items: [
            {
              label: 'Nhóm nguồn thu thập',
              routerLink: '/social-sources-group',
              queryParams: { type: 1 },
            },
            {
              label: 'Nguồn thu thập',
              routerLink: '/social-sources',
            },
            {
              label: 'Lô nguồn thu thập',
              routerLink: '/social-sources-lot',
              queryParams: { type: 1 },
            },
            {
              label: 'Đối tượng thu thập',
              routerLink: '/social-object-monitor',
            },
          ],
        },
        {
          label: 'Thu thập dữ liệu web',
          icon: 'pi pi-globe',
          items: [
            {
              label: 'Nhóm nguồn thu thập',
              routerLink: '/website-sources-group',
              queryParams: { type: 2 },
            },
            {
              label: 'Nguồn thu thập',
              routerLink: '/website-sources',
            },
            {
              label: 'Lô nguồn thu thập',
              routerLink: '/website-sources-lot',
              queryParams: { type: 2 },
            },
            {
              label: 'Đối tượng thu thập',
              routerLink: '/website-object-monitor',
            },
          ],
        },
        {
          label: 'Quản lý tin bài',
          routerLink: '/posts',
          icon: 'pi pi-book',
        },
        {
          label: 'Quản lý chuyên đề',
          routerLink: '/social-topic',
          icon: 'pi pi-chart-pie',
        },
        {
          label: 'Giám sát thu thập',
          icon: 'bi bi-database-check',
          items: [
            {
              label: 'Chuyên đề mạng xã hội',
              routerLink: '/posts/monitor-social-pro-post',
              queryParams: { type: 1 },
            },
            {
              label: 'Đối tượng mạng xã hội',
              routerLink: '/posts/monitor-social-obj-post',
              queryParams: { type: 2 },
            },
            {
              label: 'Chuyên đề báo điện tử',
              routerLink: '/posts/monitor-web-pro-post',
              queryParams: { type: 1 },
            },
            {
              label: 'Đối tượng báo điện tử',
              routerLink: '/posts/monitor-web-obj-post',
              queryParams: { type: 2 },
            },
          ],
        },
      ]
    );

    this.menu['report'].push(
      ...[
        {
          label: 'Số lượt đề cập',
          icon: 'bi bi-sort-numeric-up-alt',
          routerLink: '/reports/mentions',
        },
        {
          label: 'Sắc thái bài viết',
          icon: 'bi bi-hand-thumbs-up',
          routerLink: '/reports/sentiment',
        },
        {
          label: 'Bảng xếp hạng',
          icon: 'bi bi-sort-up',
          routerLink: '/reports/ranking',
        },
        {
          label: 'Nhân khẩu học',
          icon: 'bi bi-people',
          routerLink: '/reports/demographic',
        },
      ]
    );

    this.menu['setting'].push(
      ...[
        {
          label: 'Setting',
          routerLink: '/setting',
          icon: 'pi pi-cog',
        },
        {
          label: 'Quản lý người dùng',
          icon: 'pi pi-user',
          items: [
            {
              label: 'Nhóm người dùng',
              routerLink: '/user-group',
            },
            {
              label: 'Người dùng',
              routerLink: '/user',
            },
            {
              label: 'Tài khoản',
              routerLink: '/account',
            },
          ],
        },
      ]
    );

    // this.menu.report.push(...[
    //   {
    //     label: 'Dashboard',
    //     routerLink: '/dashboard',
    //     icon: 'pi pi-th-large',
    //   },
    // ])
  }
}
