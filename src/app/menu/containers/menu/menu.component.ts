import { Component, OnInit } from '@angular/core';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { MenuFacade } from '../../facades/menu.facade';
import { FUNCTION_POSITION, FUNCTION_STATUS } from '@shared/constants/function.constant';
import { FunctionInfo } from '../../models/function.model';
import { EToolTableAction } from '@based/m-tooltable/models/tooltable.model';
import { MDialogService } from '@based/m-dialog/services/m-dialog.service';
import { MenuMutationComponent } from '../menu-mutation/menu-mutation.component';
import { Location } from '@angular/common';
import { MenuSortComponent } from '../menu-sort/menu-sort.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [ConfirmationService]
})
export class MenuComponent implements OnInit {
  delegateKeys = [];
  position = FUNCTION_POSITION;
  status = FUNCTION_STATUS;

  treeData: TreeNode[] = [];
  totalElement = 0;

  constructor(
    private menuFacade: MenuFacade,
    private confirmationService: ConfirmationService,
    private localtion: Location,
    private mDialogService: MDialogService) { }

  ngOnInit(): void {
    this.menuFacade.getAllFunction();
    this.menuFacade.treeFunctions$.subscribe(res => {
      this.treeData = res;
    })
  }

  toolTableClick(event: EToolTableAction, fc: FunctionInfo, rowNode: any) {
    switch (event) {
      case EToolTableAction.UPDATE:
        this._update(fc, rowNode);
        break;
      case EToolTableAction.UPDATE_STATUS:
        this._updateStatus(fc);
        break;
    }
  }

  viewSort(sort: number, level: number): number {
    return level === 0 ? sort : sort % Math.pow(10, level);
  }

  sortFuncs(rowNode: any) {
    const data: any = {};
    data.func = rowNode.node.data;
    if (rowNode.level > 0) {
      data.parent = rowNode.parent.data;
      data.funcs = rowNode.parent.children.map((r: any) => r.data);
    } else {
      data.funcs = this.treeData.filter(r => r.data.position === data.func.position).map(r => r.data);
      data.parent = undefined;
    }
    const ref = this.mDialogService.open(MenuSortComponent, data);
    ref.afterClosed.subscribe(res => {
      if (res) {
        this.menuFacade.getAllFunction();
      }
    })
  }

  private _update(fc: FunctionInfo, rowNode: any) {
    if (rowNode.level > 0) {
      this.menuFacade.parent = rowNode?.parent?.data;
    }
    this.menuFacade.func = fc;
    const ref = this.mDialogService.open(MenuMutationComponent);
    ref.afterClosed.subscribe(res => {
      if (res) {
        this.menuFacade.getAllFunction();
      }
    })
  }

  private _updateStatus(fc: FunctionInfo) {
    let _msg = fc.status === 0 ? `Bạn thực sự muốn hiển thị menu?` : `Bạn thực sự muốn ẩn menu?`;
    this.confirmationService.confirm({
      message: _msg + `<br>Nhấn nút "Đồng ý" để tiếp tục menu hoặc nhấn nút "Hủy" để hủy bỏ thao tác`,
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy',
      closeOnEscape: true,
      acceptIcon: 'pi pi-check-circle',
      acceptButtonStyleClass: 'btn-action red',
      rejectButtonStyleClass: 'btn-action gray',
      accept: () => {
        this.menuFacade.updateStatusFunction(fc.code!, fc.status === 0 ? 1 : 0).subscribe(res => {
          this.menuFacade.getAllFunction();
        });
      },
    });
  }
}
