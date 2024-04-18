import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { ChartInfo } from '@shared/models/chart-info.model';
import { SeriesOptionsType } from 'highcharts';
import { SearchService } from 'src/app/layout/services/search.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  param: MReportFilterModel = {};
  unsubscribe = new Subject<any>();
  i = 0;
  constructor(private dashboardFacade: DashboardFacade, private searchService: SearchService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    let navigationId = 0;
    // this.searchService.onSearch$.pipe(takeUntil(this.unsubscribe)).subscribe((searchParam) => {
    //   if (this.i > 0 || history.state.navigationId !== navigationId) {
    //     this.dashboardFacade.filterData = searchParam;
    //     this.dashboardFacade.loadData(searchParam);
    //   }
    //   this.i++;
    //   this.cdref.detectChanges();
    // });
  }

  ngOnDestroy(): void {
    // this.unsubscribe.next(null);
    // this.unsubscribe.complete();
  }
}
