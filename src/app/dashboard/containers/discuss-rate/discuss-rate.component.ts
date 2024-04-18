import { Component, OnInit } from '@angular/core';
import Highcharts, { Options } from 'highcharts';
import { EPostSource, ESourceName, EWebSourceType } from '@shared/constants/source.constant';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { Router } from '@angular/router';
import { SeriesOptionsType } from 'highcharts';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { DecimalPipe } from '@angular/common';
import { DOUGHNUT_CHART_OPTION } from '@shared/constants/chart-option.constant';

@Component({
  selector: 'app-discuss-rate',
  templateUrl: './discuss-rate.component.html',
  styleUrls: ['./discuss-rate.component.scss'],
})
export class DiscussRateComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  decimalPipe = new DecimalPipe('en-US');
  params: MReportFilterModel = {};

  options: Options | null = null;

  constructor(private dashboardFacade: DashboardFacade, private router: Router) {}

  get tooltipContent(): string {
    return `<span>Thảo Luận = Bình luận + Chia sẻ + Bài đăng.</span>`;
  }

  ngOnInit(): void {
    this.dashboardFacade.discussRate$.subscribe((res) => {
      this.options = DOUGHNUT_CHART_OPTION({
        data: res,
        title: this.getChartTitle(res),
        onPointClick: (pointName) => {
          this.showPost(pointName);
        },
        objectLabel: 'thảo luận',
      });
    });

    this.dashboardFacade.filterData$.subscribe((res) => {
      this.params = res;
    });
  }

  showPost(sourceName: string) {
    let sources;
    let webSourceType;
    switch (sourceName) {
      case ESourceName.FACEBOOK:
        sources = EPostSource.FACEBOOK;
        break;
      case ESourceName.YOUTUBE:
        sources = EPostSource.YOUTUBE;
        break;
      case ESourceName.TIKTOK:
        sources = EPostSource.TIKTOK;
        break;
      case ESourceName.FORUM:
        sources = EPostSource.WEBSITE;
        webSourceType = [EWebSourceType.FORUM];
        break;
      case ESourceName.LINKEDIN:
        sources = EPostSource.LINKEDIN;
        break;
      case ESourceName.NEWS:
        sources = EPostSource.WEBSITE;
        webSourceType = [EWebSourceType.OFFICIAL, EWebSourceType.LOCAL, EWebSourceType.JOURNAL, EWebSourceType.SYNTHESIS, EWebSourceType.BLOG, EWebSourceType.OTHER];
        break;
    }

    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/posts`], {
        queryParams: {
          startDate: this.params.startDate,
          endDate: this.params.endDate,
          spam: 0,
          completed: 1,
          sources,
          webSourceType,
        },
      })
    );
    window.open(url, '_blank');
  }

  emptyData(data?: SeriesOptionsType[]) {
    if (!data || data?.length < 1 || data.filter((r: any) => !r.data || r.data.length < 1).length === data.length) {
      return true;
    }
    return false;
  }

  getChartTitle(data?: SeriesOptionsType[]): string {
    if (data?.[0].type === 'pie') {
      const total = data[0].data?.reduce((prev, curr: any) => {
        return prev + curr.y;
      }, 0) as number;
      return `<span style='font-size: 28px'>${this.decimalPipe.transform(total, '1.0-0')}</span><br>
        <span style='font-size: 14px'>Thảo luận</span>`;
    } else {
      return '';
    }
  }
}
