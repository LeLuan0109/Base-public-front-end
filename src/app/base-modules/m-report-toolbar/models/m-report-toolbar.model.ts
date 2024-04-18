export interface MReportFilterModel {
  orgId?: number;
  topicId?: number;
  startDate?: number;
  endDate?: number;
  topicName?: string;
  tag?: string;
}

export const TIME_LINE_OPT = [
  {
    name: 'Tùy chọn',
    code: 0,
  },
  {
    name: 'Hôm nay',
    code: 1,
  },
  {
    name: 'Hôm qua',
    code: 2,
  },
  {
    name: '7 ngày gần đây',
    code: 3,
  },
  {
    name: '15 ngày gần đây',
    code: 4,
  },
  {
    name: '30 ngày gần đây',
    code: 5,
  },
  {
    name: 'Trong tháng này',
    code: 6,
  },
];
