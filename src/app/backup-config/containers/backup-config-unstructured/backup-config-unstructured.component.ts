import { Component, OnInit } from '@angular/core';
import { BackupConfigFacade } from '../../facades/backup-config.facade';
import { BackupConfigType } from '../../models/backup-config.model';

@Component({
  selector: 'app-backup-config-unstructured',
  templateUrl: './backup-config-unstructured.component.html',
  styleUrls: ['./backup-config-unstructured.component.scss']
})
export class BackupConfigUnstructuredComponent implements OnInit {
  isLoad = false;

  constructor(private backupConfigFacade: BackupConfigFacade) { }

  ngOnInit(): void {
    this.backupConfigFacade.getDetailBackupConfigByType(BackupConfigType.UNSTRUCTURED).subscribe(res => {
      this.isLoad = true;
    })
  }

}
