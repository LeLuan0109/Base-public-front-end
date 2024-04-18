import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { LOGIN_MUTATE, SUBSCRIBE_NOTI_TOPIC } from 'src/app/graphql/query/auth.graphql';
import { MessagingService } from '@shared/services/messaging.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private graphqlService: GraphqlService) { }

  subscribeTopic(token: string): Observable<boolean> {
    return this.graphqlService.mutation<boolean>(SUBSCRIBE_NOTI_TOPIC, { token });

  }

}
