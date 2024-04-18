import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './containers/login-layout/login-layout.component';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { SidebarComponent } from './containers/main-layout/sidebar/sidebar.component';
import { HeaderComponent } from './containers/main-layout/header/header.component';
import { HeaderMenuComponent } from './containers/main-layout/header-menu/header-menu.component';
import { SidebarMenuComponent } from './containers/main-layout/sidebar-menu/sidebar-menu.component';
import { LinkMenuComponent } from './containers/main-layout/link-menu/link-menu.component';
import { SubMenuComponent } from './containers/main-layout/sub-menu/sub-menu.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { LayoutRoutingModule } from './layout-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerComponent } from './containers/spinner/spinner.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DataViewModule } from 'primeng/dataview';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { MReportToolbarModule } from '@based/m-report-toolbar/m-report-toolbar.module';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    LoginLayoutComponent,
    MainLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    HeaderMenuComponent,
    SidebarMenuComponent,
    LinkMenuComponent,
    SubMenuComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TieredMenuModule,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    MenubarModule,
    MenuModule,
    InputTextModule,
    DynamicDialogModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
    DataViewModule,
    MessagesModule,
    TableModule,
    TooltipModule,
    SharedModule,
    MReportToolbarModule,
    DropdownModule,
  ],
})
export class LayoutModule {}
