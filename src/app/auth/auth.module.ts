import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { CardModule } from 'primeng/card';
import { RegiterComponent } from './containers/regiter/regiter.component';
import {StepsModule} from 'primeng/steps';
import { VerifyComponent } from './containers/verify/verify.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RegiterComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    CheckboxModule,
    DropdownModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    StepsModule
  ]
})
export class AuthModule { }
