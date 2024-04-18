import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NtfComponent } from './containers/ntf/ntf.component';
import { NtfConfigComponent } from './containers/ntf-config/ntf-config.component';
import { MToolbarModule } from '@based/m-toolbar/m-toolbar.module';
import { MTooltableModule } from '@based/m-tooltable/m-tooltable.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from '@shared/shared.module';
import { MDialogModule } from '@based/m-dialog/m-dialog.module';
import { NtfViewComponent } from './containers/ntf-view/ntf-view.component';
import { NtfLinkComponent } from './containers/ntf-link/ntf-link.component';
import { NtfConfigMutationComponent } from './containers/ntf-config-mutation/ntf-config-mutation.component';
import { CheckboxModule } from 'primeng/checkbox';
import { NtfConfigLinkComponent } from './containers/ntf-config-link/ntf-config-link.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { TopicNtfConfigComponent } from './containers/topic-ntf-config/topic-ntf-config.component';
import { TopicNtfConfigApproveComponent } from './containers/topic-ntf-config-approve/topic-ntf-config-approve.component';
import { TabViewModule } from 'primeng/tabview';
import { MLazyDropdownModule } from '@based/m-lazy-dropdown/m-lazy-dropdown.module';
import { NtfKeywordConfigMutationComponent } from './containers/ntf-keyword-config-mutation/ntf-keyword-config-mutation.component';
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { MLazyMultiSelectModule } from '@based/m-lazy-multi-select/m-lazy-multi-select.module';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    NtfComponent,
    NtfConfigComponent,
    NtfViewComponent,
    NtfLinkComponent,
    NtfConfigMutationComponent,
    NtfConfigLinkComponent,
    TopicNtfConfigComponent,
    TopicNtfConfigApproveComponent,
    NtfKeywordConfigMutationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule,
    MToolbarModule,
    MTooltableModule,
    TableModule,
    DropdownModule,
    ConfirmDialogModule,
    MDialogModule,
    CheckboxModule,
    InputNumberModule,
    TabViewModule,
    MLazyDropdownModule,
    ChipsModule,
    ChipModule,
    CalendarModule,
    MLazyMultiSelectModule,
    InputSwitchModule
  ]
})
export class NotificationModule { }
