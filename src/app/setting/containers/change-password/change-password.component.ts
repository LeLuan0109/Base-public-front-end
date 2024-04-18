import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomVaidators } from 'src/app/shared/validators/custom.validator';
import { SettingFacade } from '../../facades/setting.facade';
import { PATTERN } from '@shared/constants/pattern-validators.constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup | undefined;

  constructor(
    private settingFacade: SettingFacade,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
  }

  get password(): FormControl {
    return this.passwordForm?.get('password') as FormControl;
  }
  get passwordNew(): FormControl {
    return this.passwordForm?.get('passwordNew') as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.passwordForm?.get('confirmPassword') as FormControl;
  }

  ngOnInit(): void {
    this._init();
  }

  close() {
    this.ref.destroy();
  }

  save() {
    this.settingFacade
      .changePassword(this.passwordForm?.value)
      .subscribe((res) => {
        if (res) {
          this.ref.destroy();
        }
      });
  }
  
  onChangePass() {
    this.confirmPassword.updateValueAndValidity();
  }

  private _init() {
    this.passwordForm = new FormGroup({
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(64),
          Validators.pattern(PATTERN.password)
        ])
      ),
      passwordNew: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(64),
          Validators.pattern(PATTERN.password)
        ])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([Validators.required])
      )
    });

    this.confirmPassword.setValidators([
      Validators.required,
      CustomVaidators.ConfirmMatchValidator(
        this.passwordNew
      ),
    ]);
  }
}
