import { ConfirmationService } from 'primeng/api';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';
import { AccountFacade } from '../../facades/account.facade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomVaidators } from '@shared/validators/custom.validator';
import { PATTERN } from '@shared/constants/pattern-validators.constant';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss'],
  providers: [ConfirmationService],
})
export class AccountPasswordComponent implements OnInit {
  title = 'Cập nhật mật khẩu';
  typePass = 'password';
  id: number | undefined;

  mutation: FormGroup | undefined;

  constructor(
    private dialogRef: MDialogRef,
    private fb: FormBuilder,
    private accountFacade: AccountFacade,
    private confirmationService: ConfirmationService
  ) {
  }

  get password(): FormControl {
    return this.mutation?.get('password') as FormControl
  }
  get passwordConfirmation(): FormControl {
    return this.mutation?.get('passwordConfirmation') as FormControl
  }

  ngOnInit(): void {
    this.initForm();
    this.accountFacade.accountSingle$.subscribe(account => {
      this.id = account.id;
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.confirmationService.confirm({
      message: 'Bạn thực sự muốn cập nhật lại mật khẩu? Nhấn nút "Đồng ý" để tiếp tục hoặc nhấn nút "Hủy" để hủy bỏ thao tác',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Không',
      closeOnEscape: true,
      acceptIcon: 'pi pi-check-circle',
      acceptButtonStyleClass: 'btn-action red',
      rejectButtonStyleClass: 'btn-action gray',
      accept: () => {
        this.accountFacade.setPassword(this.id!, this.mutation?.value).subscribe(res => {
          if (res.id) {
            this.dialogRef.close(res);
          }
        })
      },
    });

  }

  generatePassword() {
    const randomstring = Math.random().toString(36).slice(-8);
    this.password.setValue(randomstring);
    this.passwordConfirmation.setValue(randomstring);
    this.passwordConfirmation.updateValueAndValidity();
    this.password.updateValueAndValidity();
  }

  toggleMaskPass() {
    this.typePass = this.typePass === 'password' ? 'text' : 'password';
  }

  onChangePass(){
    this.passwordConfirmation.updateValueAndValidity()
  }

  initForm() {
    this.mutation = this.fb.group({
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
