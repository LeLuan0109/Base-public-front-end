import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToastService } from 'src/app/shared/services/toast.service';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class IsLogin implements CanActivate {
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
    //  get token 
    console.log("kiem tra login ");

    const token = this.sessionService.retrieveSessionToken();
    if (token) {
      try {
        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {

          this.sessionService.purgeSessionInfo();
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } catch (error) {
        this.sessionService.purgeSessionInfo();
        this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      return true;
    }
  }
}
