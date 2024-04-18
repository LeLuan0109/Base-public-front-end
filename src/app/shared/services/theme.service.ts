import { Injectable } from "@angular/core";
import { ETheme } from "@shared/constants/theme.constant";
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs";

export const THEME = "THEME";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _theme = new BehaviorSubject<ETheme>(ETheme.LIGHT);

  constructor() {}

  get theme$(): Observable<ETheme> {
    return this._theme.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set theme(theme: ETheme) {
    this._theme.next(theme);
    this.serveTheme(theme);
  }

  retrieveTheme(): ETheme {
    return (localStorage.getItem(THEME) as ETheme) ?? ETheme.LIGHT;
  }

  serveTheme(theme: ETheme) {
    localStorage.setItem(THEME, theme);
  }
}
