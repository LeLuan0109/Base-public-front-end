import { filter, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { Observable, of, catchError, mergeMap } from 'rxjs';
import { ResponseMutate } from '@shared/models/response-mutate.model';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
    providedIn: 'root',
})
export class FirebaseFacade {

    constructor(
        private firebaseService: FirebaseService,
    ) { }

    subscribeTopic(token: string) {
        return this.firebaseService.subscribeTopic(token).pipe(
            tap((res) => {
                return true
            }),
            catchError((_) => {
                return of({} as ResponseMutate);
            })
        );
    }
}