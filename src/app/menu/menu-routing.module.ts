import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './containers/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Menu hệ thống',
    },
    component: MenuComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
