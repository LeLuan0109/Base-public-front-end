import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, filter } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MDialogConfig {
    private _data = new BehaviorSubject<any>(null);

    constructor() { }

    get data$(): Observable<any> {
        return this._data.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        )
    }

    get data(): any {
        return this._data.value;
    }

    setData(data: any) {
        this._data.next(data);
    }
}
