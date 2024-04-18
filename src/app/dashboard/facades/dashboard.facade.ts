import { SpinnerService } from '@shared/services/spinner.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, of } from 'rxjs';
// import { MentionReportService } from 'src/app/reports/services/mention-report.service';
// import { RankingReportService } from 'src/app/reports/services/ranking-report.service';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
// import { SentimentReportService } from 'src/app/reports/services/sentiment-report.service';
import { SentimentByTagInfo, SentimentByTagModel, SentimentInfo } from '../models/sentiment.model';
import { TopProfileInteractModel } from '../models/top-profile.model';
import { PointOptionsObject, SeriesAreasplineOptions, SeriesOptionsType } from 'highcharts';
// import { any } from 'src/app/reports/models/metion-report.model';
import { ESourceColor, ESourceName } from '@shared/constants/source.constant';
import { SourceDiscussModel } from '../models/source-discuss.model';
import { DatePipe } from '@angular/common';
import { SessionService } from '@shared/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  private _filterData = new BehaviorSubject<MReportFilterModel | null>(null);

  private _discussRate = new BehaviorSubject<SeriesOptionsType[] | null>(null);
  private _discussTrend = new BehaviorSubject<{ data: SeriesOptionsType[]; total: number; growthRate: number; timeLineLabel: string } | null>(null);
  private _sentiment = new BehaviorSubject<{ positive: number; neutral: number; negative: number; series: SeriesOptionsType[] } | null>(null);
  private _tagsSentiment = new BehaviorSubject<{ data: SentimentByTagModel[]; totalMax: number } | null>(null);
  private _topProfileSocical = new BehaviorSubject<TopProfileInteractModel | null>(null);
  private _topProfileWebsite = new BehaviorSubject<TopProfileInteractModel | null>(null);

  constructor(
    // private rankingReportService: RankingReportService,
    // private mentionReportService: MentionReportService,
    // private sentimentReportService: SentimentReportService,
    private spinnerService: SpinnerService,
    private sessionService: SessionService
  ) { }

  get discussRate$(): Observable<SeriesOptionsType[]> {
    return this._discussRate.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get discussTrend$(): Observable<{ data: SeriesOptionsType[]; total: number; growthRate: number; timeLineLabel: string }> {
    return this._discussTrend.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get sentiment$(): Observable<{ positive: number; neutral: number; negative: number; series: SeriesOptionsType[] }> {
    return this._sentiment.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get filterData$(): Observable<MReportFilterModel> {
    return this._filterData.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get tagsSentiment$(): Observable<{ data: SentimentByTagModel[]; totalMax: number }> {
    return this._tagsSentiment.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get topProfileWebsite$(): Observable<TopProfileInteractModel> {
    return this._topProfileWebsite.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get topProfileSocial$(): Observable<TopProfileInteractModel> {
    return this._topProfileSocical.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set filterData(input: MReportFilterModel) {
    this._filterData.next(input);
  }

  loadData(filter: MReportFilterModel) {
    const sourceDiscuss = new SourceDiscussModel();
    filter.orgId = this.sessionService.retrieveAccountInfo()?.organization?.[0]?.orgId;
    this.spinnerService.showWaitAll();
    sourceDiscuss.handingFilter(filter);
    const { oldStartDate } = sourceDiscuss;
    const _isOneDay = filter.startDate === filter.endDate;
    // combineLatest({
    //   discussRate: this.mentionReportService.aggSourceByTime({
    //     orgId: filter.orgId,
    //     topicId: filter.topicId,

    //     input: { startDate: filter.startDate, endDate: filter.endDate, tag: filter.tag },
    //   }),
    //   discussTrend: this.mentionReportService.statisticalSourceByTime({
    //     orgId: filter.orgId,
    //     topicId: filter.topicId,

    //     input: { endDate: filter.endDate, startDate: _isOneDay ? filter.startDate : oldStartDate, tag: filter.tag },
    //   }),
    //   discussTrendOld: _isOneDay
    //     ? this.mentionReportService.statisticalSourceByTime({
    //       orgId: filter.orgId,
    //       topicId: filter.topicId,
    //       input: { endDate: oldStartDate, startDate: oldStartDate, tag: filter.tag },
    //     })
    //     : of([]),
    //   sentiments: this.sentimentReportService.statisticalSentimentByTime({
    //     orgId: filter.orgId,
    //     topicId: filter.topicId,
    //     input: {
    //       startDate: filter.startDate,
    //       endDate: filter.endDate,
    //       tag: filter.tag,
    //     },
    //   }),
    //   sentimentTags: this.sentimentReportService.aggSentimentTagByTime({
    //     orgId: filter.orgId,
    //     topicId: filter.topicId,
    //     input: { startDate: filter.startDate, endDate: filter.endDate, tag: filter.tag },
    //   }),
    //   socialTops: this.rankingReportService.getTopProfileInteract({
    //     orgId: filter.orgId,
    //     topicId: filter.topicId,
    //     input: { profileType: 'SOCIAL', startDate: filter.startDate!, endDate: filter.endDate!, top: 10, tag: filter.tag },
    //   }),
    //   websiteTops: this.rankingReportService.getTopProfileInteract({
    //     orgId: filter.orgId,
    //     topicId: filter.topicId,
    //     input: { profileType: 'NEWS', startDate: filter.startDate!, endDate: filter.endDate!, top: 10, tag: filter.tag },
    //   }),
    // }).subscribe({
    //   next: (res) => {
    //     this._convertSourceAggsToDiscussRateData(res.discussRate);
    //     // sourceDiscuss.handlingData(res.discussTrend, res.discussTrendOld);
    //     this._convertSourceAggsToDiscussTrendData(sourceDiscuss);
    //     this._convertSentiment(res.sentiments, _isOneDay, filter.startDate!);
    //     this._convertTagsToSentiment(res.sentimentTags);
    //     this._topProfileSocical.next(res.socialTops);
    //     this._topProfileWebsite.next(res.websiteTops);
    //     this.spinnerService.hidenAll();
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.spinnerService.hidenAll();
    //   },
    // });
  }

  // private _convertSourceAggsToDiscussRateData(SourceAggregateInfo: any, dataName?: string) {
  //   const _sourceData = {
  //     facebook: SourceAggregateInfo.facebook,
  //     tiktok: SourceAggregateInfo.tiktok,
  //     youtube: SourceAggregateInfo.youtube,
  //     news:
  //       SourceAggregateInfo.official +
  //       SourceAggregateInfo.localNews +
  //       SourceAggregateInfo.journal +
  //       SourceAggregateInfo.synthesis +
  //       SourceAggregateInfo.blog +
  //       SourceAggregateInfo.otherWeb,
  //     forum: SourceAggregateInfo.forum,
  //     linkedin: SourceAggregateInfo.linkedin,
  //   };
  //   const _discussRateData: SeriesOptionsType[] = [
  //     {
  //       type: 'pie',
  //       name: dataName,
  //       data: [
  //         {
  //           name: ESourceName.FACEBOOK,
  //           y: _sourceData.facebook,
  //           color: ESourceColor.FACEBOOK,
  //         },
  //         {
  //           name: ESourceName.TIKTOK,
  //           y: _sourceData.tiktok,
  //           color: ESourceColor.TIKTOK,
  //         },
  //         {
  //           name: ESourceName.YOUTUBE,
  //           y: _sourceData.youtube,
  //           color: ESourceColor.YOUTUBE,
  //         },
  //         {
  //           name: ESourceName.NEWS,
  //           y: _sourceData.news,
  //           color: ESourceColor.NEWS,
  //         },
  //         {
  //           name: ESourceName.FORUM,
  //           y: _sourceData.forum,
  //           color: ESourceColor.FORUM,
  //         },
  //         {
  //           name: ESourceName.LINKEDIN,
  //           y: _sourceData.linkedin,
  //           color: ESourceColor.LINKEDIN,
  //         },
  //       ],
  //     },
  //   ];
  //   this._discussRate.next(_discussRateData);
  // }

  // private _convertSourceAggsToDiscussTrendData(sourceDiscussModel: SourceDiscussModel) {
  //   // chart settings
  //   const _datePipe = new DatePipe('en-US');
  //   const _isOneDay = sourceDiscussModel.startDate === sourceDiscussModel.endDate;
  //   const _color = {
  //     current: '#845ADF',
  //     old: '#A3A3A3',
  //   };
  //   const _fillColor = {
  //     currentStartGradient: '#845ADF80',
  //     currentEndGradient: '#FFFFFF40',
  //     oldStartGradient: '#A3A3A380',
  //     oldEndGradient: '#FFFFFF40',
  //   };
  //   const _serieName = {
  //     currentStartDate: _datePipe.transform(sourceDiscussModel.startDate * 1000, 'dd/MM/yyyy')!,
  //     currentEndDate: _datePipe.transform(sourceDiscussModel.endDate * 1000, 'dd/MM/yyyy')!,
  //     oldStartDate: _datePipe.transform(sourceDiscussModel.oldStartDate * 1000, 'dd/MM/yyyy')!,
  //     oldEndDate: _datePipe.transform(sourceDiscussModel.oldEndDate * 1000, 'dd/MM/yyyy')!,
  //   };
  //   const _linearGradient = { x1: 0, y1: 0, x2: 0, y2: 1 };
  //   const _marker = { enabled: false };

  //   // data
  //   const _currentData = this._convertToPointsData(sourceDiscussModel.data);
  //   const _oldData = this._convertToPointsData(sourceDiscussModel.dataOld);
  //   const _discussTrendData: SeriesOptionsType[] = [
  //     {
  //       type: 'areaspline',
  //       name: _serieName.oldStartDate + (_isOneDay ? '' : ` - ${_serieName.oldEndDate}`),
  //       data: _oldData.data,
  //       color: _color.old,
  //       fillOpacity: 0.5,
  //       fillColor: {
  //         linearGradient: _linearGradient,
  //         stops: [
  //           [0, _fillColor.oldStartGradient],
  //           [1, _fillColor.oldEndGradient],
  //         ],
  //       },
  //       marker: _marker,
  //     },
  //     {
  //       type: 'areaspline',
  //       name: _serieName.currentStartDate + (_isOneDay ? '' : ` - ${_serieName.currentEndDate}`),
  //       data: _currentData.data,
  //       color: _color.current,
  //       fillOpacity: 0.5,
  //       fillColor: {
  //         linearGradient: _linearGradient,
  //         stops: [
  //           [0, _fillColor.currentStartGradient],
  //           [1, _fillColor.oldStartGradient],
  //         ],
  //       },
  //       marker: _marker,
  //     },
  //   ];
  //   this._discussTrend.next({
  //     data: _discussTrendData,
  //     total: _currentData.total,
  //     growthRate: (+((_currentData.total / _oldData.total) * 100) !== Infinity ? +((_currentData.total / _oldData.total) * 100) : 100) || 0,
  //     timeLineLabel: sourceDiscussModel.timeLineLabel,
  //   });
  // }

  // private _convertToPointsData(sourceAggregateInfo: any[]): { data: SeriesAreasplineOptions['data']; total: number } {
  //   let total: number = 0;
  //   let data: SeriesAreasplineOptions['data'] = [];
  //   sourceAggregateInfo.forEach((item) => {
  //     const _total =
  //       item.facebook + item.tiktok + item.youtube + item.official + item.forum + item.blog + item.journal + item.localNews + item.otherWeb + item.synthesis + item.linkedin;
  //     total += _total;
  //     data!.push({ name: item.reportTime, y: _total });
  //   });
  //   return { data, total };
  // }

  private _convertSub(tagsub: SentimentByTagInfo): SentimentByTagModel {
    const _total =
      (tagsub.positiveOther ?? 0) +
      (tagsub.positiveSocial ?? 0) +
      ((tagsub.negativeOther ?? 0) + (tagsub.negativeSocial ?? 0)) +
      ((tagsub.neutralOther ?? 0) + (tagsub.neutralSocial ?? 0));
    const _value = [
      {
        color: '#26BF94',
        ratio: (((tagsub.positiveOther ?? 0) + (tagsub.positiveSocial ?? 0)) / Math.max(1, _total)) * 100,
        label: 'Tích cực',
        totalItem: (tagsub.positiveOther ?? 0) + (tagsub.positiveSocial ?? 0),
      },
      {
        color: '#FF5A5A',
        ratio: (((tagsub.negativeOther ?? 0) + (tagsub.negativeSocial ?? 0)) / Math.max(1, _total)) * 100,
        label: 'Tiêu cực',
        totalItem: (tagsub.negativeOther ?? 0) + (tagsub.negativeSocial ?? 0),
      },
      {
        color: '#DADAE1',
        ratio: (((tagsub.neutralOther ?? 0) + (tagsub.neutralSocial ?? 0)) / Math.max(1, _total)) * 100,
        label: 'Trung tính',
        totalItem: (tagsub.neutralOther ?? 0) + (tagsub.neutralSocial ?? 0),
      },
    ];
    return {
      total: _total,
      collapse: false,
      value: _value,
    };
  }

  private _quickSort(arr: SentimentByTagModel[]): SentimentByTagModel[] {
    if (arr.length <= 1) {
      return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex].total;
    const less = arr.filter((item) => (item.total || 0) > pivot!);
    const equal = arr.filter((item) => (item.total || 0) === pivot!);
    const greater = arr.filter((item) => (item.total || 0) < pivot!);
    return [...this._quickSort(less), ...equal, ...this._quickSort(greater)];
  }

  private _convertParentToSub(tag: SentimentByTagModel, tagsub: SentimentByTagModel): SentimentByTagModel {
    const _total = tag.total! + (tagsub.total! ?? 0);
    const _positive = Number(tag.value![0].totalItem!) + Number(tagsub?.value![0].totalItem!);
    const _negative = Number(tag.value![1].totalItem!) + Number(tagsub?.value![1].totalItem!);
    const _neutra = Number(tag.value![2].totalItem!) + Number(tagsub?.value![2].totalItem!);
    return {
      ...tag,
      total: _total,
      value: [
        { ...tag.value![0], totalItem: _positive, ratio: (_positive / Math.max(_total, 1)) * 100 },

        { ...tag.value![1], totalItem: _negative, ratio: (_negative / Math.max(_total, 1)) * 100 },

        { ...tag.value![2], totalItem: _neutra, ratio: (_neutra / Math.max(_total, 1)) * 100 },
      ],
    };
  }

  private _convertTagsToSentiment(tags: SentimentByTagInfo[]) {
    const result = tags.reduce((data: SentimentByTagModel[], item: any, idx: number) => {
      let tagsub = this._convertSub(item);
      const index = data.findIndex((el) => el.tag === item.tag1);
      if (index > -1) {
        data[index] = this._convertParentToSub(data[index], tagsub);
        const index2 = data[index]!.items?.findIndex((el: any) => el.tag === item.tag2) ?? -1;
        if (index2 > -1) {
          data[index]!.items![index2] = this._convertParentToSub(data[index]!.items![index2], tagsub);
          if (item?.tag3 !== 'null' && item?.tag3 !== null) {
            data[index]!.items![index2]!.items?.push({ tag: item.tag3, ...tagsub });
          }
        } else {
          let tag2 = { tag: item.tag2, ...tagsub, items: [{ tag: item.tag3, ...tagsub }] };
          if (item.tag2 !== 'null' && item.tag2 !== null) {
            if (item.tag3 !== 'null' && item.tag3 !== null) {
              data[index].items?.push(tag2);
            } else {
              tag2 = { tag: item.tag2, ...tagsub, items: [] };
              data[index].items?.push(tag2);
            }
          }
        }
      } else {
        if (item?.tag2 !== 'null' && item?.tag2 !== null) {
          if (item?.tag3 !== 'null' && item?.tag3 !== null) {
            data.push({ tag: item.tag1, ...tagsub, items: [{ tag: item.tag2, ...tagsub, items: [{ tag: item.tag3, ...tagsub }] }] });
          } else {
            data.push({ tag: item.tag1, ...tagsub, items: [{ tag: item.tag2, ...tagsub, items: [] }] });
          }
        } else {
          data.push({ tag: item.tag1, ...tagsub, items: [] });
        }
      }
      return data;
    }, []);
    const _total = result.reduce((l, r) => Math.max(l, r.total ?? 0), 0);
    const dataRe = this._quickSort(result);
    dataRe.forEach((tag1) => {
      if (tag1?.items!.length) {
        tag1.items = this._quickSort(tag1.items);
        tag1.items.forEach((tag2) => {
          if (tag2?.items!.length) {
            tag2.items = this._quickSort(tag2.items);
          }
        });
      }
    });
    this._tagsSentiment.next({ data: dataRe, totalMax: _total });
  }

  private _convertSentiment(data: SentimentInfo[], isOneDay: boolean, startDate: number) {
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    const _dataPositive: PointOptionsObject[] = [];
    const _dataNegative: PointOptionsObject[] = [];
    const _dataNeutral: PointOptionsObject[] = [];
    const datePipe = new DatePipe('en-US');
    const _marker = { enabled: false };
    if (!isOneDay) {
      data.forEach((el) => {
        positive += el.positiveOther! + el.positiveSocial!;
        negative += el.negativeOther! + el.negativeSocial!;
        neutral += el.neutralOther! + el.neutralSocial!;
        _dataPositive.push({
          label: datePipe.transform(el.reportTime, 'yyyy-MM-dd')!,
          name: datePipe.transform(el.reportTime, 'dd/MM')!,
          y: el.positiveOther! + el.positiveSocial!,
        });
        _dataNegative.push({
          label: datePipe.transform(el.reportTime, 'yyyy-MM-dd')!,
          name: datePipe.transform(el.reportTime, 'dd/MM')!,
          y: el.negativeOther! + el.negativeSocial!,
        });
        _dataNeutral.push({ label: datePipe.transform(el.reportTime, 'yyyy-MM-dd')!, name: datePipe.transform(el.reportTime, 'dd/MM')!, y: el.neutralOther! + el.neutralSocial! });
      });
    } else {
      data.forEach((el) => {
        positive += el.positiveOther! + el.positiveSocial!;
        negative += el.negativeOther! + el.negativeSocial!;
        neutral += el.neutralOther! + el.neutralSocial!;
        _dataPositive.push({ label: datePipe.transform(startDate * 1000, 'yyyy-MM-dd')!, name: el.reportTime, y: el.positiveOther! + el.positiveSocial! });
        _dataNegative.push({ label: datePipe.transform(startDate * 1000, 'yyyy-MM-dd')!, name: el.reportTime, y: el.negativeOther! + el.negativeSocial! });
        _dataNeutral.push({ label: datePipe.transform(startDate * 1000, 'yyyy-MM-dd')!, name: el.reportTime, y: el.neutralOther! + el.neutralSocial! });
      });
    }

    this._sentiment.next({
      positive,
      negative,
      neutral,
      series: [
        {
          name: 'Tích cực',
          type: 'areaspline',
          color: '#26BF94',
          data: _dataPositive,
          fillOpacity: 0,
          marker: _marker,
        },
        {
          name: 'Tiêu cực',
          type: 'areaspline',
          color: '#FF6F5B',
          data: _dataNegative,
          fillOpacity: 0,
          marker: _marker,
        },
        {
          name: 'Trung tính',
          type: 'areaspline',
          color: '#827696',
          data: _dataNeutral,
          fillOpacity: 0,
          marker: _marker,
        },
      ],
    });
  }
}
