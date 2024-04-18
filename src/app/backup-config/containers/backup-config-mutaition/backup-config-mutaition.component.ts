import { Component, Input, OnInit } from '@angular/core';
import { BACKUP_DATE_MONTH_OPT, BACKUP_DATE_WEEK_OPT, BackupConfigType, TIMES_TYPE_OPT } from '../../models/backup-config.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomVaidators } from '@shared/validators/custom.validator';
import { BackupConfigFacade } from '../../facades/backup-config.facade';
import { ConfirmationService } from 'primeng/api';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';
import { MDialogConfig } from '@based/m-dialog/refs/m-dailog.config';

@Component({
  selector: 'app-backup-config-mutaition',
  templateUrl: './backup-config-mutaition.component.html',
  styleUrls: ['./backup-config-mutaition.component.scss'],
  // providers: [ConfirmationService],
})
export class BackupConfigMutaitionComponent implements OnInit {
  timesTypeOpt = TIMES_TYPE_OPT;
  backupDateOpt = BACKUP_DATE_WEEK_OPT;
  configType = BackupConfigType.STRUCTURE;
  title: { [key: string]: string } = {
    STRUCTURE: 'Cập nhật cấu hình lưu dữ liệu có cấu trúc',
    UNSTRUCTURED: 'Cập nhật cấu hình lưu dữ liệu phi cấu trúc',
  }

  mutation: FormGroup | undefined;

  constructor(private fb: FormBuilder,
    private backupConfigFacade: BackupConfigFacade,
    private dialogRef: MDialogRef,
    private mDialogConfig: MDialogConfig,
  ) {
    this.configType = this.mDialogConfig.data.config;
  }

  get path(): FormControl {
    return this.mutation?.get('path') as FormControl
  }

  get fileName(): FormControl {
    return this.mutation?.get('fileName') as FormControl
  }

  get timesType(): FormControl {
    return this.mutation?.get('timesType') as FormControl
  }

  get backupDate(): FormControl {
    return this.mutation?.get('backupDate') as FormControl
  }

  ngOnInit(): void {
    this._initForm();
    this.backupConfigFacade.backupCongfigSingle$.subscribe(res => {
      this.mutation?.patchValue(res);
      if (res.timesType === 3) {
        this.backupDateOpt = BACKUP_DATE_MONTH_OPT;
      }
    })
  }

  onSave() {
    this.backupConfigFacade.save(this.configType, this.mutation!.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  close() {
    this.dialogRef.close();
  }

  onChangeTimesType() {
    if (this.timesType.value === 1) {
      this.backupDate.setValue(0);
    } else if (this.timesType.value === 2) {
      this.backupDateOpt = BACKUP_DATE_WEEK_OPT;
      this.backupDate.setValue(1);
    } else {
      this.backupDateOpt = BACKUP_DATE_MONTH_OPT;
      this.backupDate.setValue(1);
    }
  }

  private _initForm() {
    this.mutation = this.fb.group({
      path: [, Validators.compose([Validators.required, Validators.maxLength(255), CustomVaidators.NoWhiteSpaceValidator()])],
      fileName: [, Validators.compose([Validators.required, Validators.maxLength(255), CustomVaidators.NoWhiteSpaceValidator()])],
      timesType: [1, Validators.compose([Validators.required])],
      backupDate: [0, Validators.compose([Validators.required])],
    })
  }
}
