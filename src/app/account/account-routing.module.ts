import { AccountLinkComponent } from './containers/account-link/account-link.component';
import { AccountComponent } from './containers/account/account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPasswordLinkComponent } from './containers/account-password-link/account-password-link.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý tài khoản',
    },
    component: AccountComponent,
  },
  {
    path: 'mutation',
    data: {
      title: 'Quản lý tài khoản',
    },
    component: AccountLinkComponent,
  },
  {
    path: ':id/password',
    data: {
      title: 'Quản lý tài khoản',
    },
    component: AccountPasswordLinkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
