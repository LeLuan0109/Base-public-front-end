import { MDialogConfig } from './../../../base-modules/m-dialog/refs/m-dailog.config';
import { Component, OnInit } from '@angular/core';
import { FunctionInfo } from '../../models/function.model';
import { MenuFacade } from '../../facades/menu.facade';
import { combineLatest, forkJoin } from 'rxjs';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';

@Component({
  selector: 'app-menu-sort',
  templateUrl: './menu-sort.component.html',
  styleUrls: ['./menu-sort.component.scss']
})
export class MenuSortComponent implements OnInit {
  title = 'Sắp xếp menu';
  funcs: FunctionInfo[] = [];
  selectFuncs: FunctionInfo[] = [];
  isChage = false;
  parent?: FunctionInfo;

  constructor(private menuFacade: MenuFacade, private dialogRef: MDialogRef, private mDialogConfig: MDialogConfig) { }

  ngOnInit(): void {
    this.funcs = this.mDialogConfig.data.funcs;
    this.selectFuncs = [this.mDialogConfig.data.func];
    this.parent = this.mDialogConfig.data.parent;
  }

  save() {
    this.menuFacade.updateSort(this.funcs, this.parent).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  close() {
    this.dialogRef.close();
  }
}
