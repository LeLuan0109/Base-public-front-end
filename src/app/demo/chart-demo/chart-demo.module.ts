import { NgModule } from '@angular/core';
import { ChartDemoRoutingModule } from './chart-demo-routing.module copy';
import { ChartLineComponent } from './containers/chart-line/chart-line.component';
import { ChartPipeComponent } from './containers/chart-pipe/chart-pipe.component';
import { ChartBarComponent } from './containers/chart-bar/chart-bar.component';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [
    CommonModule,
    ChartDemoRoutingModule,
    ChartModule,
    CalendarModule,
    SharedModule,
    CardModule,
  ],
  providers: [],
  declarations: [ChartLineComponent, ChartPipeComponent, ChartBarComponent],
  imports: [
    CommonModule,
    ChartDemoRoutingModule,
    ChartModule,
    CalendarModule,
    SharedModule,
    CardModule,
  ],
})
export class ChartDemoModule {}
