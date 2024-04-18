import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ChartInfo } from '@shared/models/chart-info.model';
import Highcharts, { Options, SeriesOptionsType } from 'highcharts';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { Router } from '@angular/router';
import { SENTIMENT_ICON, SENTIMENT_LABEL } from '@shared/constants/sentiment.constant';
import { COMBO_CHART_OPTION } from '@shared/constants/chart-option.constant';

@Component({
  selector: 'app-smooth-line-sentiment',
  templateUrl: './smooth-line-sentiment.component.html',
  styleUrls: ['./smooth-line-sentiment.component.scss'],
})
export class SmoothLineSentimentComponent implements OnInit {
  @ViewChild('chartContent', { static: true }) chartContent!: any;
  Highcharts: typeof Highcharts = Highcharts;
  formatDate: string = 'dd/MM/yyyy';
  optSentimentValue: { [key: string]: number } = {
    'Trung tính': 0,
    'Tích cực': 1,
    'Tiêu cực': 2,
  };
  optSentimentLabel = SENTIMENT_LABEL;
  optSentimentIcon = SENTIMENT_ICON;

  optTime: { lable: string; value: number; active: boolean }[] = [
    { lable: 'D', value: 0, active: true },
    { lable: 'W', value: 7, active: false },
    { lable: 'M', value: 30, active: false },
    { lable: 'Y', value: 360, active: false },
  ];

  sentimentTotals: { value: number; percen: number; serie: number }[] = [];
  params: MReportFilterModel = {};
  sentiment?: { agg: ChartInfo; sta: { title: string; data: SeriesOptionsType[] }[] };
  isEmpty = true;
  dataLength = 0;

  options: Options | null = null;

  constructor(private dashboardFacade: DashboardFacade, private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.dashboardFacade.sentiment$.subscribe((res) => {
      const _totalMax = Math.max(1, res.positive + res.negative + res.neutral);
      this.sentimentTotals = [
        {
          value: res.positive,
          percen: (res.positive / _totalMax) * 100,
          serie: 1,
        },
        {
          value: res.negative,
          percen: (res.negative / _totalMax) * 100,
          serie: 2,
        },
        {
          value: res.neutral,
          percen: (res.neutral / _totalMax) * 100,
          serie: 0,
        },
      ];
      if (res.series[0].type === 'areaspline') {
        this.dataLength = res.series[0].data?.length!;
      }
      this.options = COMBO_CHART_OPTION({
        dataLength: this.dataLength,
        data: res.series,
        title: '',
        onPointClick: (data: any) => {
          this._showPost(data);
        },
        objectLabel: 'thảo luận',
      });
    });
    this.dashboardFacade.filterData$.subscribe((res) => {
      this.params = res;
    });
  }

  toggleFull() {
    const elem = this.chartContent.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  @HostListener('fullscreenchange', ['$event'])
  @HostListener('webkitfullscreenchange', ['$event'])
  @HostListener('mozfullscreenchange', ['$event'])
  @HostListener('MSFullscreenChange', ['$event'])
  screenChange(event: any) {
    const elem = this.chartContent.nativeElement;
    if (elem.classList.contains('view-full')) {
      this.renderer.removeClass(elem, 'view-full');
    } else {
      this.renderer.addClass(elem, 'view-full');
    }
  }

  _showPost(data: any) {
    const _date = new Date(data.label);
    const _url = this.router.serializeUrl(
      this.router.createUrlTree([`/posts`], {
        queryParams: {
          startDate: Math.floor(_date.getTime() / 1000),
          endDate: Math.floor(_date.getTime() / 1000),
          sort: 'NEW',
          sentiments: this.optSentimentValue[data.series.name],
          spam: 0,
          completed: 1,
        },
      })
    );
    window.open(_url, '_blank');
  }
}
