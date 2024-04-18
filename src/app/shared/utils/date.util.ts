import { DatePipe } from '@angular/common';
import { DATE_MONTH, DATE_PRECIOUS } from './../constants/date.constant';

const _datePipe = new DatePipe('en-US');

export const getCurrentPrecious = () => {
  const now = new Date();
  if (now.getMonth() < DATE_MONTH._4.value) {
    return DATE_PRECIOUS._1.value;
  }
  if (now.getMonth() < DATE_MONTH._7.value) {
    return DATE_PRECIOUS._2.value;
  }
  if (now.getMonth() < DATE_MONTH._10.value) {
    return DATE_PRECIOUS._3.value;
  }
  return DATE_PRECIOUS._4.value;
};

export const getFirstMonthOfPrecious = (precious: number) => {
  switch (precious) {
    case DATE_PRECIOUS._1.value:
      return 0;
    case DATE_PRECIOUS._2.value:
      return 3;
    case DATE_PRECIOUS._3.value:
      return 6;
    default:
      return 11;
  }
};

export const getTimeLineValue = (startDate: number, endDate?: number) => {
  if (!endDate) endDate = new Date().getTime();
  const timeLine = Math.floor((endDate - startDate) / (24 * 3600 * 1000));

  const _oldStartDate = new Date(startDate);
  const _oldEndDate = new Date(startDate);
  _oldEndDate.setDate(_oldEndDate.getDate() - 1);
  _oldStartDate.setDate(_oldStartDate.getDate() - timeLine - 1);

  const oldStartDate = Math.trunc(_oldStartDate.getTime() / 1000);
  const oldEndDate = Math.trunc(_oldEndDate.getTime() / 1000);
  const timeLineLabel = Math.floor((startDate - oldStartDate * 1000) / (24 * 3600 * 1000)) + ' ngày trước';

  return { oldStartDate, oldEndDate, timeLineLabel };
};

export const formatDMY = (date: string, format = 'yyyy/MM/dd HH:mm'): string => {
  // date: dd/MM/yyyy | HH:mm dd/MM/yyyy
  let _date: string, _hour: string;
  if (date?.indexOf(':') !== -1) {
    [_hour, _date] = date?.trim().split(/\s+/g);
  } else {
    [_hour, _date] = ['00:00', date?.trim()];
  }

  const _dateFormat = _date?.split('/').reverse().join('/');
  return _datePipe.transform(new Date(`${_dateFormat} ${_hour}`), format)!;
};

export const formatDateToYMD = (date: Date): string => {
  // date: Data | yyyy-MM-dd
  const _year = date.getFullYear();
  let _month: string | number = date.getMonth() + 1;
  let _day: string | number = date.getDate();

  if (_month < 10) {
    _month = '0' + _month;
  }
  if (_day < 10) {
    _day = '0' + _day;
  }

  return `${_year}-${_month}-${_day}`;
};
