import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NtfComponent } from './containers/ntf/ntf.component';
import { NtfConfigComponent } from './containers/ntf-config/ntf-config.component';
import { NtfConfigLinkComponent } from './containers/ntf-config-link/ntf-config-link.component';
import { TopicNtfConfigComponent } from './containers/topic-ntf-config/topic-ntf-config.component';
import { NtfLinkComponent } from './containers/ntf-link/ntf-link.component';

const routes: Routes = [
  {
    path: 'ntf-app',
    data: {
      title: 'Cảnh báo qua notification',
    },
    component: NtfComponent,
  },
  {
    path: 'ntf-email',
    data: {
      title: 'Cảnh báo qua email',
    },
    component: NtfComponent,
  },
  {
    path: 'ntf-detail',
    data: {
      title: 'Chi tiết cảnh báo',
    },
    component: NtfLinkComponent,
  },
  {
    path: 'ntf-config',
    data: {
      title: 'Tùy chỉnh cảnh báo',
    },
    component: NtfConfigComponent,
  },
  {
    path: 'ntf-config/mutation',
    data: {
      title: 'Cấu hình tùy chỉnh cảnh báo',
    },
    component: NtfConfigLinkComponent,
  },
  {
    path: 'ntf-topic',
    data: {
      title: 'Duyệt tùy chỉnh cảnh báo',
    },
    component: TopicNtfConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
