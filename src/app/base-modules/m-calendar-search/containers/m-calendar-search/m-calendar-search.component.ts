import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TIMELINE_CONSTANT, TIMELINE_OPT } from '@shared/constants/date.constant';

@Component({
  selector: 'm-calendarSearch',
  templateUrl: './m-calendar-search.component.html',
  styleUrls: ['./m-calendar-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MCalendarSearchComponent),
      multi: true,
    },
  ],
})
export class MCalendarSearchComponent implements OnInit, ControlValueAccessor {
  options: any = TIMELINE_OPT;
  @Input('label') label = 'Thời gian';
  @Input('formatDate') formatDate = 'dd/MM/yyyy';
  @Input('monthInterval') monthInterval = 12;
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  private onChange?: (val: any) => void;
  private onTouch?: () => void;

  maxDate = new Date();
  minDate = new Date();
  detaulDate = new Date();
  rangeDates: Date[] = [];
  startDate: number = 0;
  endDate: number = 0;
  timeline?: number;
  oldTimeLine?: number;
  oldStartDate?: number;

  constructor() {}

  get timelineLabel(): string {
    if (this.timeline || this.timeline === 0) {
      const index = TIMELINE_OPT.findIndex((r) => r.value === this.timeline);
      if (index > -1) {
        return TIMELINE_OPT[index].label!;
      }
    }
    const datePipe = new DatePipe('en-US');
    const startDate = this.startDate!;
    const endDate = this.endDate!;
    if (Math.floor((endDate - startDate) / 60 / 60 / 24) > 0) {
      return `${datePipe.transform(startDate * 1000, this.formatDate)} - ${datePipe.transform(endDate * 1000, this.formatDate)}`;
    }
    return `${datePipe.transform(startDate * 1000, this.formatDate)}`;
  }

  ngOnInit(): void {
    this.minDate.setMonth(this.minDate.getMonth() - this.monthInterval);
    this.detaulDate.setDate(this.detaulDate.getDate() - TIMELINE_CONSTANT.week.value + 1);
  }

  writeValue(obj: Date[]): void {
    if (obj) {
      if (obj.length > 1) {
        this.rangeDates = [obj[0], obj[1]];
      } else if (obj.length === 1) {
        this.rangeDates = [obj[0], new Date()];
      } else {
        this.rangeDates = [this.detaulDate, new Date()];
      }
    } else {
      this.rangeDates = [this.detaulDate, new Date()];
    }
    this.startDate = Math.floor(this.rangeDates[0].getTime() / 1000);
    this.endDate = Math.floor(this.rangeDates[1].getTime() / 1000);
    this._setTimeLine();
    this.oldTimeLine = this.timeline;
    this.oldStartDate = this.startDate;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onFocus() {
    if (this.onTouch) {
      this.onTouch();
    }
  }

  onHisde() {
    if (this.oldTimeLine !== this.timeline || this.startDate != this.oldStartDate) {
      this._change();
    }
  }

  search(opDate: any) {
    opDate.hide();
    this._change();
  }

  changeTimeline() {
    const now = new Date();
    const from = new Date();
    switch (this.timeline) {
      case TIMELINE_CONSTANT.today.value:
        this.rangeDates = [now, now];
        break;
      case TIMELINE_CONSTANT.yesterday.value:
        now.setDate(now.getDate() - TIMELINE_CONSTANT.yesterday.value);
        this.rangeDates = [now, now];
        break;
      default:
        from.setDate(from.getDate() - this.timeline! + 1);
        this.rangeDates = [from, now];
        break;
    }
  }

  selectDate() {
    if (!this.rangeDates || this.rangeDates.length < 1) {
      this.timeline = -1;
    } else if (this.rangeDates.length === 1 || !this.rangeDates[1]) {
      this.startDate = Math.floor(this.rangeDates[0].getTime() / 1000);
      this.endDate = this.startDate;
      this._setTimeLine();
    } else {
      this.startDate = Math.floor(this.rangeDates[0].getTime() / 1000);
      this.endDate = Math.floor(this.rangeDates[1].getTime() / 1000);
      this._setTimeLine();
    }
    console.log(this.oldTimeLine, this.timeline, this.rangeDates);
  }

  private _change() {
    this.oldTimeLine = this.timeline;
    this.oldStartDate = this.startDate;
    if (this.onChange) {
      this.onChange(this.rangeDates);
    }
    this.onSearch.emit({ startDate: this.startDate, endDate: this.endDate, timeLine: this.timeline });
  }

  private _setTimeLine() {
    const startDate = this.startDate!;
    const endDate = this.endDate!;
    this.timeline = Math.floor((endDate - startDate) / 60 / 60 / 24);
    const diffNowEnd = Math.floor((Date.now() / 1000 - endDate) / 60 / 60 / 24);
    if (diffNowEnd > 0) {
      if (this.timeline === 0 && diffNowEnd === 1) {
        this.timeline = 1;
      } else {
        this.timeline = -1;
      }
    } else {
      if (this.timeline !== 0) {
        this.timeline += 1;
      }
    }
  }
}
