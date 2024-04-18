import { map } from 'rxjs';
import { UserGroupService } from './../../user-group/services/user-group.service';
import { ERR_MESSAGE_LABEL } from './../../shared/constants/error-message.constant';
import { ToastService } from './../../shared/services/toast.service';
import { LazyLoadEvent } from 'primeng/api';
import { UserService } from './../services/user.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, filter, Observable, tap, of, mergeMap, catchError, from, takeLast, EMPTY } from 'rxjs';
import { PagingData } from 'src/app/shared/models/paging-data.model';
import { FilterUserInput, UserInfo, UserInput } from '../models/user.model';
import { ResponseMutate } from 'src/app/shared/models/response-mutate.model';
import { convertFilter } from 'src/app/shared/utils/filter-params.util';
import { Action, ESolnAction, setTitle } from 'src/app/shared/models/type-action.model';
import { LabelValue } from '@shared/models/label-value.model';
import { ActionInfo, FunctionInfo } from 'src/app/user-group/models/function.model';
import { FunctionService } from 'src/app/menu/services/function.service';
import { HttpParams } from '@angular/common/http';
import { downloadFileExcel } from '@shared/utils/download-file.util';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  private _title = 'người dùng';
  private _userPaging = new BehaviorSubject<PagingData<UserInfo> | null>(null);
  private _userSingle = new BehaviorSubject<UserInfo | null>(null);
  private _action = new BehaviorSubject<ESolnAction>(ESolnAction.INSERT);
  private _groups = new BehaviorSubject<LabelValue[]>([]);
  private _functions = new BehaviorSubject<FunctionInfo[] | null>(null);
  private _actions = new BehaviorSubject<ActionInfo[] | null>(null);

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private userGroupService: UserGroupService,
    private functionService: FunctionService
  ) { }

  get userPaging$(): Observable<PagingData<UserInfo>> {
    return this._userPaging.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get userSingle$(): Observable<UserInfo> {
    return this._userSingle.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set userSingle(uerInfo: UserInfo) {
    this._userSingle.next(uerInfo);
  }

  get action$(): ESolnAction {
    return this._action.getValue();
  }

  set action(action: ESolnAction) {
    this._action.next(action);
  }

  get title(): string {
    return setTitle(this.action$, this._title);
  }

  get userGroups$(): Observable<LabelValue[]> {
    return this._groups.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  get actions$(): Observable<ActionInfo[]> {
    return this._actions.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get functions$(): Observable<ActionInfo[]> {
    return this._functions.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  filterUser(filterEvent?: LazyLoadEvent) {
    const filter = convertFilter(filterEvent?.filters) as FilterUserInput;
    this.userService.filterUser(filter,
      (filterEvent?.first ?? 0) / (filterEvent?.rows ?? 10),
      filterEvent?.rows ?? 10).subscribe(res => {
        this._userPaging.next(res);
      });
  }

  getUserDetail(id: number): Observable<UserInfo> {
    return this.userService.getUserDetail(id).pipe(tap(res => {
      this._userSingle.next(res);
    }))
  }

  createUser(input: UserInput): Observable<ResponseMutate> {
    return this.userService.createUser(input).pipe(
      tap((_) => {
        this.toastService.showSuccess('Tạo mới tài khoản thành công');
      })
    );
  }

  updateUser(id: number, input: UserInput): Observable<ResponseMutate> {
    return this.userService.updateUser(id, input).pipe(
      tap((_) => {
        this.toastService.showSuccess('Cập nhật tài khoản thành công');
      })
    );
  }

  deleteUser(users: UserInfo[]): Observable<ResponseMutate> {
    return from(users).pipe(
      mergeMap(res => {
        return this.userService.deleteUser(res.id!);
      }),
      takeLast(1),
      tap((_) => {
        this.toastService.showSuccess('Xóa người dùng thành công');
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return EMPTY;
      })
    );
  }

  saveUser(input: UserInput, id?: number): Observable<boolean> {
    const userInput: UserInput = { fullName: input.fullName?.trim(), phone: input.phone, userGroupId: input.userGroupId, email: input.email };
    userInput.roles = this.fromToFunctionInput(input);
    if (!id) {
      return this.createUser(userInput).pipe(
        mergeMap((_) => {
          return of(true);
        }),
        catchError(err => {
          this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
          return of(false);
        })
      )
    }
    return this.updateUser(id!, userInput).pipe(
      mergeMap((_) => {
        return of(true);
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of(false);
      })
    );
  }

  getAllGroup() {
    this.userGroupService.filter({}, 0, 1000).subscribe(res => {
      this._groups.next(!res.data ? [] : res.data.map(g => ({ label: g.name, value: g.id })));
    })
  }

  getAllAction() {
    this.functionService.getAllAction().subscribe(res => {
      this._actions.next(res);
    })
  }

  getAllFunction() {
    this.functionService.getAllFunction().subscribe(res => {
      this._functions.next(this.convertObjFunction(res));
    })
  }

  private convertObjFunction(functions: FunctionInfo[]): FunctionInfo[] {
    const result: FunctionInfo[] = [];
    functions.forEach(fu => {
      if (fu.actions) {
        fu.actions = JSON.parse(fu.actions as string) as { [key: string]: boolean };
      }
      if (!fu.parentCode) {
        fu.items = [];
        result.push(fu);
      } else {
        const index = result.findIndex(r => r.code === fu.parentCode);
        if (index > -1) {
          result[index].items?.push(fu);
        }
      }
    })
    return result;
  }

  private fromToFunctionInput(fromValue: any): string {
    const result: FunctionInfo[] = [];
    const functions = JSON.parse(JSON.stringify([...this._functions.value!])) as FunctionInfo[];
    const arrayObj = Object.entries(fromValue);
    functions.forEach(ft => {
      if (ft.queryParams) {
        ft.queryParams = JSON.parse(ft.queryParams as string);
      }
      if (ft.items!.length > 0) {
        const ftCopy = { ...ft };
        ftCopy.items = [];
        ft.items?.forEach(sub => {
          if (sub.queryParams) {
            sub.queryParams = JSON.parse(sub.queryParams as string);
          }
          const index = arrayObj.findIndex(obj => obj[0] === sub.code! && Object.entries(obj[1] as object).findIndex(objSub => objSub[1] === true) > -1);
          if (index > -1) {
            sub.actions = arrayObj[index][1] as { [key: string]: boolean };
            ftCopy.items?.push(sub);
          }
        });
        if (ftCopy.items!.length > 0) {
          result.push(ftCopy);
        }
      } else {
        const index = arrayObj.findIndex(obj => obj[0] === ft.code! && Object.entries(obj[1] as object).findIndex(objSub => objSub[1] === true) > -1);
        if (index > -1) {
          ft.actions = arrayObj[index][1] as { [key: string]: boolean };
          result.push(ft);
        }
      }
    });
    return JSON.stringify(result);
  }

  getTemplate(): Observable<any> {
    return this.userService.getTemplate().pipe(
      tap(res => {
        downloadFileExcel(res.body, 'Mẫu tải lên người dùng');
      })
    );
  }

  upload(file: any): Observable<ResponseMutate> {
    const formBody = new FormData();
    formBody.append('file', file);
    return this.userService.upload(formBody).pipe(
      tap(() => {
        this.toastService.showSuccess('Tải tệp lên thành công');
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.error.error.message));
        return of({} as ResponseMutate);
      })
    );
  }

  export(filterEvent?: LazyLoadEvent) {
    const filter = convertFilter(filterEvent?.filters) as FilterUserInput;
    const params = JSON.parse(JSON.stringify(filter)) as HttpParams
    return this.userService.export(params).pipe(
      tap(res => {
        downloadFileExcel(res.body, 'Danh sách người dùng');
      })
    );
  }

  exportIds(ids: number[]) {
    return this.userService.exportIds(ids).pipe(
      tap(res => {
        downloadFileExcel(res.body, 'Danh sách người dùng');
      })
    );
  }
}
