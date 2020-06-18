import { ApiState } from '../reducers/api.reducer';
import { SocketState } from '../reducers/socketMessage.reducer';

export interface AppState {
  readonly api: ApiState,
  readonly socket: SocketState
}