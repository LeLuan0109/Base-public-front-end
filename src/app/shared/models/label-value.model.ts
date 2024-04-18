export interface LabelValue {
  label?: string;
  value?: number;
  items?: LabelValue[];
}

export interface LabelValueStr {
  label?: string;
  value?: string;
  items?: LabelValueStr[];
}


export interface LabelValueObj {
  label?: string;
  value?: any;
  isNumber?: boolean;
  items?: LabelValueStr[];
}
