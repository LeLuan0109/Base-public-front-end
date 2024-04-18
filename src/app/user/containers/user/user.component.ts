import { AuthFacade } from 'src/app/auth/facade/auth.facade';
import { SessionService } from './../../../shared/services/session.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { MDialogService } from 'src/app/base-modules/m-dialog/services/m-dialog.service';
import { UserFacade } from '../../facades/user.facade';
import { UserInfo } from '../../models/user.model';
import { UserMutationComponent } from '../user-mutation/user-mutation.component';
import { STATUS, STATUS_OPT } from 'src/app/shared/constants/status.constant';
import { ROLE_OPT } from 'src/app/shared/constants/user.constant';
import { EToolBarAction } from '@based/m-toolbar/models/toolbar.model';
import { ESolnAction } from '@shared/models/type-action.model';
import { LabelValue } from '@shared/models/label-value.model';
import { EToolTableAction } from '@based/m-tooltable/models/tooltable.model';
import { DelegateKey } from '@shared/constants/delegate.constant';
import { DialogService } from 'primeng/dynamicdialog';
import { UserUploadComponent } from '../user-upload/user-upload.component';
import { ToastService } from '@shared/services/toast.service';
import { showDeleteLabel } from '@shared/utils/string.util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ConfirmationService, DialogService],

})
export class UserComponent implements OnInit {
  delegateKeys = [DelegateKey.USER];
  status = STATUS;
  statusOpt = STATUS_OPT;
  groupOpt: LabelValue[] = [];

  event?: LazyLoadEvent;
  currentUser: UserInfo = {};
  users: UserInfo[] = [];
  selectedItems: UserInfo[] = [];
  totalElement = 0;

  constructor(
    private userFacade: UserFacade,
    private mDialogService: MDialogService,
    private localtion: Location,
    private sessionService: SessionService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private authFacade: AuthFacade
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.retrieveAccountInfo() as UserInfo;
    this.userFacade.userPaging$.subscribe(res => {
      this.totalElement = res.totalCount ?? 0;
      this.users = res.data ?? [];
    })
    this.userFacade.getAllGroup();
    this.userFacade.userGroups$.subscribe(res => {
      this.groupOpt = res;
    })
  }

  toolBarClick(e: EToolBarAction) {
    switch (e) {
      case EToolBarAction.INSERT:
        this._createUser();
        break;
      case EToolBarAction.CLONE:
        this._clone(this.selectedItems[0])
        break;
      case EToolBarAction.UPLOAD:
        const ref = this.dialogService.open(UserUploadComponent, {
          showHeader: false,
        });
        ref.onClose.subscribe(res => {
          if (res) {
            this.lazyLoadUser();
          }
        })
        break
      case EToolBarAction.EXPORT:
        if(this.selectedItems && this.selectedItems.length > 0) {
          this.userFacade.exportIds(this.selectedItems.map(r => r.id!)).subscribe();
        } else {
          this.userFacade.export(this.event).subscribe();
        }
        break
      case EToolBarAction.DELETE:
        this._multiDelete(this.selectedItems)
        break
    }
  }

  toolTableClick(e: EToolTableAction, item: UserInfo) {
    switch (e) {
      case EToolTableAction.VIEW:
        this._update(item, ESolnAction.VIEW);
        break;
      case EToolTableAction.UPDATE:
        this._update(item, ESolnAction.UPDATE);
        break;
      case EToolTableAction.DELETE:
        this._multiDelete([item]);
        break;
      case EToolTableAction.ROLE:
        this._update(item, ESolnAction.DELEGATE);
        break;
    }
  }

  lazyLoadUser(event?: LazyLoadEvent) {
    if (event) {
      this.event = event;
    }
    this.selectedItems = [];
    this.userFacade.filterUser(this.event);
  }

  private _update(user: UserInfo, action: ESolnAction) {
    this.localtion.replaceState(`/user/mutation?id=${user.id}&action=${action}`);
    this.userFacade.action = action;
    this.userFacade.getUserDetail(user.id!).subscribe();
    this.userFacade.getAllAction();
    this.userFacade.getAllFunction();
    const ref = this.mDialogService.open(UserMutationComponent);
    ref.afterClosed.subscribe(res => {
      this.localtion.replaceState('/user');
      if (res) {
        this.lazyLoadUser();
        this.authFacade.getMe().subscribe(res => {
          location.reload();
        });
      }
    })
  }

  private _createUser() {
    this.localtion.replaceState('/user/mutation');
    this.userFacade.action = ESolnAction.INSERT;
    this.userFacade.getAllAction();
    this.userFacade.getAllFunction();
    const ref = this.mDialogService.open(UserMutationComponent);
    ref.afterClosed.subscribe(res => {
      this.localtion.replaceState('/user');
      if (res) {
        this.lazyLoadUser();
      }
    })
  }

  private _clone(user: UserInfo) {
    this.localtion.replaceState(`/user/mutation?id=${user.id}&action=${ESolnAction.CLONE}`);
    this.userFacade.action = ESolnAction.CLONE;
    this.userFacade.userSingle = user;
    this.userFacade.getAllAction();
    this.userFacade.getAllFunction();
    const ref = this.mDialogService.open(UserMutationComponent);
    ref.afterClosed.subscribe(res => {
      this.localtion.replaceState('/user');
      if (res) {
        this.lazyLoadUser();
      }
    })
  }

  private _multiDelete(users: UserInfo[]) {
    if (users.findIndex(u => u.account?.username === 'admin') > -1) {
      this.toastService.showError('Không thể xoá người dùng "admin"');
      return;
    }
    this.confirmationService.confirm({
      message: showDeleteLabel(users.length),
      acceptLabel: 'Xóa',
      rejectLabel: 'Hủy',
      closeOnEscape: true,
      acceptIcon: 'pi pi-check-circle',
      acceptButtonStyleClass: 'btn-action red',
      rejectButtonStyleClass: 'btn-action gray',
      accept: () => {
        this.userFacade.deleteUser(users).subscribe(res => {
          if (res.id) {
            this.lazyLoadUser();
          }
        });
      },
    });
  }
}
