import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PATTERN } from '@shared/constants/pattern-validators.constant';
import { AuthFacade } from '../../facade/auth.facade';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup | undefined;
  forgoted = false;

  constructor(private fb: FormBuilder, private authFacade: AuthFacade, private spinnerService: SpinnerService) { }

  get email(): FormControl {
    return this.forgotForm?.get('email') as FormControl
  }

  ngOnInit(): void {
    this.initForm();
  }

  send() {
    this.spinnerService.showWaitAll();
    this.authFacade.forgotPass(this.forgotForm?.value).subscribe(res => {
      if(res) {
        this.forgoted = true;
        this.spinnerService.hidenAll();
      }
    })
  }

  initForm() {
    this.forgotForm = this.fb.group({
      email: [, Validators.compose([Validators.required, Validators.pattern(PATTERN.email), Validators.maxLength(64)])],
    })
  }
}
