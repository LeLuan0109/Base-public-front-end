import { Injectable } from "@angular/core";
import { FunctionService } from "../services/function.service";
import { ToastService } from "@shared/services/toast.service";
import { FunctionInfo, FunctionInput } from "../models/function.model";
import { BehaviorSubject, EMPTY, Observable, catchError, distinctUntilChanged, filter, mergeMap, of, tap } from "rxjs";
import { TreeNode } from "primeng/api";
import { ResponseMutate } from "@shared/models/response-mutate.model";
import { ERR_MESSAGE_LABEL } from "@shared/constants/error-message.constant";
import { AuthService } from "src/app/auth/services/auth.service";
import { AuthFacade } from "src/app/auth/facade/auth.facade";

@Injectable({
  providedIn: 'root',
})
export class MenuFacade {
  private _treeFunctions = new BehaviorSubject<TreeNode<FunctionInfo>[] | null>(null);
  private _func = new BehaviorSubject<FunctionInfo | null>(null);
  private _parent = new BehaviorSubject<FunctionInfo | null>(null);
  private _funcs = new BehaviorSubject<FunctionInfo[] | null>(null);
  private _loadMenu = new BehaviorSubject<boolean>(false);

  constructor(
    private toastService: ToastService,
    private functionService: FunctionService,
    private authFacade: AuthFacade
  ) { }

  get treeFunctions$(): Observable<TreeNode<FunctionInfo>[]> {
    return this._treeFunctions.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  get loadMenu$(): Observable<boolean> {
    return this._loadMenu.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }


  get func$(): Observable<FunctionInfo> {
    return this._func.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    )
  }

  set func(func: FunctionInfo) {
    this._func.next(func);
  }

  get parent$(): Observable<FunctionInfo> {
    return this._parent.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    )
  }

  set parent(func: FunctionInfo | null) {
    this._parent.next(func);
  }

  get funcs$(): Observable<FunctionInfo[]> {
    return this._funcs.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    )
  }

  set funcs(funcs: FunctionInfo[]) {
    this._funcs.next(funcs);
  }

  getAllFunction() {
    this.functionService.getAllStatusFunction().subscribe(res => {
      this._treeFunctions.next(this._convertObjFunction(res));
    })
  }

  updateFunction(code: string, formData: FunctionInput): Observable<ResponseMutate> {
    const input = { label: formData.label, icon: formData.icon } as FunctionInput;
    return this.functionService.updateFunction(code, input).pipe(tap({
      next: () => {
        this.authFacade.getMe().subscribe(res => {
          location.reload();
          this.toastService.showSuccess('Cập nhật menu thành công');
        })
      }
    }), catchError((err: any) => {
      this.toastService.showError(ERR_MESSAGE_LABEL(err.message))
      return EMPTY;
    }))
  }

  updateStatusFunction(code: string, status: number): Observable<ResponseMutate> {
    return this.functionService.updateStatusFunction(code, status).pipe(tap(() => {
      this.authFacade.getMe().subscribe(res => {
        location.reload();
        this.toastService.showSuccess(status === 1 ? 'Đổi trạng thái hiển thị menu thành công' : 'Đổi trạng thái ẩn menu thành công');
      })
    }), catchError((err: any) => {
      this.toastService.showError(ERR_MESSAGE_LABEL(err.message))
      return EMPTY;
    }))
  }

  // updateStatusFunction(code: string, status: number): Observable<ResponseMutate> {
  //   return this.functionService.updateStatusFunction(code, status).pipe(tap(() => {
  //     next: () => {
  //       this.toastService.showInfo(status === 1 ? 'Đổi trạng thái hiển thị menu thành công' : 'Đổi trạng thái ẩn menu thành công');
  //       return this.authService.getMe().pipe(
  //         mergeMap(user => {
  //           this.authFacade.saveRoles(user);
  //           return of(true);
  //         })
  //       )
  //     }
  //   }), catchError((err: any) => {
  //     this.toastService.showError(ERR_MESSAGE_LABEL(err.message))
  //     return EMPTY;
  //   }))
  // }

  updateSort(funs: FunctionInfo[], parent?: FunctionInfo): Observable<ResponseMutate> {
    if (parent) {
      return this.functionService.updateSort(funs.map((f, i) => ({ code: f.code!, sort: parent.sort! * 10 + 1 + i })), parent.code)
        .pipe(tap(() => {
          this.authFacade.getMe().subscribe(res => {
            location.reload();
            this.toastService.showSuccess('Cập nhật thứ tự menu thành công');
          })
        }), catchError((err: any) => {
          this.toastService.showError(ERR_MESSAGE_LABEL(err.message))
          return EMPTY;
        }));
    } else {
      return this.functionService.updateSort(funs.map((f, i) => ({ code: f.code!, sort: i + 1 })))
        .pipe(tap(() => {
          this.authFacade.getMe().subscribe(res => {
            location.reload();
            this.toastService.showSuccess('Cập nhật thứ tự menu thành công');
          })
        }), catchError((err: any) => {
          this.toastService.showError(ERR_MESSAGE_LABEL(err.message))
          return EMPTY;
        }));
    }
  }

  private _convertObjFunction(functions: FunctionInfo[]): TreeNode<FunctionInfo>[] {
    const result: TreeNode<FunctionInfo>[] = [];
    functions.forEach(fu => {
      if (!fu.parentCode) {
        result.push({ data: fu, children: [] })
      } else {
        const index = result.findIndex(r => r.data?.code === fu.parentCode);
        if (index > -1) {
          result[index].children?.push({ data: fu });
        }
      }
    })
    return result;
  }
}