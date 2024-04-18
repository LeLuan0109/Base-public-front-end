import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './containers/user/user.component';
import { UserMutationComponent } from './containers/user-mutation/user-mutation.component';
import { UserLinkComponent } from './containers/user-link/user-link.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MDialogModule } from '../base-modules/m-dialog/m-dialog.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { MToolbarModule } from '@based/m-toolbar/m-toolbar.module';
import { MTooltableModule } from '@based/m-tooltable/m-tooltable.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { UserUploadComponent } from './containers/user-upload/user-upload.component';

@NgModule({
  declarations: [
    UserComponent,
    UserMutationComponent,
    UserLinkComponent,
    UserUploadComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    MDialogModule,
    RadioButtonModule,
    InputNumberModule,
    MToolbarModule,
    DynamicDialogModule,
    MTooltableModule,
  ]
})
export class UserModule { }
