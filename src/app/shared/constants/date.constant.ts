import { LabelValue } from '../models/label-value.model';

export const START_DATE = 2022;

export const DATE_CONSTANT = {
  day: { label: 'Hôm nay', value: 1 },
  week: { label: '7 Ngày gần đây', value: 7 },
  month: { label: '30 Ngày gần đây', value: 30 },
  year: { label: 'Tháng', value: 365 },
};

export const TIMELINE_CONSTANT = {
  today: { label: 'Hôm nay', value: 0 },
  yesterday: { label: 'Hôm qua', value: 1 },
  week: { label: '7 Ngày gần đây', value: 7 },
  month: { label: '30 Ngày gần đây', value: 30 },
  threeMonth: { label: '3 Tháng gần đây', value: 90 },
  // oneYear: { label: '1 Năm gần đây', value: 365 },
};

export const DATE_OPT: LabelValue[] = [
  { label: DATE_CONSTANT.day.label, value: DATE_CONSTANT.day.value },
  { label: DATE_CONSTANT.week.label, value: DATE_CONSTANT.week.value },
  { label: DATE_CONSTANT.month.label, value: DATE_CONSTANT.month.value },
];

export const DATE_LINE_OPT: LabelValue[] = [
  { label: DATE_CONSTANT.week.label, value: DATE_CONSTANT.week.value },
  { label: DATE_CONSTANT.month.label, value: DATE_CONSTANT.month.value },
  { label: DATE_CONSTANT.year.label, value: DATE_CONSTANT.year.value },
];

export const TIMELINE_OPT: LabelValue[] = [
  { label: TIMELINE_CONSTANT.today.label, value: TIMELINE_CONSTANT.today.value },
  { label: TIMELINE_CONSTANT.yesterday.label, value: TIMELINE_CONSTANT.yesterday.value },
  { label: TIMELINE_CONSTANT.week.label, value: TIMELINE_CONSTANT.week.value },
  { label: TIMELINE_CONSTANT.month.label, value: TIMELINE_CONSTANT.month.value },
  { label: TIMELINE_CONSTANT.threeMonth.label, value: TIMELINE_CONSTANT.threeMonth.value },
  // { label: TIMELINE_CONSTANT.oneYear.label, value: TIMELINE_CONSTANT.oneYear.value },
];

export const DATE_TYPE = {
  year: { label: 'Theo năm', value: 1 },
  precious: { label: 'Theo quý', value: 2 },
  month: { label: 'Theo tháng', value: 3 },
  day: { label: 'Theo ngày', value: 4 },
};

export const DATE_TYPE_OPT: LabelValue[] = [DATE_TYPE.year, DATE_TYPE.precious, DATE_TYPE.month, DATE_TYPE.day];

export const DATE_PRECIOUS = {
  _1: { label: 'Quý I', value: 1 },
  _2: { label: 'Quý II', value: 2 },
  _3: { label: 'Quý III', value: 3 },
  _4: { label: 'Quý IV', value: 4 },
};

export const DATE_PRECIOUS_OPT: LabelValue[] = [DATE_PRECIOUS._1, DATE_PRECIOUS._2, DATE_PRECIOUS._3, DATE_PRECIOUS._4];

export const DATE_MONTH = {
  _1: { label: 'Tháng 1', value: 1 },
  _2: { label: 'Tháng 2', value: 2 },
  _3: { label: 'Tháng 3', value: 3 },
  _4: { label: 'Tháng 4', value: 4 },
  _5: { label: 'Tháng 5', value: 5 },
  _6: { label: 'Tháng 6', value: 6 },
  _7: { label: 'Tháng 7', value: 7 },
  _8: { label: 'Tháng 8', value: 8 },
  _9: { label: 'Tháng 9', value: 9 },
  _10: { label: 'Tháng 10', value: 10 },
  _11: { label: 'Tháng 11', value: 11 },
  _12: { label: 'Tháng 12', value: 12 },
};

export const DATE_MONTH_OPT: LabelValue[] = [
  DATE_MONTH._1,
  DATE_MONTH._2,
  DATE_MONTH._3,
  DATE_MONTH._4,
  DATE_MONTH._5,
  DATE_MONTH._6,
  DATE_MONTH._7,
  DATE_MONTH._8,
  DATE_MONTH._9,
  DATE_MONTH._10,
  DATE_MONTH._11,
  DATE_MONTH._12,
];

export const CALENDER_CONFIG_VI = {
  firstDayOfWeek: 0,
  dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
  dayNamesShort: ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'],
  dayNamesMin: ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'],
  monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  monthNamesShort: ['THG 1', 'THG 2', 'THG 3', 'THG 4', 'THG 5', 'THG 6', 'THG 7', 'THG 8', 'THG 9', 'THG 10', 'THG 11', 'THG 12'],
  today: 'Hôm nay',
  clear: 'Xóa',
  weekHeader: 'Tuần',
};
