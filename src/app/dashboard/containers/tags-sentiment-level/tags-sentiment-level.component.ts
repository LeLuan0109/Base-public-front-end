import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { SentimentByTagInfo } from '../../models/sentiment.model';
import { collapse } from '@shared/animations/animations';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ProgressSentValue, ProgressStackValue } from '@based/m-chart-2/containers/progress-stack/progress-stack.component';

@Component({
  selector: 'app-tags-sentiment-level',
  templateUrl: './tags-sentiment-level.component.html',
  styleUrls: ['./tags-sentiment-level.component.scss'],
  animations: [collapse(200)],
})
export class TagsSentimentLevelComponent {
  @Input() value: SentimentByTagInfo[] | undefined;
  @Input() styleClass?: string;
  @Input() totalMax?: number;
  params: MReportFilterModel = {};
  optsentimentValue: { [key: string]: number } = {
    'Tích cực': 1,
    'Tiêu cực': 2,
    'Trung tính': 0,
  };

  constructor(private router: Router, private dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {
    this.dashboardFacade.filterData$.subscribe((res) => {
      this.params = res;
    });
  }

  showPost(event: ProgressSentValue) {
    let sentiment = '';
    if (event.type === 'all') {
      (event.value as ProgressStackValue[]).forEach((val: any) => {
        sentiment += `&sentiments=${this.optsentimentValue[val.label]}`;
      });
    } else if (event.type === 'single') {
      sentiment = `&sentiments=${this.optsentimentValue[(event.value as ProgressStackValue).label!]}`;
    }
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/posts`], {
        queryParams: {
          startDate: this.params?.startDate,
          endDate: this.params?.endDate,
          sort: 'NEW',
          tag: event?.label,
          spam: 0,
          completed: 1,
        },
      })
    );
    window.open(url + sentiment, '_blank');
  }
}
