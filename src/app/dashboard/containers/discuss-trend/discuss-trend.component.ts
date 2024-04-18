import { Component, OnInit } from '@angular/core';
import Highcharts, { Options, SeriesOptionsType } from 'highcharts';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AREA_SPLINE_CHART_OPTION } from '@shared/constants/chart-option.constant';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { formatDMY } from '@shared/utils/date.util';

@Component({
  selector: 'app-discuss-trend',
  templateUrl: './discuss-trend.component.html',
  styleUrls: ['./discuss-trend.component.scss'],
})
export class DiscussTrendComponent implements OnInit {
  optTime: { lable: string; value: number; active: boolean }[] = [
    { lable: 'D', value: 0, active: true },
    { lable: 'W', value: 7, active: false },
    { lable: 'M', value: 30, active: false },
    { lable: 'Y', value: 365, active: false },
  ];

  Highcharts: typeof Highcharts = Highcharts;
  datePipe = new DatePipe('en-US');
  params: MReportFilterModel = {};

  total: number = 0;
  timeLineLabel: string = '';
  growthRate: number = 0;

  legendItemStates: any = {};
  options: Options | null = null;

  constructor(private dashboardFacade: DashboardFacade, private router: Router) {}

  ngOnInit(): void {
    this.dashboardFacade.discussTrend$.subscribe((res) => {
      this.total = res.total;
      this.timeLineLabel = res.timeLineLabel;
      this.growthRate = res.growthRate;

      let maxDateRangeData: any = { data: [] };
      res.data.forEach((itemData) => {
        if (itemData.type === 'areaspline') {
          this.legendItemStates[itemData.name!] = true;
          if (itemData.data!.length >= maxDateRangeData?.data?.length) {
            maxDateRangeData = itemData;
          }
        }
      });

      this.options = AREA_SPLINE_CHART_OPTION({
        data: res.data,
        xAxisLabels: this._getChartXAxisLabels(maxDateRangeData),
        onPointClick: (pointName) => {
          this.showPost(pointName);
        },
        onLegendItemClick: (event: any) => {
          const seriesName = event.target.name;
          this.legendItemStates[seriesName] = !event.target.visible; // Cập nhật trạng thái của LegendItem
          if (this.updateXAxisLabels(res.data)) {
            this.options = {
              ...this.options,
              xAxis: {
                categories: this.updateXAxisLabels(res.data),
              },
            };
          }
        },
        objectLabel: 'thảo luận',
      });
    });

    this.dashboardFacade.filterData$.subscribe((res) => {
      this.params = res;
    });
  }

  updateXAxisLabels(data: SeriesOptionsType[]): string[] {
    let xLabels: string[] = [];
    let maxXLabelLength: string[] = [];
    data.forEach((chartItem: SeriesOptionsType) => {
      if (this.legendItemStates[chartItem.name!]) {
        xLabels = this._getChartXAxisLabels(chartItem);
        if (xLabels.length >= maxXLabelLength.length) {
          maxXLabelLength = xLabels;
        }
      }
    });
    return maxXLabelLength;
  }

  showPost(event: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/posts`], {
        queryParams: this._getDateQueryParam(event),
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

  private _getChartXAxisLabels(data: SeriesOptionsType): string[] {
    const _isOneDay = this.params.startDate === this.params.endDate;
    if (data.type === 'areaspline') {
      return data.data!.map((point: any) => {
        const _format = _isOneDay ? 'HH:mm' : 'dd/MM';
        return this.datePipe.transform(formatDMY(point.name), _format)!;
      });
    }
    return [];
  }

  private _getDateQueryParam(date: string) {
    const _date = new Date(formatDMY(date));
    _date.setHours(0);
    _date.setMinutes(0);
    const _dateParam = Math.trunc(_date.getTime() / 1000);
    return {
      startDate: _dateParam,
      endDate: _dateParam,
      spam: 0,
      completed: 1,
    };
  }
}
