import { SessionService } from './../../shared/services/session.service';
import { UpdateMeInput } from 'src/app/setting/models/user.modal';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from './../../user/services/user.service';
import { Injectable } from "@angular/core";
import { ChangePasswordInput } from '../models/user.modal';
import { catchError, Observable, of, mergeMap, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ERR_MESSAGE_LABEL } from 'src/app/shared/constants/error-message.constant';
import { AccountService } from 'src/app/account/services/account.service';

@Injectable({
  providedIn: 'root',
})
export class SettingFacade {
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private toastService: ToastService,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {
  }

  changePassword(fromInput: ChangePasswordInput): Observable<boolean> {
    const input = { ...fromInput };
    input.confirmPassword = undefined;

    //chức năng thông báo tạm khi chưa có api
    return new Observable(observer => {
      const timeoutId = setTimeout(() => {
        this.toastService.showInfo('Vui lòng liên hệ bên phía công ty để thay đổi thông tin')
        observer.next(); 
        observer.complete(); 
      }, 1000);
      return () => clearTimeout(timeoutId);
    });
    
    // comment chức năng call api đổi mật khẩu, khi nào có api thì bật dòng này lên
    // return this.accountService.changePassword(input).pipe(
    //   mergeMap(() => {
    //     this.toastService.showSuccess('Đổi mật khẩu thành công!');
    //     return of(true)
    //   }),
    //   catchError(err => {
    //     this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
    //     return of(false)
    //   })
    // )
  }

  updateMe(fromInput: UpdateMeInput): Observable<boolean> {
    const input = { ...fromInput };
    input.fullName = input.fullName?.trim();
    if (input.birthday) {
      const birthday = input.birthday as Date;
      birthday.setHours(0);
      birthday.setMilliseconds(0);
      birthday.setSeconds(0);
      birthday.setMinutes(0);
      input.birthday = birthday.getTime() / 1000;
    }
    
    //chức năng thông báo tạm khi chưa có api
    return new Observable(observer => {
      const timeoutId = setTimeout(() => {
        this.toastService.showInfo('Vui lòng liên hệ bên phía công ty để thay đổi thông tin')
        observer.next(); 
        observer.complete(); 
      }, 1000);
      return () => clearTimeout(timeoutId);
    });

    // comment chức năng call api đổi thông tin, khi nào có api thì bật dòng này lên
    // return this.userService.updateMe(input).pipe(
    //   mergeMap(() => {
    //     this.toastService.showSuccess('Cập nhật thông tin thành công!');
    //     this.authService.getMe().subscribe(user => {
    //       this.sessionService.serveAccountInfo(user);
    //       location.reload();
    //     })
    //     return of(true)
    //   }),
    //   catchError(err => {
    //     this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
    //     return of(false)
    //   })
    // )
  }
}
