import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs";

export interface FilterParam {
  topicId?: number;
  topicName?: string;
  startDate?: number;
  endDate?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _onSearch = new BehaviorSubject<FilterParam | null>(null);

  get onSearch$(): Observable<FilterParam> {
    return this._onSearch.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set onSearch(param: FilterParam) {
    this._onSearch.next(param);
  }
}