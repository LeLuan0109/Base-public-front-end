import { FilterMatchMode } from 'primeng/api';
import { LabelValueStr } from './../models/label-value.model';

export const MATCH_MODE_OPTIONS = {
  startWith: 'sw',
  endWith: 'ew',
  contains: 'ct',
  equals: 'eq',
  notEquals: 'ne',
};

export const MATCH_MODE_OPTIONS_STRING = [
  { label: 'Bắt đầu với', value: MATCH_MODE_OPTIONS.startWith },
  { label: 'Chứa', value: MATCH_MODE_OPTIONS.contains },
  { label: 'Kết thúc với', value: MATCH_MODE_OPTIONS.endWith },
  { label: 'Không chứa', value: MATCH_MODE_OPTIONS.notEquals },
  { label: 'Là', value: MATCH_MODE_OPTIONS.equals },
];

export const MATCH_MODE_OPTIONS_NUMBER = [
  { label: 'Lớn hơn', value: '=lt=' },
  { label: 'Lớn hơn hoặc bằng', value: '=le=' },
  { label: 'Bằng', value: '==' },
  { label: 'Nhỏ hơn hoặc bằng', value: '=ge=' },
  { label: 'Nhỏ hơn', value: '=gt=' },
  { label: 'Khác', value: '!=' },
];

export const MATCH_MODE_OPTIONS_DATE = [
  { label: 'Cùng ngày', value: '==' },
  { label: 'Khác ngày', value: '!=' },
  { label: 'Trước ngày', value: '=ge=' },
  { label: 'Sau ngày', value: '=le=' },
];

export const FILTER_TYPE = {
  textBox: 'text',
  dropdown: 'status',
  checkBox: 'boolean',
  date: 'date',
  numeric: 'numeric',
  multiSelect: 'multiSelect',
};

// option date
export const MATCH_MODE_DATE_OPTIONS = {
  dateIs: FilterMatchMode.IS,
  dateIsNot: FilterMatchMode.IS_NOT,
  dateBefore: FilterMatchMode.BEFORE,
  dateAfter: FilterMatchMode.AFTER,
};

export const MATCH_MODE_OPTIONS_DATE_STRING: LabelValueStr[] = [
  { label: 'Cùng ngày', value: MATCH_MODE_DATE_OPTIONS.dateIs },
  { label: 'Khác ngày', value: MATCH_MODE_DATE_OPTIONS.dateIsNot },
  { label: 'Trước ngày', value: MATCH_MODE_DATE_OPTIONS.dateBefore },
  { label: 'Sau ngày', value: MATCH_MODE_DATE_OPTIONS.dateAfter },
];

// option numberic
export const MATCH_MODE_NUMBERIC_OPTIONS = {
  equals: FilterMatchMode.EQUALS,
  notEquals: FilterMatchMode.NOT_EQUALS,
  lessThan: FilterMatchMode.LESS_THAN,
  lessThanOrEqualTo: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
  greaterThan: FilterMatchMode.GREATER_THAN,
  greaterThanOrEqualTo: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
};

export const MATCH_MODE_NUMBERIC_OPTIONS_STRING: LabelValueStr[] = [
  { label: 'Bằng', value: MATCH_MODE_NUMBERIC_OPTIONS.equals },
  { label: 'Không bằng', value: MATCH_MODE_NUMBERIC_OPTIONS.notEquals },
  { label: 'Nhỏ hơn', value: MATCH_MODE_NUMBERIC_OPTIONS.lessThan },
  {
    label: 'Nhỏ hơn hoặc bằng',
    value: MATCH_MODE_NUMBERIC_OPTIONS.lessThanOrEqualTo,
  },
  { label: 'Lớn hơn', value: MATCH_MODE_NUMBERIC_OPTIONS.greaterThan },
  {
    label: 'Lớn hơn hoặc bằng',
    value: MATCH_MODE_NUMBERIC_OPTIONS.greaterThanOrEqualTo,
  },
];


export const TABLE_FILTER_MODE = {
  startsWith: 'Bắt đầu bởi',
  contains: 'Chứa từ khóa',
  notContains: 'Không chứa từ khóa',
  endsWith: 'Kết thúc bởi',
  equals: 'Bằng',
  notEquals: 'Không bằng',
  noFilter: 'Bỏ lọc',
  lt: 'Nhỏ hơn',
}
