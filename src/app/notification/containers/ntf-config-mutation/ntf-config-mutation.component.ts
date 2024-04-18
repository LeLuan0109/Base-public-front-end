import { Component, OnInit } from '@angular/core';
import { NotificationConfigFacade } from '../../facades/notification-config.facade';
import { ESolnAction } from '@shared/models/type-action.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';
import { DAY_OF_WEEK_OPT, HOUR_OF_DAY_OPT, TIME_TYPE, TIME_TYPE_OPT } from '@shared/constants/notification.constant';

@Component({
  selector: 'app-ntf-config-mutation',
  templateUrl: './ntf-config-mutation.component.html',
  styleUrls: ['./ntf-config-mutation.component.scss']
})
export class NtfConfigMutationComponent implements OnInit {
  timesTypeOpt = TIME_TYPE_OPT;
  timeOfDayOpt = HOUR_OF_DAY_OPT;
  dayOfWeekOpt = DAY_OF_WEEK_OPT;
  timesTypeConst = TIME_TYPE;

  title = '';
  action = ESolnAction.INSERT;

  mutationForm: FormGroup | undefined;
  id?: number;

  constructor(
    private ntfConfigFacade: NotificationConfigFacade,
    private dialogRef: MDialogRef,
    private fb: FormBuilder,
  ) { }

  get timesType(): FormControl {
    return this.mutationForm?.get('timesType') as FormControl;
  }
  get sendDay(): FormControl {
    return this.mutationForm?.get('sendDay') as FormControl;
  }
  get sendTime(): FormControl {
    return this.mutationForm?.get('sendTime') as FormControl;
  }
  get sendTitle(): FormControl {
    return this.mutationForm?.get('title') as FormControl;
  }

  ngOnInit(): void {
    this.title = this.ntfConfigFacade.title;
    this.action = this.ntfConfigFacade.action$;
    this._initForm();
    if (this.ntfConfigFacade.action$ !== ESolnAction.INSERT) {
      this.ntfConfigFacade.ntfConfigSingle$.subscribe(res => {
        if (this.ntfConfigFacade.action$ !== ESolnAction.CLONE) {
          this.id = res.id;
        }
        this.mutationForm?.patchValue(res);
      })
    }
  }

  close() {
    this.dialogRef.close(this.dialogRef.isLoadClose);
  }

  save(isClose = true) {
    this.ntfConfigFacade.save(this.mutationForm?.value, this.id).subscribe(res => {
      if (isClose && res) {
        this.dialogRef.close(res);
      }
      if (res) {
        this.dialogRef.isLoadClose = true;
        this._initForm();
      }
    });
  }

  private _initForm() {
    this.mutationForm = this.fb.group({
      timesType: [, Validators.compose([Validators.required])],
      posts: [, Validators.compose([Validators.required])],
      interact: [, Validators.compose([Validators.required])],
      negative: [, Validators.compose([Validators.required])],
      title: [, Validators.compose([Validators.required])],
      email: [],
      ntfApp: [],
    });

  }
}
