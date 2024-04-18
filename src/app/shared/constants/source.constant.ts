import { LabelValueStr } from '../models/label-value.model';

export enum EPostSource {
  FACEBOOK = 'facebook',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  WEBSITE = 'website',
  LINKEDIN = 'linkedin',
}

export enum ESourceName {
  FACEBOOK = 'Facebook',
  YOUTUBE = 'Youtube',
  TIKTOK = 'Tiktok',
  NEWS = 'News',
  FORUM = 'Forum',
  LINKEDIN = 'Linkedin',
}

export enum ESourceColor {
  FACEBOOK = '#317FFF',
  YOUTUBE = '#FF5A5A',
  TIKTOK = '#30224D',
  NEWS = '#26BF94',
  FORUM = '#FABB48',
  LINKEDIN = '#0077B5',
}

export enum ESourceUrl {
  FACEBOOK = 'https://www.facebook.com/',
  YOUTUBE = 'https://www.youtube.com/',
  TIKTOK = 'https://www.tiktok.com/',
}

export enum EWebSourceType {
  OFFICIAL = 'OFFICIAL',
  LOCAL = 'LOCAL',
  JOURNAL = 'JOURNAL',
  SYNTHESIS = 'SYNTHESIS',
  FORUM = 'FORUM',
  BLOG = 'BLOG',
  OTHER = 'OTHER',
}

export const SOURCE_TYPE_LABEL: { [key: string]: string } = {
  USER: 'Người dùng',
  GROUP: 'Nhóm',
  PAGE: 'Trang',
  OFFICIAL: 'Báo chính thống',
  LOCAL: 'Báo địa phương',
  JOURNAL: 'Tạp chí',
  SYNTHESIS: 'Tổng hợp',
  OTHER: 'Website khác',
  FORUM: 'Diễn đàn',
  BLOG: 'BLOG',
};

export const SOURCE_CONSTANT = {
  facebook: { label: 'Facebook', value: EPostSource.FACEBOOK },
  tiktok: { label: 'Tiktok', value: EPostSource.TIKTOK },
  youtube: { label: 'Youtube', value: EPostSource.YOUTUBE },
  website: { label: 'Website', value: EPostSource.WEBSITE },
  linkedin: { label: 'Linkedin', value: EPostSource.LINKEDIN },
};

export const SOURCE_OPT: LabelValueStr[] = [SOURCE_CONSTANT.facebook, SOURCE_CONSTANT.tiktok, SOURCE_CONSTANT.youtube, SOURCE_CONSTANT.website, SOURCE_CONSTANT.linkedin];
