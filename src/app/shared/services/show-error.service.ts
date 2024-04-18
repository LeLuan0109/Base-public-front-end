import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShowErrorService {
  private _showError = new BehaviorSubject<boolean>(true);

  set showError(isShow: boolean) {
    this._showError.next(isShow);
  }

  get isShowError(): boolean {
    return this._showError.getValue();
  }
}
