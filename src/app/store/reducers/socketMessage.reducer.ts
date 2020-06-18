import { SocketMessageActionTypes, CvAction } from '../actions/socketMessage.actions';
import { SocketMessage } from '../models/socketMessage.model';
import { ChatMessage } from '../models/chatMessage.model';

export interface SocketState {
  status: string,
  chat_status: string,
  chat_id: string,
  admin_status: string,
  error: Error,
  messages: SocketMessage[]
  changes_messages: SocketMessage
  handshake_messages: SocketMessage
  chat_messages: ChatMessage[]
}

const initialState: SocketState = {
  status: 'offline',
  chat_status: 'offline',
  chat_id: undefined,
  admin_status: undefined,
	error: undefined,
  messages: [],
  changes_messages: undefined,
  handshake_messages: undefined,
  chat_messages: []
};

export function SocketMessageReducer(state: SocketState = initialState, action: CvAction) {
  switch (action.type) {
    case SocketMessageActionTypes.ADD_WS_MSG:
      switch(action.payload.type) {
        case 'ws_status': {
          return {
            ...state,
            status: action.payload.message
          }
          break;
        }
        case 'admin_status': {
          return {
            ...state,
            admin_status: action.payload.message
          }
          break;
        }
        case 'handShakeResp': {
          return {
            ...state,
            handshake_messages: action.payload
          }
          break;
        }
        case 'chat_message': {
          const newMsg: ChatMessage = {
            ...action.payload, newDate: Date()
          }
          return {
            ...state,
            chat_messages: [ ...state.chat_messages, newMsg ]
          }
          break;
        }
        case 'bd_change': {
          return {
            ...state,
            changes_messages: action.payload
          }
          break;
        }
        default: {
          return {
            ...state,
            messages: [ state.messages, action.payload ]
          }
          break;
        }
      }
    default:
      return state;
  }
}