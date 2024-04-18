import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './containers/menu/menu.component';
import { TreeTableModule } from 'primeng/treetable';
import { SharedModule } from '@shared/shared.module';
import { MToolbarModule } from '@based/m-toolbar/m-toolbar.module';
import { MTooltableModule } from '@based/m-tooltable/m-tooltable.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuMutationComponent } from './containers/menu-mutation/menu-mutation.component';
import { MDialogModule } from '@based/m-dialog/m-dialog.module';
import { MenuSortComponent } from './containers/menu-sort/menu-sort.component';
import { OrderListModule } from 'primeng/orderlist';

@NgModule({
  declarations: [
    MenuComponent,
    MenuMutationComponent,
    MenuSortComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule,
    TreeTableModule,
    MToolbarModule,
    MTooltableModule,
    ConfirmDialogModule,
    MDialogModule,
    OrderListModule
  ]
})
export class MenuModule { }
