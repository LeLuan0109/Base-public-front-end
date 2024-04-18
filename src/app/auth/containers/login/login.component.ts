import { AuthFacade } from './../../facade/auth.facade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowErrorService } from '@shared/services/show-error.service';
import particles from '../../../../particles.json'

declare var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  checkLogin = false;

  constructor(private fb: FormBuilder,
    private authFacade: AuthFacade,
    private router: Router,
    private showErrorService: ShowErrorService) { }

  get password(): FormControl {
    return this.loginForm?.get('password') as FormControl;
  }

  get username(): FormControl {
    return this.loginForm?.get('username') as FormControl;
  }

  ngOnInit(): void {
    // this.initBackground();
    this.initForm();
    setTimeout(() => {
      this.showErrorService.showError = true;
    }, 1000)
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        ,
        Validators.compose([
          Validators.required,
          Validators.min(3),
        ]),
        Validators.composeAsync([]),
      ],
      password: [
        ,
        Validators.compose([Validators.required]),
        Validators.composeAsync([]),
      ],
    });
  }

  login() {
    this.checkLogin = true;
    this.authFacade.login(this.loginForm?.value).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigate(['/dashboard']);
        } else {
          const that = this;
          setTimeout(function () {
            that.checkLogin = false
          }, 900);
        }
      }
    });
  }

  // initBackground() {
  //   particlesJS('background', particles, null);
  // }
}