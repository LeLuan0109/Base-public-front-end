import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieChartComponent } from './containers/pie-chart/pie-chart.component';
import { LineChartComponent } from './containers/line-chart/line-chart.component';
import { ColumnChartComponent } from './containers/column-chart/column-chart.component';
import { StackChartComponent } from './containers/stack-chart/stack-chart.component';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ComboChartComponent } from './containers/combo-chart/combo-chart.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { MapVietnamChartComponent } from './containers/map-vietnam-chart/map-vietnam-chart.component';
import { HorizontalChartComponent } from './containers/horizontal-chart/horizontal-chart.component';
import { SharedModule } from '@shared/shared.module';
import { MenuModule } from 'primeng/menu';
import { CompareChartComponent } from './containers/compare-chart/compare-chart.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TableDetailComponent } from './containers/table-detail/table-detail.component';
import { MDialogModule } from '@based/m-dialog/m-dialog.module';
import { ProgressbarComponent } from './containers/progressbar/progressbar.component';


@NgModule({
  declarations: [
    PieChartComponent,
    LineChartComponent,
    ColumnChartComponent,
    StackChartComponent,
    ComboChartComponent,
    MapVietnamChartComponent,
    HorizontalChartComponent,
    CompareChartComponent,
    TableDetailComponent,
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    TabViewModule,
    ButtonModule,
    SharedModule,
    MenuModule,
    CheckboxModule,
    MDialogModule
  ],
  exports: [
    PieChartComponent,
    LineChartComponent,
    ColumnChartComponent,
    StackChartComponent,
    ComboChartComponent,
    MapVietnamChartComponent,
    HorizontalChartComponent,
    CompareChartComponent,
    ProgressbarComponent
  ]
})
export class MChartModule { }
