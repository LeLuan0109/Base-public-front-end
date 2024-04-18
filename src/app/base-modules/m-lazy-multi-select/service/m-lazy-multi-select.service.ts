import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MLayzyMultiSelectService {
    private _virtualScroll = new BehaviorSubject<{ scrollTop: number, scrollHeight: number }>({ scrollTop: 0, scrollHeight: 0 });

    get getVirtualScroll(): { scrollTop: number, scrollHeight: number } {
        return this._virtualScroll.value;
    }

    set setVirtualScroll(virtualScroll: { scrollTop: number, scrollHeight: number }) {
        this._virtualScroll.next(virtualScroll);
    }
}