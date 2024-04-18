import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartLineComponent } from './containers/chart-line/chart-line.component';
import { ChartBarComponent } from './containers/chart-bar/chart-bar.component';
import { ChartPipeComponent } from './containers/chart-pipe/chart-pipe.component';

const routes: Routes = [
  {
    path: 'bar',
    data: {
      title: 'Chart Bar',
    },
    component: ChartBarComponent,
  },{
    path: 'line',
    data: {
      title: 'Chart line',
    },
    component: ChartLineComponent,
  },{
    path: 'pipe',
    data: {
      title: 'Chart line',
    },
    component: ChartPipeComponent,
  } 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartDemoRoutingModule { }
