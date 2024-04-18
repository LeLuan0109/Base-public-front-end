import { LabelValue } from "../models/label-value.model";

// Giớ tính
export const GENDER = {
  male: { label: 'Nam', value: 1 },
  female: { label: 'Nữ', value: 2 },
};

export const GENDER_OPT: LabelValue[] = [
  GENDER.male,
  GENDER.female,
];

export const GenderLabel: { [key: string]: string } = {
  MALE: 'Nam',
  FEMALE: 'Nữ'
}