import { Component, OnInit } from '@angular/core';
import { BackupConfigFacade } from '../../facades/backup-config.facade';
import { BackupConfigType } from '../../models/backup-config.model';

@Component({
  selector: 'app-backup-config-structured',
  templateUrl: './backup-config-structured.component.html',
  styleUrls: ['./backup-config-structured.component.scss']
})
export class BackupConfigStructuredComponent implements OnInit {
  isLoad = false;

  constructor(private backupConfigFacade: BackupConfigFacade) { }

  ngOnInit(): void {
    this.backupConfigFacade.getDetailBackupConfigByType(BackupConfigType.STRUCTURE).subscribe(res => {
      this.isLoad = true;
    })
  }

}
