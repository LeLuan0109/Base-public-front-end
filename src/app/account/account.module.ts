import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './containers/account/account.component';
import { AccountMutationComponent } from './containers/account-mutation/account-mutation.component';
import { AccountLinkComponent } from './containers/account-link/account-link.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MDialogModule } from '../base-modules/m-dialog/m-dialog.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { AccountPasswordComponent } from './containers/account-password/account-password.component';
import { AccountPasswordLinkComponent } from './containers/account-password-link/account-password-link.component';
import { MToolbarModule } from '@based/m-toolbar/m-toolbar.module';
import { MTooltableModule } from '@based/m-tooltable/m-tooltable.module';

@NgModule({
  declarations: [
    AccountComponent,
    AccountMutationComponent,
    AccountLinkComponent,
    AccountPasswordComponent,
    AccountPasswordLinkComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    MDialogModule,
    RadioButtonModule,
    InputNumberModule,
    MToolbarModule,
    MTooltableModule,
  ]
})
export class AccountModule { }
