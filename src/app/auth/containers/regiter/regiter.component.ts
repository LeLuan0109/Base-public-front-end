import { saveAs } from 'file-saver';
import { SpinnerService } from './../../../shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../facade/auth.facade';
import { PATTERN } from '@shared/constants/pattern-validators.constant';
import { MenuItem } from 'primeng/api';
import { CustomVaidators } from '@shared/validators/custom.validator';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styleUrls: ['./regiter.component.scss']
})
export class RegiterComponent implements OnInit {

  regiterForm: FormGroup | undefined;
  items: MenuItem[] = [];
  index = 0;
  isRegisted = false;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private spinnerService: SpinnerService,
  ) { }

  get email(): FormControl {
    return this.regiterForm?.get('email') as FormControl;
  }
  get fullName(): FormControl {
    return this.regiterForm?.get('fullName') as FormControl;
  }
  get phone(): FormControl {
    return this.regiterForm?.get('phone') as FormControl;
  }
  get companyName(): FormControl {
    return this.regiterForm?.get('companyName') as FormControl;
  }
  get address(): FormControl {
    return this.regiterForm?.get('address') as FormControl;
  }
  get password(): FormControl {
    return this.regiterForm?.get('password') as FormControl;
  }
  get passwordConfirmation(): FormControl {
    return this.regiterForm?.get('passwordConfirmation') as FormControl;
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Tài khoản',
      },
      {
        label: 'Công ty',
      },
      {
        label: 'Mật khẩu',
      }
    ]
    this._initForm();
  }

  disabledButton() {
    if (this.index === 0) {
      return this.email.invalid || this.fullName.invalid || this.phone.invalid
    } else if (this.index == 1) {
      return this.companyName.invalid || this.address.invalid
    } else {
      return this.password.invalid || this.passwordConfirmation.invalid
    }
  }

  regiter() {
    if (this.index < 2) {
      this.index += 1;
      return;
    }
    this.spinnerService.showWaitAll()
    this.authFacade.register(this.regiterForm?.value).subscribe({
      next: () => {
        this.spinnerService.hidenAll();
        this.isRegisted = true;
      },
      error: () => {
        this.spinnerService.hidenAll();
      }
    });
  }

  private _initForm() {
    this.regiterForm = this.fb.group({
      email: [, Validators.compose([Validators.required, Validators.pattern(PATTERN.email)])],
      fullName: [, Validators.compose([Validators.required, CustomVaidators.NoWhiteSpaceValidator])],
      phone: [, Validators.compose([Validators.required, Validators.pattern(PATTERN.phone)])],
      companyName: [, Validators.compose([Validators.required, CustomVaidators.NoWhiteSpaceValidator])],
      address: [, Validators.compose([Validators.required, CustomVaidators.NoWhiteSpaceValidator])],
      website: [],
      texCode: [],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6),
      Validators.maxLength(64), Validators.pattern(PATTERN.password)])],
      passwordConfirmation: ['', Validators.compose([Validators.required])],
    })

    this.passwordConfirmation.setValidators([
      Validators.required,
      CustomVaidators.ConfirmMatchValidator(
        this.password
      ),
    ])

    this.password.updateValueAndValidity();
    this.passwordConfirmation.updateValueAndValidity();
  }
}
