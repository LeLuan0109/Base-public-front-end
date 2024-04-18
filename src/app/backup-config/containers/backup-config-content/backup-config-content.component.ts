import { BACKUP_DATE_WEEK } from './../../models/backup-config.model';
import { Component, Input, OnInit } from '@angular/core';
import { BackupConfigInfo, BackupConfigType } from '../../models/backup-config.model';
import { BackupConfigFacade } from '../../facades/backup-config.facade';
import { DialogService } from 'primeng/dynamicdialog';
import { BackupConfigMutaitionComponent } from '../backup-config-mutaition/backup-config-mutaition.component';
import { MDialogService } from '@based/m-dialog/services/m-dialog.service';

@Component({
  selector: 'app-backup-config-content',
  templateUrl: './backup-config-content.component.html',
  styleUrls: ['./backup-config-content.component.scss'],
})
export class BackupConfigContentComponent implements OnInit {
  week = BACKUP_DATE_WEEK;
  @Input() configType!: BackupConfigType;

  config: BackupConfigInfo = {};

  constructor(private backupConfigFacade: BackupConfigFacade, private mDialogService: MDialogService) { }

  ngOnInit(): void {
    this.backupConfigFacade.backupCongfigSingle$.subscribe(res => {
      this.config = res;
    })
  }

  onEdit() {
    const ref = this.mDialogService.open(BackupConfigMutaitionComponent, { config: this.configType });
    ref.afterClosed.subscribe(res => {
      if (res) {
        this.backupConfigFacade.getDetailBackupConfigByType(this.configType).subscribe();
      }
    })
  }

}
