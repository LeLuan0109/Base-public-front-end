import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, Observable, catchError, distinctUntilChanged, filter, tap } from 'rxjs';
// import {  } from '@angular/fire/messaging';
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private _currentMessage = new BehaviorSubject<MessagePayload | null>(null);

  bgMessage: any;

  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging) => {

        _messaging.data = _messaging.data
        // _messaging.notification = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
    this.bgMessage = this.angularFireMessaging.onBackgroundMessage
  }

  get currentMessage(): Observable<MessagePayload> {
    return this._currentMessage.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  requestPermission(): Observable<any> {
    return this.angularFireMessaging.requestToken.pipe(
      tap(res => {
        console.log('token firebase', res);
      }),
      catchError(err => {
        console.log('firebase requestPermission', err);
        throw err;
      })
    );
  }

  receiveMessage() {
    // getMessaging().getInstance().subscribeToTopic("news");

    // this.angularFireMessaging.onBackgroundMessage
    // this.angularFireMessaging.messages.subscribe(
    //   (payload) => {
    //     console.log("new message received. ", payload);
    //     this._currentMessage.next(payload);
    //   })

    // this.angularFireMessaging.onBackgroundMessage
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      // console.log('Message received. ', payload);
      this._currentMessage.next(payload)
    })

  }


}
