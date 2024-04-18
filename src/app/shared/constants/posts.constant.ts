import { LabelValueStr } from '@shared/models/label-value.model';

export enum EPostSort {
  NEW = 'NEW',
  INT = 'INT',
  OLD = 'OLD',
  SBC = 'SBC', //sort by character
}

export enum EDocType {
  POST = 'Post',
  COMMENT = 'Comment',
}

export const POST_SORT_OPT: LabelValueStr[] = [
  { label: 'Tin mới lên đầu', value: EPostSort.NEW },
  { label: 'Tin cũ lên đầu', value: EPostSort.OLD },
  { label: 'Tin hot', value: EPostSort.INT },
  { label: 'Nội dung từ A-Z', value: EPostSort.SBC },
];

export const DOCTYPE_OPT: LabelValueStr[] = [
  { label: 'Bài viết', value: EDocType.POST },
  { label: 'Bình luận', value: EDocType.COMMENT },
];
