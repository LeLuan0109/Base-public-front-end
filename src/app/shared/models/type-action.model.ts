export interface TypeAction {
  action: Action;
}

export type Action = 'insert' | 'update';

export type ActionSoln = 'insert' | 'update' | 'note';

export enum ECommonAction {
  INSERT = 'insert',
  UPDATE = 'update',
  VIEW = 'view',
  DELETE = 'delete'
}

export enum ESolnAction {
  INSERT = 'insert',
  UPDATE = 'update',
  VIEW = 'view',
  DELETE = 'delete',
  NOTE = 'note',
  DOWNLOAD = 'download',
  CLONE = 'clone',
  DELEGATE = 'delegate'
}

export function setTitle(action: ESolnAction, title: string) {
  let _title = null
  switch (action) {
    case ESolnAction.INSERT:
    case ESolnAction.CLONE:
      _title = `Thêm mới ${title}`
      break;
    case ESolnAction.UPDATE:
      _title = `Cập nhật ${title}`
      break;
    case ESolnAction.VIEW:
      _title = `Xem ${title}`
      break;
    case ESolnAction.DELETE:
      _title = `Xóa ${title}`
      break;
    case ESolnAction.NOTE:
      _title = `Ghi chú ${title}`
      break;
    case ESolnAction.DOWNLOAD:
      _title = `Tải xuống ${title}`
      break;
    case ESolnAction.DELEGATE:
      _title = `Phân quyền ${title}`
      break;
  }
  return _title
}