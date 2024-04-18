import { SessionService } from '@shared/services/session.service';
import { STATUS } from '../../shared/constants/status.constant';
import { ERR_MESSAGE_LABEL } from '../../shared/constants/error-message.constant';
import { ToastService } from '../../shared/services/toast.service';
import { LazyLoadEvent } from 'primeng/api';
import { AccountService } from '../services/account.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, filter, Observable, tap, of, mergeMap, catchError, from, takeLast, EMPTY } from 'rxjs';
import { PagingData } from 'src/app/shared/models/paging-data.model';
import { FilterAccountInput, AccountInfo, AccountInput } from '../models/account.model';
import { ResponseMutate } from 'src/app/shared/models/response-mutate.model';
import { convertFilter } from 'src/app/shared/utils/filter-params.util';
import { Action, ESolnAction, setTitle } from 'src/app/shared/models/type-action.model';
import { UserService } from 'src/app/user/services/user.service';
import { LabelValue } from '@shared/models/label-value.model';
import { FilterUserInput } from 'src/app/user/models/user.model';
import { FunctionService } from 'src/app/menu/services/function.service';
import { ActionInfo, RoleInfo } from '@shared/models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AccountFacade {
  private _title = 'tài khoản';
  private _accountPaging = new BehaviorSubject<PagingData<AccountInfo> | null>(null);
  private _accountSingle = new BehaviorSubject<AccountInfo | null>(null);
  private _action = new BehaviorSubject<ESolnAction>(ESolnAction.INSERT);
  private _users = new BehaviorSubject<LabelValue[]>([]);
  private _functions = new BehaviorSubject<RoleInfo[] | null>(null);
  private _actions = new BehaviorSubject<ActionInfo[] | null>(null);

  constructor(
    private accountService: AccountService,
    private toastService: ToastService,
    private userService: UserService,
    private sessionService: SessionService,
    private functionService: FunctionService
  ) { }

  get accountPaging$(): Observable<PagingData<AccountInfo>> {
    return this._accountPaging.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get accountSingle$(): Observable<AccountInfo> {
    return this._accountSingle.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set accountSingle(uerInfo: AccountInfo) {
    this._accountSingle.next(uerInfo);
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

  get users$(): Observable<LabelValue[]> {
    return this._users.asObservable().pipe(
      distinctUntilChanged()
    )
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

  filterAccount(filterEvent?: LazyLoadEvent) {
    const filter = convertFilter(filterEvent?.filters) as FilterAccountInput;
    this.accountService.filterAccount(filter,
      (filterEvent?.first ?? 0) / (filterEvent?.rows ?? 10),
      filterEvent?.rows ?? 10).subscribe(res => {
        this._accountPaging.next(res);
      })
  }

  getAccountDetail(id: number): Observable<AccountInfo> {
    return this.accountService.getAccountDetail(id).pipe(tap(res => {
      this._accountSingle.next(res);
    }))
  }

  createAccount(input: AccountInput): Observable<boolean> {
    return this.accountService.createAccount(input).pipe(
      mergeMap((_) => {
        this.toastService.showSuccess('Tạo mới tài khoản thành công');
        return of(true);
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of(false);
      })
    );
  }

  updateAccount(id: number, input: AccountInput): Observable<boolean> {
    return this.accountService.updateAccount(id, input).pipe(
      mergeMap((_) => {
        this.toastService.showSuccess('Cập nhật tài khoản thành công');
        return of(true);
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of(false);
      })
    );
  }

  setPassword(id: number, inputForm: AccountInput): Observable<ResponseMutate> {
    return this.accountService.setPassword(id, inputForm.password!).pipe(
      tap((_) => {
        this.toastService.showSuccess('Cập nhật mật khẩu thành công');
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of({} as ResponseMutate);
      })
    );
  }

  deleteAccount(accounts: AccountInfo[]): Observable<ResponseMutate> {
    const index = accounts.findIndex(a => this.sessionService.retrieveAccountInfo()?.id === a.id);
    if (index > -1) {
      this.toastService.showError('Không thể xoá tài khoản chính mình!');
      return EMPTY;
    }
    return from(accounts).pipe(
      mergeMap(res => {
        return this.accountService.deleteAccount(res.id!);
      }),
      takeLast(1),
      tap((_) => {
        this.toastService.showSuccess('Xóa tài khoản thành công');
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return EMPTY;
      })
    );
  }

  updateStatus(id: number, status: number): Observable<ResponseMutate> {
    if (this.sessionService.retrieveAccountInfo()?.id === id) {
      this.toastService.showError('Không thể khóa tài khoản chính mình!');
      return EMPTY;
    }
    return this.accountService.updateStatus(id, status).pipe(
      tap((_) => {
        if (status === STATUS.active.value) {
          this.toastService.showSuccess('Kích hoạt tài khoản thành công!');
        } else {
          this.toastService.showSuccess('Khoá tài khoản thành công!');
        }
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of({} as ResponseMutate);
      })
    );
  }

  saveAccount(inputForm?: AccountInput, id?: number): Observable<boolean> {
    if (!inputForm) {
      this.toastService.showError('Dữa liệu đầu vào không đúng');
      return of(false);
    }
    const input = {
      username: inputForm.username,
      password: inputForm.password,
      roles: this._fromToFunctionInput(inputForm),
      email: inputForm.username,
      fullName: inputForm.fullName,
    };
    if (id) {
      input.password = undefined;
      return this.updateAccount(id!, input);
    }
    return this.createAccount(input);
  }

  getUserAll(): Observable<LabelValue[]> {
    return this.userService.getAllUserNotAccount().pipe(mergeMap(res => of(res.map(u => ({ label: u.fullName, value: u.id })))));
  }

  searchUser() {
    this.userService.searchUser('', 0, 1000).subscribe(res => {
      this._users.next(res.data ? res.data.map(u => ({ label: u.fullName, value: u.id })) : []);
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

  private convertObjFunction(functions: RoleInfo[]): RoleInfo[] {
    const result: RoleInfo[] = [];
    functions.forEach(fu => {
      if (fu.code !== 'account' && fu.code !== 'userManager') {
        if (fu.actions) {
          fu.actions = JSON.parse(fu.actions as unknown as string) as { [key: string]: boolean };
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
      }
    })
    return result;
  }

  private _fromToFunctionInput(fromValue: any): string {
    const result: RoleInfo[] = [];
    const functions = JSON.parse(JSON.stringify([...this._functions.value!])) as RoleInfo[];
    const arrayObj = Object.entries(fromValue);
    functions.forEach(ft => {

      const ftCopy = { ...ft };
      ftCopy.items = undefined;
      if (ftCopy.actions) {
        const index = arrayObj.findIndex(obj => obj[0] === ft.code! && Object.entries(obj[1] as object).findIndex(objSub => objSub[1] === true) > -1);
        if (index > -1) {
          if (ftCopy.queryParams) {
            ftCopy.queryParams = JSON.parse(ft.queryParams as unknown as string);
          }
          ftCopy.actions = JSON.stringify(arrayObj[index][1] as { [key: string]: boolean });
          result.push(ftCopy);
        }
      }
      if (ft.items && ft.items.length > 0) {
        ft.items.forEach(el => {
          if (el.actions) {
            const index = arrayObj.findIndex(obj => obj[0] === ft.code! && Object.entries(obj[1] as object).findIndex(objSub => objSub[1] === true) > -1);
            if (index > -1) {
              if (el.queryParams) {
                el.queryParams = JSON.parse(ft.queryParams as unknown as string);
              }
              el.actions = JSON.stringify(arrayObj[index][1] as { [key: string]: boolean });
              el.items = undefined;
              result.push(el);
            }
          }
        })
      }
    });
    return JSON.stringify(result);
  }
}
