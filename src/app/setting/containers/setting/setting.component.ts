import { SessionService } from './../../../shared/services/session.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PATTERN } from 'src/app/shared/constants/pattern-validators.constant';
import { UserInfo } from 'src/app/shared/models/user-info.model';
import { SettingFacade } from '../../facades/setting.facade';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomVaidators } from '@shared/validators/custom.validator';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [ConfirmationService, DialogService],
})
export class SettingComponent implements OnInit {

  settingForm: FormGroup | undefined;
  user: UserInfo = {};
  isChange= false;

  constructor(
    private fb: FormBuilder,
    private settingFacade: SettingFacade,
    private confirmationService: ConfirmationService,
    private sessionService: SessionService
  ) { }

  get fullName(): FormControl {
    return this.settingForm?.get('fullName') as FormControl;
  }
  get email(): FormControl {
    return this.settingForm?.get('email') as FormControl;
  }
  get phone(): FormControl {
    return this.settingForm?.get('phone') as FormControl;
  }

  ngOnInit(): void {
    this.user = this.sessionService.retrieveAccountInfo() as UserInfo;
    this.initForm();
  }

  initForm() {
    this.settingForm = this.fb.group({
      fullName: [this.user.fullName, Validators.compose([Validators.required, CustomVaidators.NoWhiteSpaceValidator()])],
      email: [
        this.user.email,
        Validators.compose([
          Validators.required,
          Validators.pattern(PATTERN.email),
          Validators.maxLength(64),
        ]),
      ],
      phone: [
        this.user.phone,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(PATTERN.phone),
        ]),
      ],
    });
  }

  save() {
    this.settingFacade
      .updateMe(this.settingForm?.value)
      .subscribe();
  }
}
