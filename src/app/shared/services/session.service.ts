import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

export const AUTH_TOKEN = 'AUTH_TOKEN';
export const ACCOUNT_INFO = 'ACCOUNT_INFO';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const MENU = 'MENU';
export const ROLES = 'ROLES';
export const URLS = 'URLS';
import { UserInfo } from '../models/user-info.model';
// import { RoleInfo } from '@shared/models/role.model';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  domain = environment.domain;
  private KEY_PERMISSION = 'permission';

  constructor(private cookieService: CookieService) { }

  // manage session token
  serveSessionToken(token: string) {
    this.cookieService.set(
      AUTH_TOKEN,
      token,
      7,
      '/',
      this.domain,
      false,
      'Strict'
    );
    // localStorage.setItem(AUTH_TOKEN, token);
  }

  retrieveSessionToken() {
    return this.cookieService.get(AUTH_TOKEN);
    // return localStorage.getItem(AUTH_TOKEN);
  }

  // account info
  serveAccountInfo(accInfo: UserInfo) {
    localStorage.setItem(ACCOUNT_INFO, JSON.stringify(accInfo));
  }

  retrieveAccountInfo(): UserInfo | undefined {
    const accInfo = localStorage.getItem(ACCOUNT_INFO);
    if (accInfo) {
      return JSON.parse(accInfo);
    }
    return undefined;
  }

  // menu info
  serveMenuInfo(mapMenu: { [key: string]: MenuItem[] }) {
    localStorage.setItem(MENU, JSON.stringify(mapMenu));
  }

  retrieveMenuInfo(): { [key: string]: MenuItem[] } {
    const menu = localStorage.getItem(MENU);
    if (menu) {
      return JSON.parse(menu);
    }
    return {};
  }

  // role info
  serveRoleInfo(mapRoles: { [key: string]: { [key: string]: boolean } }) {
    localStorage.setItem(ROLES, JSON.stringify(mapRoles));
  }

  retrieveRoleInfo(): { [key: string]: { [key: string]: boolean } } {
    const roles = localStorage.getItem(ROLES);
    if (roles) {
      return JSON.parse(roles);
    }
    return {};
  }

  // url info
  serveUrlInfo(urls: string[]) {
    localStorage.setItem(URLS, JSON.stringify(urls));
  }

  retrieveUrlInfo(): Set<string> {
    const urls = localStorage.getItem(URLS);
    if (urls) {
      return new Set(JSON.parse(urls));
    }
    return new Set();
  }

  // delete all
  purgeSessionInfo() {
    // this.cookieService.deleteAll();
    this.cookieService.delete(AUTH_TOKEN, '/', this.domain, false, 'Strict');
    // localStorage.removeItem(AUTH_TOKEN);
    // localStorage.removeItem(ACCOUNT_INFO);
    // localStorage.removeItem(MENU);
    // localStorage.removeItem(ROLES);
    localStorage.clear();
  }

  checkToken(): boolean {
    return this.cookieService.check(AUTH_TOKEN);
    // return localStorage.getItem(AUTH_TOKEN) ? true : false;
  }

  savePermission(permission: any) {
    localStorage.setItem(this.KEY_PERMISSION, JSON.stringify(permission));
  }

  getPermission(): any {
    if (localStorage.getItem(this.KEY_PERMISSION)) {
      return JSON.parse(
        localStorage.getItem(this.KEY_PERMISSION) as string
      ) as any;
    }
    return null;
  }

  destroyPermission() {
    localStorage.removeItem(this.KEY_PERMISSION);
    localStorage.removeItem(ACCOUNT_INFO);
    localStorage.removeItem(MENU);
    localStorage.removeItem(ROLES);
  }

  saveRefreshToken(isRefreshToken: boolean) {
    this.cookieService.set(
      REFRESH_TOKEN,
      JSON.stringify(isRefreshToken),
      7,
      '/',
      this.domain,
      false,
      'Strict'
    );
    // localStorage.setItem(REFRESH_TOKEN, isRefreshToken);
  }

  purgeRefreshToken() {
    this.cookieService.delete(REFRESH_TOKEN, '/', this.domain, false, 'Strict');
  }

  retrieveRefreshToken(): boolean {
    const isRefreshToken = this.cookieService.get(REFRESH_TOKEN);
    if (isRefreshToken) {
      return JSON.parse(isRefreshToken);
    }
    return false;
  }
}
