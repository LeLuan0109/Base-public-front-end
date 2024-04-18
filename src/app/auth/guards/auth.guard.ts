import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private toastService: ToastService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log("kiem tra auth guard");

    if (!this.sessionService.checkToken()) {
      this.toastService.showError('Bạn cần đăng nhập');
      this.router.navigate(['/auth/login']);
      return false;
    }
    const urls = this.sessionService.retrieveUrlInfo();
    if (!urls) {
      this.sessionService.purgeSessionInfo();
      this.toastService.showError('Bạn cần đăng nhập');
      this.router.navigate(['/auth/login']);
      return false;
    }
    const url = state.url.includes('?') ? state.url.substring(0, state.url.indexOf('?')) : state.url;
    if (urls.has(url) || url.includes('dashboard') || url.includes('post-analyze-data')) {
      return true;
    }
    if (Array.from(urls).findIndex(key => url.includes(key)) > -1) {
      return true;
    }

    this.sessionService.purgeSessionInfo();
    this.toastService.showError('Bạn không có quyền truy cập');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
