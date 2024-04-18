import { ToastService } from '@shared/services/toast.service';
import { AccountPasswordComponent } from '../account-password/account-password.component';
import { SessionService } from '../../../shared/services/session.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { MDialogService } from 'src/app/base-modules/m-dialog/services/m-dialog.service';
import { AccountFacade } from '../../facades/account.facade';
import { AccountInfo } from '../../models/account.model';
import { AccountMutationComponent } from '../account-mutation/account-mutation.component';
import { STATUS, STATUS_OBJ, STATUS_OPT } from 'src/app/shared/constants/status.constant';
import { EToolBarAction } from '@based/m-toolbar/models/toolbar.model';
import { ESolnAction } from '@shared/models/type-action.model';
import { LabelValue } from '@shared/models/label-value.model';
import { EToolTableAction } from '@based/m-tooltable/models/tooltable.model';
import { DelegateKey } from '@shared/constants/delegate.constant';
import { showDeleteLabel } from '@shared/utils/string.util';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [ConfirmationService],
})
export class AccountComponent implements OnInit {
  delegateKeys = [DelegateKey.ACCOUNT];
  status = STATUS;
  statusOpt = STATUS_OPT;
  statusObj = STATUS_OBJ;
  userOpt: LabelValue[] = [];

  event?: LazyLoadEvent;
  accounts: AccountInfo[] = [];
  selectedItems: AccountInfo[] = [];
  totalElement = 0;

  constructor(
    private accountFacade: AccountFacade,
    private mDialogService: MDialogService,
    private localtion: Location,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.accountFacade.accountPaging$.subscribe(res => {
      this.totalElement = res.totalCount ?? 0;
      this.accounts = res.data ?? [];
    })
  }

  toolBarClick(e: EToolBarAction) {
    switch (e) {
      case EToolBarAction.INSERT:
        this._createAccount();
        break;
      case EToolBarAction.CLONE:
        this._update(this.selectedItems[0], ESolnAction.UPDATE);
        break;
      case EToolBarAction.UPLOAD:
        break;
      case EToolBarAction.EXPORT:
        break
      case EToolBarAction.DELETE:
        this._multiDelete(this.selectedItems)
        break
    }
  }

  toolTableClick(e: EToolTableAction, item: AccountInfo) {
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
      case EToolTableAction.INSERT:
        this._setPassword(item);
        break;
      case EToolTableAction.UPDATE_STATUS:
        this._updateStatus(item.id!, item.status === this.status.active.value ? this.status.deactive.value : this.status.active.value);
        break;
    }
  }

  private _update(account: AccountInfo, action: ESolnAction) {
    this.localtion.replaceState(`/account/mutation?id=${account.id}&&action=${action}`);
    this.accountFacade.action = action;
    this.accountFacade.getAllAction();
    this.accountFacade.getAllFunction();
    this.accountFacade.getAccountDetail(account.id!).subscribe();
    const ref = this.mDialogService.open(AccountMutationComponent);
    ref.afterClosed.subscribe(res => {
      this.localtion.replaceState('/account');
      if (res) {
        this.lazyLoadAccount();
      }
    })
  }

  private _setPassword(account: AccountInfo) {
    this.localtion.replaceState(`/account/${account.id}/password`);
    this.accountFacade.accountSingle = account;
    const ref = this.mDialogService.open(AccountPasswordComponent);
    ref.afterClosed.subscribe(res => {
      this.localtion.replaceState('/account');
      if (res) {
        this.lazyLoadAccount();
      }
    })
  }

  private _updateStatus(id: number, status: number) {
    const _msg = status === this.status.active.value ? 'Bạn thực sự muốn kích hoạt tài khoản' : 'Bạn thực sự muốn khoá tài khoản';
    this.confirmationService.confirm({
      message: _msg + `?<br> Nhấn nút "Đồng ý" để tiếp tục hoặc nhấn nút "Hủy" để hủy bỏ thao tác`,
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy',
      closeOnEscape: true,
      acceptIcon: status === this.status.active.value ? 'pi pi-check-circle' : 'pi pi-power-off',
      acceptButtonStyleClass: status === this.status.active.value ? 'btn-action red' : 'btn-action green',
      rejectButtonStyleClass: 'btn-action gray',
      accept: () => {
        this.accountFacade.updateStatus(id, status).subscribe(res => {
          if (res.id) {
            this.lazyLoadAccount();
          }
        });
      },
    });
  }

  lazyLoadAccount(event?: LazyLoadEvent) {
    if (event) {
      this.event = event;
    }
    this.selectedItems = [];
    this.accountFacade.filterAccount(this.event);
  }

  private _createAccount() {
    this.localtion.replaceState('/account/mutation');
    this.accountFacade.action = ESolnAction.INSERT;
    this.accountFacade.getAllAction();
    this.accountFacade.getAllFunction();
    const ref = this.mDialogService.open(AccountMutationComponent);
    ref.afterClosed.subscribe(res => {
      this.localtion.replaceState('/account');
      if (res) {
        this.lazyLoadAccount();
      }
    })
  }

  private _multiDelete(accounts: AccountInfo[]) {
    if (accounts.findIndex(a => a.username === 'admin') > -1) {
      this.toastService.showError('Không thể xoá tài khoản "admin"');
      return;
    }
    this.confirmationService.confirm({
      message: showDeleteLabel(accounts.length),
      acceptLabel: 'Xóa',
      rejectLabel: 'Hủy',
      closeOnEscape: true,
      acceptIcon: 'pi pi-check-circle',
      acceptButtonStyleClass: 'btn-action red',
      rejectButtonStyleClass: 'btn-action gray',
      accept: () => {
        this.accountFacade.deleteAccount(accounts).subscribe(res => {
          if (res.id) {
            this.lazyLoadAccount();
          }
        });
      },
    });
  }

}
