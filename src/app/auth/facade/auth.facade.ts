import { FunctionService } from 'src/app/menu/services/function.service';
import { EMPTY, combineLatest, filter, map, tap } from 'rxjs';
import { ERR_MESSAGE_LABEL } from './../../shared/constants/error-message.constant';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Injectable } from "@angular/core";
import { Observable, of, catchError, mergeMap } from 'rxjs';
import { CredInput } from '../models/cred-Input.model';
import { UserInfo } from '@shared/models/user-info.model';
import { RoleInfo } from '@shared/models/role.model';
import { ResponseMutate } from '@shared/models/response-mutate.model';
import { FirebaseService } from '../services/firebase.service';
import { MessagingService } from '@shared/services/messaging.service';
import { MenuItem } from 'primeng/api';
import { RegisterInput, RegiterForm } from '../models/regiter.model';
// import { ACCOUNT_OPTIONS, ROLE_MENU, USER_ACCOUNT } from 'src/app/user/constant/user.constant';
import { SpinnerService } from '@shared/services/spinner.service';
import { ACCOUNT_OPTIONS, ROLE_MENU } from 'src/app/user/constant/user.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private sessionService: SessionService,
    private functionService: FunctionService,
    private firebaseService: FirebaseService,
    private messagingService: MessagingService,
    private spinnerService: SpinnerService
  ) { }

  logout(): Observable<boolean> {
    this.sessionService.purgeSessionInfo();
    this.sessionService.destroyPermission();
    return of(true);
  }

  loginOld(input: CredInput): Observable<boolean> {
    return this.authService.login(input).pipe(
      mergeMap(res => {
        this.sessionService.serveSessionToken(res.token);
        this.messagingService.requestPermission()
          .pipe(mergeMap(tokenFireBase => {
            return this.firebaseService.subscribeTopic(tokenFireBase);
          })).subscribe(() => {
            // this.messagingService.receiveMessage();
          });
        return this.getMe();
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of(false);
      })
    );
  }

  login(input: CredInput): Observable<boolean> {

    return this.authService.login(input).pipe(
      mergeMap(res => {
        this.sessionService.serveSessionToken(res.token);
        return this.getAuthor();
      }),
      catchError(err => {
        console.log(" err login", err, err.error);

        this.toastService.showError(ERR_MESSAGE_LABEL(err.error.message));
        return of(false);
      })
    )
  }

  forgotPass(formData: { email: string }): Observable<ResponseMutate> {
    return this.authService.forgotPass(formData).pipe(catchError(err => {
      this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
      return EMPTY;
    }))
  }

  getMe(): Observable<boolean> {
    this.sessionService.destroyPermission();
    return combineLatest({
      me: this.authService.getMe(),
      funcs: this.functionService.getAllFunction()
    }).pipe(
      mergeMap((res: any) => {
        this._saveRoles(res.me, res.funcs);
        return of(true);
      }),
      catchError((err: any) => {
        this.sessionService.purgeSessionInfo();
        return of(false);
      })
    )
  }

  register(formInput: RegiterForm): Observable<ResponseMutate> {
    const input: RegisterInput = {
      username: formInput.email,
      password: formInput.password,
      fullName: formInput.fullName,
      phone: formInput.phone,
      email: formInput.email,
      company: {
        companyName: formInput.companyName,
        website: formInput.website ? formInput.website.trim() : undefined,
        address: formInput.address,
        phone: formInput.phone,
        email: formInput.email,
        texCode: formInput.texCode ? formInput.texCode.trim() : undefined,
      }
    }
    return this.authService.register(input).pipe(tap(() => {
      this.toastService.showSuccess('Đăng ký thành công!');
    }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        throw err;
      })
    )
  }

  verify(token: string): Observable<ResponseMutate> {
    return this.authService.verify({ token });
  }

  private _saveRoles(user: UserInfo, funcs: RoleInfo[]) {
    const userInfo = { ...user };
    userInfo.roles = undefined;
    this.sessionService.serveAccountInfo(userInfo);
    const roles = user.roles ? JSON.parse(user.roles) as RoleInfo[] : [];
    const mapMenu = new Map<string, RoleInfo>()
    const mapRoles = new Map<string, { [key: string]: boolean }>()
    const setUrl = new Set<String>();
    roles.forEach(r => {
      if (funcs.findIndex(f => f.code === r.code) > -1) {
        setUrl.add(r.routerLink ?? '');
        mapRoles.set(r.code!, r.actions ? JSON.parse(r.actions as unknown as string) : {});
      }
    });
    funcs.filter(r => !r.parentCode).forEach(el => {
      if (mapRoles.has(el.code!)) {
        mapMenu.set(el.code!, el);
      }
    })
    funcs.filter(r => r.parentCode).forEach(el => {
      if (mapMenu.has(el.parentCode!)) {
        if (mapMenu.get(el.parentCode!)?.items) {
          mapMenu.get(el.parentCode!)?.items?.push(el);
        } else {
          mapMenu.get(el.parentCode!)!.items = [el];
        }
      }
    })

    const menus: { [key: string]: MenuItem[] } = {
      dashboard: [],
      report: [],
      main: [],
      setting: []
    };
    Array.from(mapMenu, ([key, value]) => (value)).forEach(el => {
      if (el.items && el.items.length > 0) {
        el.items.sort((l, r) => l.sort! - r.sort!);
      }
      if (el.position === 1) {
        menus['main'].push(el);
      } else if (el.position === 2) {
        menus['report'].push(el);
      } else if (el.position === 3) {
        menus['setting'].push(el);
      }
    })
    this.sessionService.serveMenuInfo(menus);
    this.sessionService.serveRoleInfo(Object.fromEntries(mapRoles));
    this.sessionService.serveUrlInfo(Array.from(setUrl) as string[]);
  }


  private getAuthor(): Observable<boolean> {
    return new Observable<any>(observer => {
      this.authService.getAuthor().subscribe(
        res => {
          if (res.roles === 'ADMIN') {
            res.admin = true;
            observer.next(ROLE_MENU[1]);
          } else if (res.roles === 'EXPERT') {
            res.admin = true;
            observer.next(ROLE_MENU[0]);
          } else if (res.roles === 'USER') {
            res.admin = false;
            observer.next(ROLE_MENU[0]);
          }
          this.sessionService.serveAccountInfo(res);


        },
        err => {
          observer.error(err); // Phát ra lỗi nếu có lỗi xảy ra khi lấy author
        }
      );
    }).pipe(
      map(res => {
        this.sessionService.serveMenuInfo(res.ACCOUNT_OPTIONS.MENU);
        this.sessionService.serveRoleInfo(res.ACCOUNT_OPTIONS.ROLES);
        this.sessionService.serveUrlInfo(res.ACCOUNT_OPTIONS.URLS);
        return true; // Trả về true nếu thành công
      }),
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.error.message));
        return of(false); // Trả về false nếu có lỗi
      })
    );
  }

}
