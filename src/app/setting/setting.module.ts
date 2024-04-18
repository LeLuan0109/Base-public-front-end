import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { SettingComponent } from './containers/setting/setting.component';
import { SharedModule } from '../shared/shared.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    AvatarModule,
    CalendarModule,
    RadioButtonModule,
    PasswordModule,
  ]
})
export class SettingModule { }
