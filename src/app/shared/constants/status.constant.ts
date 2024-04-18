import { LabelValue } from '../models/label-value.model';

//trạng thái
export const STATUS = {
  active: { label: 'Hoạt động', value: 1 },
  deactive: { label: 'Ngừng hoạt động', value: 0 }
};

export const STATUS_OPT: LabelValue[] = [
  { label: STATUS.active.label, value: STATUS.active.value },
  { label: STATUS.deactive.label, value: STATUS.deactive.value },
];


export const CATEGORY_OPT = [{
  label: '', value: 0
}]

export const STATUS_OBJ = {
  1: 'Hoạt động',
  0: 'Ngừng hoạt động'
};