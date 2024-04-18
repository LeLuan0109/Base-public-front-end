import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EToolBarAction } from '@based/m-toolbar/models/toolbar.model';
import { DelegateKey, RoleActionKey } from '@shared/constants/delegate.constant';
import { SessionService } from '@shared/services/session.service';

@Component({
  selector: 'p-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input('delegateKeys') delegateKeys!: DelegateKey[];

  @Input('label') label: string = 'Danh sách'
  @Input('labelAdd') labelAdd: string = 'Thêm mới'
  @Input('labelClone') labelClone: string = 'Sao chép'
  @Input('labelApprove') labelApprove: string = 'Duyệt'
  @Input('labelDelete') lableDelete: string = 'Xóa bỏ'

  @Input('iconClone') iconClone = 'pi pi-copy';
  @Input('iconDelete') iconDelete = 'pi pi-trash';
  @Input('iconApprove') iconApprove = 'pi pi-check';

  @Input('selectedItems') selectedItems: any[] = []
  @Input('itemCount') itemCount: number = 0

  @Input('isApprove') isApprove: boolean = false
  @Input('isAdd') isAdd?: boolean = true;
  @Input('isExport') isExport?: boolean = false;
  @Input('isUpload') isUpload?: boolean = false;
  @Input('isDelete') isDelete?: boolean = true;
  @Input('isClone') isClone?: boolean = true;

  @Input('disabledAdd') disabledAdd: boolean = false;
  @Input('disabledClone') disabledClone: boolean = false;


  @Output('onClick') onClick: EventEmitter<EToolBarAction> = new EventEmitter()

  roles: { [key: string]: { [key: string]: boolean } };

  constructor(private sessionService: SessionService) {
    this.roles = this.sessionService.retrieveRoleInfo();
  }

  ngOnInit(): void {
    this.delegateKeys.forEach(el => {
      if (this.roles[el]) {
        this.isExport = this.isExport && this.roles[el][RoleActionKey.EXPORT];
        this.isAdd = this.roles[el][RoleActionKey.ADD] && this.isAdd;
        this.isUpload = this.roles[el][RoleActionKey.ADD] && this.isUpload;
        this.isDelete = this.roles[el][RoleActionKey.DELETE] && this.isDelete;
        this.isClone = this.roles[el][RoleActionKey.COPY] && this.isClone;
        this.isApprove = this.roles[el][RoleActionKey.APPROVLE] && this.isApprove;
      }
    })
  }

  create() {
    this.onClick.emit(EToolBarAction.INSERT)
  }

  clone() {
    this.onClick.emit(EToolBarAction.CLONE)
  }

  upload() {
    this.onClick.emit(EToolBarAction.UPLOAD)
  }

  delete() {
    this.onClick.emit(EToolBarAction.DELETE)
  }

  export() {
    this.onClick.emit(EToolBarAction.EXPORT)
  }

  approve() {
    this.onClick.emit(EToolBarAction.APPROVE)
  }
}
