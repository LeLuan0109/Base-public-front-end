import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { WebSocketSubject } from 'rxjs/WebSocket';
import { environment } from '../../environments/environment';
import { timer, BehaviorSubject } from 'rxjs';
import { retryWhen, tap, delayWhen, filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MsgService {
  private _socket: WebSocketSubject<MessageEvent> | null = null;
  private _messages = new BehaviorSubject<MessageEvent | null>(null);

  constructor() { }

  connect(): void {
    if (!this._socket || this._socket.closed) {
      this._socket = this.getNewWebSocket();
    }

    this._socket
      .pipe(
        retryWhen(errors =>
          errors.pipe(
            tap(val => console.log('[Msg Service] Try to reconnect!', val)),
            delayWhen(_ => timer(environment.websocket.reconnectInterval))
          )
        )
      )
      .subscribe(msgEvent => {
        this._messages.next(msgEvent);
      });
  }

  get _messages$() {
    return this._messages.asObservable().pipe(
      filter((msg: any) => msg),
      distinctUntilChanged()
    );
  }

  close() {
    this._socket?.complete();
    this._socket = null;
  }

  getNewWebSocket() {
    return webSocket<MessageEvent>({
      url: environment.websocket.wsEndpoint,
      openObserver: {
        next: () => {
          console.log('[MsgService]: connection ok!');
        }
      },
      closeObserver: {
        next: () => {
          console.log('[MsgService]: connection closed!');
        }
      },
      deserializer: e => e
      //, deserializer: ({ data }) => {
      //   // for test retry connection
      //   // if (data.includes('world')) throw new Error('Include world');
      //   try {
      //     return JSON.parse(data) as MsgMetaData;
      //   } catch (_) {}

      //   return {};
      // }
    });
  }
}
