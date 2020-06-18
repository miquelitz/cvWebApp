import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, takeUntil, catchError } from 'rxjs/operators';

import { SocketMessageActionTypes, AddWSMessageAction, CreateWSSubscriptionAction, WSMessageReceivedAction, WSChatConnectAction, WSChatDisconnectAction } from '../actions/socketMessage.actions'
import { WebSocketService } from '../../services/websocket.service';
import { SocketMessage } from '../models/socketMessage.model';

@Injectable()
export class SocketMessageEffects {

  createWSSubscription$ = createEffect(() => this.actions$
    .pipe(
      ofType<CreateWSSubscriptionAction>(SocketMessageActionTypes.CREATE_WS_SUBSCRIPTION),
      mergeMap(
        () => this.connectWSStream()
      ),
      map((message: SocketMessage) => new WSMessageReceivedAction(message)
      )
    ));

  getMessages$ = createEffect(() => this.actions$
    .pipe(
        ofType(SocketMessageActionTypes.WSMessageReceived),
        map(({ payload }) => {
          return new AddWSMessageAction(payload)
        })
    ));

    connectChat$ = createEffect(() => this.actions$
    .pipe(
      ofType(SocketMessageActionTypes.CONNECT_CHAT),
      map(({ payload }) => {
        this.ws.connectToChat(payload);
      })
    ), { dispatch: false });

    disconnectChat$ = createEffect(() => this.actions$
    .pipe(
        ofType(SocketMessageActionTypes.DISCONNECT_CHAT),
        map(() => {
          return new WSChatDisconnectAction()
        })
    ));
    
    sendMessage$ = createEffect(() => this.actions$
    .pipe(
      ofType(SocketMessageActionTypes.SEND_MESSAGE),
      map(( payload:any ) => {
        this.ws.sendChatMessage(payload.payload.id, payload.payload.text);
      })
    ), { dispatch: false });

    adminStatus$ = createEffect(() => this.actions$
    .pipe(
      ofType(SocketMessageActionTypes.REQUEST_ADMIN_STATUS),
      map(() => {
        this.ws.adminStatusRequest();
      })
    ), { dispatch: false });


    private connectWSStream() {
      return this.ws
          .connectToMessagesStream()
          .pipe(
              takeUntil(
                  this.actions$.pipe(ofType(SocketMessageActionTypes.CLOSE_WS_SUBSCRIPTION))
              )
          );
    }

  constructor(
    private actions$: Actions,
    private ws: WebSocketService
  ) { }
}