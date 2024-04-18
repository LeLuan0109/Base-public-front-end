import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { SpinnerService } from '@shared/services/spinner.service';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService, private spinnerService: SpinnerService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("http đc gọi ");

    this.spinnerService.show();
    let headersConfig: { [key: string]: any } = {};

    if (req.headers.keys().length > 0) {
      const headerLength = req.headers.keys().length;
      for (let i = 0; i < headerLength; i++) {
        const name = req.headers.keys()[i];
        headersConfig[name] = req.headers.get(name);
      }
    } else {
      headersConfig = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    }

    // add RefreshToken
    const isRefreshToken = this.sessionService.retrieveRefreshToken();
    if (isRefreshToken) {
      headersConfig['isSaveToken'] = `${isRefreshToken}`;
    }

    // const acountInfo = this.sessionService.retrieveAccountInfo();
    // if (acountInfo?.refreshToken) {
    //   headersConfig['RefreshToken'] = `${acountInfo.refreshToken}`;
    // }

    // add token
    const token = this.sessionService.retrieveSessionToken();
    if (token) {
      headersConfig['Authorization'] = `${token}`;
      const authReq = req.clone({ setHeaders: headersConfig });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
