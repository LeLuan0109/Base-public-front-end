import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '@shared/shared.module';
import { MenuModule } from 'primeng/menu';
import { HorizontalChartComponent } from './containers/horizontal-chart/horizontal-chart.component';
import { HorizontalTopChartComponent } from './containers/horizontal-top-chart/horizontal-top-chart.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ComboChartComponent } from './containers/combo-chart/combo-chart.component';
import { RatioLineChartComponent } from './containers/ratio-line-chart/ratio-line-chart.component';
import { DonutChartComponent } from './containers/donut-chart/donut-chart.component';
import { TopGridComponent } from './containers/top-grid/top-grid.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DataViewComponent } from './containers/data-view/data-view.component';
import { ProgressStackComponent } from './containers/progress-stack/progress-stack.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    HorizontalChartComponent,
    HorizontalTopChartComponent,
    ComboChartComponent,
    RatioLineChartComponent,
    DonutChartComponent,
    TopGridComponent,
    DataViewComponent,
    ProgressStackComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    TabViewModule,
    ButtonModule,
    SharedModule,
    MenuModule,
    ProgressBarModule,
    HighchartsChartModule,
    TooltipModule
  ],
  exports: [
    HorizontalChartComponent,
    HorizontalTopChartComponent,
    ComboChartComponent,
    RatioLineChartComponent,
    DonutChartComponent,
    TopGridComponent,
    DataViewComponent,
    ProgressStackComponent
  ]
})
export class MChart2Module { }
