import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { RegiterComponent } from './containers/regiter/regiter.component';
import { VerifyComponent } from './containers/verify/verify.component';

const routes: Routes = [
  {
    path: 'login',
    data: {
      title: 'Đăng nhập',
    },
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    data: {
      title: 'Quên mật khẩu',
    },
    component: ForgotPasswordComponent,
  },
  // {
  //   path: 'regiter',
  //   data: {
  //     title: 'Đăng ký',
  //   },
  //   component: RegiterComponent,
  // },
  {
    path: 'verify/:token',
    data: {
      title: 'Xác nhận tài khoản',
    },
    component: VerifyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
