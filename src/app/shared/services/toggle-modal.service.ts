import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface ToggleModal {
  isReload: boolean;
  isClose: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToggleModalService {
  private toggleModal = new BehaviorSubject<ToggleModal | null>(null);

  setToggleModal(toggleModal: { isReload: boolean; isClose: boolean }): void {
    this.toggleModal.next(toggleModal);
  }

  getToggleModal(): Observable<{
    isReload: boolean;
    isClose: boolean;
  }> {
    return this.toggleModal.asObservable().pipe(filter((res: any) => res !== null));
  }
}
