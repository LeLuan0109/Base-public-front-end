import { ERR_MESSAGE } from './../constants/error-message.constant';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { SpinnerService } from '../services/spinner.service';
import { ShowErrorService } from '@shared/services/show-error.service';

@Injectable()
export class HttpJwtInterceptor implements HttpInterceptor {
  constructor(
    private toastService: ToastService,
    private router: Router,
    private sessionService: SessionService,
    private spinnerService: SpinnerService,
    private showErrorService: ShowErrorService,
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log("check  token ");

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // console.log(event, "http ngoai ");

        if (event instanceof HttpResponse) {
          // console.log(event, "response");

          if (event.body.errors && event.body.errors.length > 0
            && (event.body.errors[0].message === ERR_MESSAGE.user_invalid.value
              || event.body.errors[0].message === ERR_MESSAGE.unauthorized.value
              || event.body.errors[0].message === ERR_MESSAGE.forbidden.value
            )
            && this.router.url !== '/auth/login') {
            // this.tokenExpire();

          }
        }
        setTimeout(() => {
          this.spinnerService.hiden();
        }, 500)
      }),
      catchError((err: HttpErrorResponse) => {
        // console.log("chao bn ", err);

        this.spinnerService.hiden();
        if (
          err.status === 401
        ) {
          this.tokenExpire();
        }
        return throwError(() => err);
      })
    );
  }

  private tokenExpire() {
    if (this.showErrorService.isShowError) {
      this.showErrorService.showError = false;
      this.toastService.showError('Phiên đăng nhập của bạn đã hết hạn');
      this.sessionService.purgeSessionInfo();
      this.router.navigate(['/auth/login']);
    }
  }
}
