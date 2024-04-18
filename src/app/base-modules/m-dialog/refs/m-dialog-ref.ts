import { Subject } from 'rxjs';

export class MDialogRef {
  private readonly _afterClosed = new Subject<any>();

  public afterClosed = this._afterClosed.asObservable();
  public isLoadClose = false;

  constructor() {}

  public close(result?: any) {
    this._afterClosed.next(result);
  }
}
