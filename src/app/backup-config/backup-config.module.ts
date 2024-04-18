import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackupConfigRoutingModule } from './backup-config-routing.module';
import { BackupConfigStructuredComponent } from './containers/backup-config-structured/backup-config-structured.component';
import { BackupConfigUnstructuredComponent } from './containers/backup-config-unstructured/backup-config-unstructured.component';
import { BackupConfigMutaitionComponent } from './containers/backup-config-mutaition/backup-config-mutaition.component';
import { SharedModule } from '@shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BackupConfigContentComponent } from './containers/backup-config-content/backup-config-content.component';
import { MDialogModule } from '@based/m-dialog/m-dialog.module';


@NgModule({
  declarations: [
    BackupConfigStructuredComponent,
    BackupConfigUnstructuredComponent,
    BackupConfigMutaitionComponent,
    BackupConfigContentComponent
  ],
  imports: [
    CommonModule,
    BackupConfigRoutingModule,
    SharedModule,
    DropdownModule,
    ConfirmDialogModule,
    MDialogModule
  ]
})
export class BackupConfigModule { }
