import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MReportFilterModel, TIME_LINE_OPT } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { MReportToolbarFacade } from '@based/m-report-toolbar/facades/m-report-toolbar.facade';
import { LabelValue } from '@shared/models/label-value.model';
import { TIMELINE_CONSTANT } from '@shared/constants/date.constant';

@Component({
  selector: 'm-reportToolbar',
  templateUrl: './m-report-toolbar.component.html',
  styleUrls: ['./m-report-toolbar.component.scss']
})
export class MReportToolbarComponent implements OnInit {
  @Output('onSearch') onSearch = new EventEmitter<MReportFilterModel>();
  rangeDates: Date[] = [];

  topic: {
    opts: LabelValue[]
    name?: string,
    filter?: string,
    index: number,
    hasNextPage: boolean
  } = { opts: [], index: 0, hasNextPage: true };

  topicId?: number;

  constructor(private mReportToolbarFacade: MReportToolbarFacade, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._initFilter();
  }

  filterTopic(event?: any) {
    if (this.topic.filter !== event?.filter) {
      this.topic.index = 0;
      this.topic.opts = [];
    }
    if (this.topic.filter !== event?.filter || this.topic.hasNextPage) {
      this.topic.filter = event?.filter;
      // this.mReportToolbarFacade.filterTopics({ name: this.topic.filter ?? '', pageIndex: this.topic.index, pageSize: 34 }).subscribe(res => {
      //   const dataCopy = [...this.topic.opts];
      //   dataCopy.push(...res.data ?? []);
      //   this.topic.opts = dataCopy;
      //   this.topic.hasNextPage = res.pageInfo?.hasNextPage ?? false;
      // })
      this.topic.index++;
    }
  }

  selectTopic(event: any) {
    this.topic.name = event.data?.label;
    this.onFilterChange();
  }

  onFilterChange() {
    const filter = {
      topicId: this.topicId,
      topicName: this.topic.name,
      startDate: Math.trunc(this.rangeDates[0].getTime() / 1000),
      endDate: Math.trunc(this.rangeDates[1].getTime() / 1000)
    };
    this.router.navigate(
      [],
      {
        queryParams: filter,
        queryParamsHandling: 'merge'
      });
    this.onSearch.emit(filter);
  }

  private _initFilter() {
    const filter = this.route.snapshot.queryParams as MReportFilterModel;
    this._initDate(filter);
    this.topicId = (filter.topicId && Number.isNaN(Number(filter.topicId))) ? Number(filter.topicId) : undefined;
    this.topic.name = filter.topicName ? filter.topicName : undefined;
    this.onFilterChange();
  }

  private _initDate(filter: any) {
    const _defaultDate = new Date();
    _defaultDate.setDate(_defaultDate.getDate() - TIMELINE_CONSTANT.week.value + 1);
    let _startDate = filter.startDate;
    let _endDate = filter.endDate;
    if (!filter.startDate || (filter.startDate as unknown as string).length !== 10 || Number.isNaN(Number(filter.startDate))) {
      _startDate = Math.trunc(_defaultDate.getTime() / 1000);
    }
    if (!filter?.endDate || (filter.endDate as unknown as string).length !== 10 || Number.isNaN(Number(filter.endDate))) {
      _endDate = Math.trunc(Date.now() / 1000);
    }
    this.rangeDates = [
      new Date(_startDate * 1000),
      new Date(_endDate * 1000),
    ];
  }
}
