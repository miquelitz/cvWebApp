import { Action, createAction, props } from '@ngrx/store';
import { SocketMessage } from '../models/socketMessage.model';
import { ChatMessage } from '../models/chatMessage.model';

export enum SocketMessageActionTypes {
  ADD_WS_MSG = '[SOCKET] Add Message',
  CREATE_WS_SUBSCRIPTION = '[SOCKET] CREATE SUBSCRIPTION',
  CLOSE_WS_SUBSCRIPTION = '[SOCKET] CLOSE SUBSCRIPTION',
  WSMessageReceived = '[SOCKET] MSG_RECEIVED',
  SEND_MESSAGE = '[SOCKET] SEND_MESSAGE',
  CONNECT_CHAT = '[SOCKET] CONNECT CHAT',
  DISCONNECT_CHAT = '[SOCKET] DISCONNECT CHAT',
  REQUEST_ADMIN_STATUS = '[SOCKET] REQUEST ADMIN STATUS'
}

export class AddWSMessageAction implements Action {
  readonly type = SocketMessageActionTypes.ADD_WS_MSG

  constructor(public payload: ChatMessage) {}
}

export class CreateWSSubscriptionAction implements Action {
  readonly type = SocketMessageActionTypes.CREATE_WS_SUBSCRIPTION

}

export class CloseWSSubscriptionAction implements Action {
  readonly type = SocketMessageActionTypes.CLOSE_WS_SUBSCRIPTION
}

export class WSMessageReceivedAction implements Action {
  readonly type = SocketMessageActionTypes.WSMessageReceived

  constructor(public payload: SocketMessage) {}
}

export class WSChatConnectAction implements Action {
  readonly type = SocketMessageActionTypes.CONNECT_CHAT

  constructor(public payload: string) {}
}

export class WSChatDisconnectAction implements Action {
  readonly type = SocketMessageActionTypes.DISCONNECT_CHAT
}

export class WSRequestAdminStatusAction implements Action {
  readonly type = SocketMessageActionTypes.REQUEST_ADMIN_STATUS
}

export class SendChatMessageAction implements Action {
  readonly type = SocketMessageActionTypes.SEND_MESSAGE

  constructor(public payload: any) {}
}

export type CvAction = AddWSMessageAction | CreateWSSubscriptionAction | CloseWSSubscriptionAction | WSRequestAdminStatusAction | WSMessageReceivedAction | WSChatConnectAction | WSChatDisconnectAction | SendChatMessageAction;