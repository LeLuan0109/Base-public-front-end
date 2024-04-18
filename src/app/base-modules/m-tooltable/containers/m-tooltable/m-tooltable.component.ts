import { SessionService } from 'src/app/shared/services/session.service';
import { DelegateKey, RoleActionKey } from '@shared/constants/delegate.constant';
import { EToolTableAction } from './../../models/tooltable.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'm-tooltable',
  templateUrl: './m-tooltable.component.html',
  styleUrls: ['./m-tooltable.component.scss']
})
export class MTooltableComponent implements OnInit {
  @Input('delegateKeys') delegateKeys!: DelegateKey[];

  @Input('labelView') labelView = 'Xem chi tiết';
  @Input('labelNote') labelNote = 'Chú thích';
  @Input('labelExport') labelExport = 'Xuất';
  @Input('labelAdd') labelAdd = 'Thêm mới';
  @Input('labelUpdate') labelUpdate = 'Cập nhật';
  @Input('labelDelete') labelDelete = 'Xoá';
  @Input('labelClone') labelClone = 'Sao chép';
  @Input('labelUpdateStatus') labelUpdateStatus = 'Duyệt';
  @Input('labelMonitorWeb') labelMonitorWeb = 'Giám sát thu thập theo báo điện tử';
  @Input('labelMonitorSocial') labelMonitorSocial = 'Giám sát thu thập theo mạng xã hội';
  @Input('labelRole') labelRole = 'Phân quyền';


  @Input('iconView') iconView = 'pi pi-eye';
  @Input('iconNote') iconNote = 'pi pi-comment';
  @Input('iconExport') iconExport = 'pi pi-file-excel';
  @Input('iconAdd') iconAdd = 'pi pi-plus';
  @Input('iconUpdate') iconUpdate = 'pi pi-pencil';
  @Input('iconDelete') iconDelete = 'pi pi-trash';
  @Input('iconClone') iconClone = 'pi pi-copy';
  @Input('iconUpdateStatus') iconUpdateStatus = 'pi pi-check-circle';
  @Input('iconMonitorWeb') iconMonitorWeb = 'bi bi-globe2';
  @Input('iconMonitorSocial') iconMonitorSocial = 'bi bi-database-check';
  @Input('iconRole') iconRole = 'pi pi-sitemap';

  @Input('isView') isView = true;
  @Input('isNote') isNote = false;
  @Input('isExport') isExport = false;
  @Input('isAdd') isAdd = false;
  @Input('isUpdate') isUpdate = true;
  @Input('isDelete') isDelete = true;
  @Input('isClone') isClone = false;
  @Input('isUpdateStatus') isUpdateStatus = false
  @Input('isMonitorWeb') isMonitorWeb = false
  @Input('isMonitorSocial') isMonitorSocial = false
  @Input('isRole') isRole = false

  @Input('disabledView') disabledView = false;
  @Input('disabledNote') disabledNote = false;
  @Input('disabledExport') disabledExport = false;
  @Input('disabledAdd') disabledAdd = false;
  @Input('disabledUpdate') disabledUpdate = false;
  @Input('disabledDelete') disabledDelete = false;
  @Input('disabledClone') disabledClone = false;
  @Input('disabledUpdateStatus') disabledUpdateStatus = false
  @Input('disabledMonitorWeb') disabledMonitorWeb = false
  @Input('disabledMonitorSocial') disabledMonitorSocial = false
  @Input('disabledRole') disabledRole = false

  @Output('onClick') onClick = new EventEmitter<EToolTableAction>()

  roles: { [key: string]: { [key: string]: boolean } };

  constructor(private sessionService: SessionService) {
    this.roles = this.sessionService.retrieveRoleInfo();
  }

  ngOnInit(): void {
    this.delegateKeys.forEach(el => {
      if (this.roles[el]) {
        this.isView = this.roles[el][RoleActionKey.VIEW] ?? false;
        this.isNote = this.roles[el][RoleActionKey.NOTE] ?? false;
        this.isExport = this.roles[el][RoleActionKey.EXPORT] ? this.isExport && this.roles[el][RoleActionKey.EXPORT] : false;
        this.isAdd = this.roles[el][RoleActionKey.ADD] ? this.isAdd && this.roles[el][RoleActionKey.ADD] : false;
        this.isUpdate = this.roles[el][RoleActionKey.UPDATE] ?? false;
        this.isDelete = this.roles[el][RoleActionKey.DELETE] ?? false;
        this.isClone = this.roles[el][RoleActionKey.COPY] ? this.isClone && this.roles[el][RoleActionKey.COPY] : false;
        this.isUpdateStatus = this.roles[el][RoleActionKey.APPROVLE] ?? false;
        this.isRole = this.roles[el][RoleActionKey.ROLE] ?? false;
      }
    })
    if(this.delegateKeys.findIndex(r => r === DelegateKey.TOPIC) > -1) {
      this.isMonitorWeb = Object.keys(this.roles).findIndex(rk => rk === DelegateKey.WEB_PRO_POST_MONITOR) > -1 ? true : false;
      this.isMonitorSocial = Object.keys(this.roles).findIndex(rk => rk === DelegateKey.SOCIAL_PRO_POST_MONITOR) > -1 ? true : false;
    }
    if(this.delegateKeys.findIndex(r => r === DelegateKey.WEB_OBJ_MONITOR) > -1) {
      this.isMonitorWeb = Object.keys(this.roles).findIndex(rk => rk === DelegateKey.WEB_OBJ_POST_MONITOR) > -1 ? true : false;
    }
    if(this.delegateKeys.findIndex(r => r === DelegateKey.SOCIAL_OBJ_MONITOR) > -1) {
      this.isMonitorSocial = Object.keys(this.roles).findIndex(rk => rk === DelegateKey.SOCIAL_OBJ_POST_MONITOR) > -1 ? true : false;
    }
  }

  onMonitorSocial() {
    this.onClick.next(EToolTableAction.MONITOR_SOCIAL);
  }

  onMonitorWeb() {
    this.onClick.next(EToolTableAction.MONITOR_WEB);
  }

  onView() {
    this.onClick.next(EToolTableAction.VIEW);
  }

  onExport() {
    this.onClick.next(EToolTableAction.EXPORT);
  }

  onAdd() {
    this.onClick.next(EToolTableAction.INSERT);
  }

  onClone() {
    this.onClick.next(EToolTableAction.CLONE);
  }

  onUpdate() {
    this.onClick.next(EToolTableAction.UPDATE);
  }

  onUpdateStatus() {
    this.onClick.next(EToolTableAction.UPDATE_STATUS);
  }

  onDelete() {
    this.onClick.next(EToolTableAction.DELETE);
  }

  onNote() {
    this.onClick.next(EToolTableAction.NOTE);
  }

  onRole() {
    this.onClick.next(EToolTableAction.ROLE);
  }
}
