import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _spinner = new BehaviorSubject<boolean>(false);
  private _isWaitAll = false;
  private _disabled = false;

  get spinner$(): Observable<boolean> {
    return this._spinner.asObservable();
  }

  hiden() {
    if (!this._isWaitAll) {
      this._spinner.next(false);
    }
  }

  show() {
    if(!this._disabled) {
      this._spinner.next(true);
    }
  }

  showWaitAll() {
    this._isWaitAll = true;
    this._spinner.next(true);
  }

  hidenAll() {
    this._spinner.next(false);
    this._isWaitAll = false;
  }

  disabled() {
    this._disabled = true;
  }
}
