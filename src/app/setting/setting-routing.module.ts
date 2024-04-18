import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './containers/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cài đặt tài khoản',
    },
    component: SettingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
