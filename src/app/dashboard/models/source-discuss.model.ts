import { DatePipe } from '@angular/common';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { getTimeLineValue } from '@shared/utils/date.util';
// import { any } from 'src/app/reports/models/metion-report.model';

export interface IDiscussSourceAggregate {
  facebook: number;
  tiktok: number;
  youtube: number;
  news: number;
  forum: number;
  linkedin: number;
}

export class SourceDiscussModel {
  data: any[] = [];
  dataOld: any[] = [];
  startDate = 0;
  endDate = 0;
  oldStartDate = 0;
  oldEndDate = 0;
  timeLineLabel = '';

  private _datePipe = new DatePipe('en-US');

  handingFilter(filter: MReportFilterModel) {
    const { oldStartDate, oldEndDate, timeLineLabel } = getTimeLineValue(filter.startDate! * 1000, filter.endDate! * 1000);
    this.startDate = filter.startDate!;
    this.endDate = filter.endDate!;
    this.oldStartDate = oldStartDate;
    this.oldEndDate = oldEndDate;
    this.timeLineLabel = timeLineLabel;
  }

  handlingData(data: any[], dataOld?: any[]) {
    const _isOneDay =
      new Date(this.startDate * 1000).getDate() === new Date(this.endDate * 1000).getDate() &&
      new Date(this.startDate * 1000).getMonth() === new Date(this.endDate * 1000).getMonth();
    if (!_isOneDay) {
      data.forEach((item) => {
        const _reportDate = new Date(item.reportTime).getTime();
        const _reportTime = this._datePipe.transform(_reportDate, 'dd/MM/yyyy');
        if (_reportDate <= this.oldEndDate * 1000) {
          this.dataOld.push({ ...item, reportTime: _reportTime! });
        } else {
          this.data.push({ ...item, reportTime: _reportTime! });
        }
      });
    } else {
      this.data = data.map((item) => ({ ...item, reportTime: this._getFullReportTime(this.startDate, item.reportTime) }));
      this.dataOld = dataOld!.map((item) => ({ ...item, reportTime: this._getFullReportTime(this.oldStartDate, item.reportTime) }));
    }
  }

  private _getFullReportTime(reportDate: number, reportHour: string) {
    const _reportDate = this._datePipe.transform(reportDate * 1000, 'dd/MM/yyyy');
    return reportHour + ' ' + _reportDate;
  }
}
