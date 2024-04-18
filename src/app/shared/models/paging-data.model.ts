export interface PagingData<T> {
  data?: T[];
  totalCount?: number;
  pageInfo?: PageInfo;
}

export interface PageInfo {
  pageIndex?: number;
  pageSize?: number;
  startCursor?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}