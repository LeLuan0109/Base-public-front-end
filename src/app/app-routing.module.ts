import { BackupConfigModule } from './backup-config/backup-config.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { IsLogin } from './auth/guards/is-login.guard';
import { LoginLayoutComponent } from './layout/containers/login-layout/login-layout.component';
import { MainLayoutComponent } from './layout/containers/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [IsLogin],
    component: LoginLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
      },
      // {
      //   path: 'social-topic',
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./social-topic/social-topic.module').then((m) => m.SocialTopicModule),
      // },
      // {
      //   path: 'posts',
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
      // },
      // {
      //   path: 'reports',
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
      // },

      {
        path: 'setting',
        canActivate: [AuthGuard],
        loadChildren: () => import('./setting/setting.module').then((m) => m.SettingModule),
      },
      // {
      //   path: 'notification',
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./notification/notification.module').then((m) => m.NotificationModule),
      // },
    ],
  },
  // {
  //   path: 'newspaper',
  //   loadChildren: () => import('./post-newspaper/post-newspaper.module').then((m) => m.PostNewspaperModule),
  // },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
