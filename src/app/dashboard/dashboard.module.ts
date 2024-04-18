import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DasboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { SharedModule } from "@shared/shared.module";
import { TopWebsiteInteractComponent } from "./containers/top-website-interact/top-website-interact.component";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { ProgressBarModule } from "primeng/progressbar";
import { MChart2Module } from "@based/m-chart-2/m-chart-2.module";
import { MReportToolbarModule } from "@based/m-report-toolbar/m-report-toolbar.module";
import { MenuModule } from "primeng/menu";
import { TooltipModule } from "primeng/tooltip";
import { TagsSentimentLevelComponent } from "./containers/tags-sentiment-level/tags-sentiment-level.component";
import { TagsSentimentComponent } from "./containers/tags-sentiment/tags-sentiment.component";
import { DiscussRateComponent } from "./containers/discuss-rate/discuss-rate.component";
import { HighchartsChartModule } from "highcharts-angular";
import { TopSocialInteractComponent } from "./containers/top-social-interact/top-social-interact.component";
import { SmoothLineSentimentComponent } from './containers/smooth-line-sentiment/smooth-line-sentiment.component';
import { DiscussTrendComponent } from './containers/discuss-trend/discuss-trend.component';
import { MCardModule } from "@based/m-card/m-card.module";
@NgModule({
  declarations: [
    DashboardComponent,
    TagsSentimentLevelComponent,
    TagsSentimentComponent,
    DiscussRateComponent,
    TopSocialInteractComponent,
    TopWebsiteInteractComponent,
    SmoothLineSentimentComponent,
    DiscussTrendComponent
  ],
  imports: [
    CommonModule,
    DasboardRoutingModule,
    HighchartsChartModule,
    SharedModule,
    MReportToolbarModule,
    CardModule,
    DividerModule,
    ProgressBarModule,
    MChart2Module,
    MenuModule,
    TooltipModule,
    MCardModule
  ]
})
export class DashboardModule {}
