import { UserLinkComponent } from './containers/user-link/user-link.component';
import { UserComponent } from './containers/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Người dùng',
    },
    component: UserComponent,
  },
  {
    path: 'mutation',
    data: {
      title: 'Người dùng',
    },
    component: UserLinkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
