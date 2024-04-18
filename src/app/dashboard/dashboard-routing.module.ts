import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tổng quan',
      showSearch: true
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }