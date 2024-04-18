import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackupConfigStructuredComponent } from './containers/backup-config-structured/backup-config-structured.component';
import { BackupConfigUnstructuredComponent } from './containers/backup-config-unstructured/backup-config-unstructured.component';

const routes: Routes = [
  {
    path: 'unstructured',
    data: {
      title: 'Cấu hình lưu dữ liệu phi cấu trúc',
    },
    component: BackupConfigUnstructuredComponent,
  },
  {
    path: 'structure',
    data: {
      title: 'Cấu hình lưu dữ liệu cấu trúc',
    },
    component: BackupConfigStructuredComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackupConfigRoutingModule { }
