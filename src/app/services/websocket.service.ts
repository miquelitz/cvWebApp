import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, BehaviorSubject } from 'rxjs';
import { Message } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { SocketMessage } from '../store/models/socketMessage.model';

@Injectable()
export class WebSocketService {

  private ws: WebSocket;
  connected$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  public connectToMessagesStream(): Observable<SocketMessage> {
    
    this.createConnection();

    return new Observable(observer => {
        const webSocket = this.ws;
        webSocket.onmessage = (msg: MessageEvent) => {
          console.log(msg);
          observer.next(JSON.parse(msg.data));
        };
        webSocket.onerror = (msg: MessageEvent) => {
          const message: SocketMessage = {
            type: "ws_status",
            message: "offline"
          }
          observer.next(message);
        };
        webSocket.onopen = (msg: MessageEvent) => {
          const message: SocketMessage = {
            type: "ws_status",
            message: "online"
          }
          observer.next(message);
        };
        return {
            unsubscribe(): void {
              this.ws.close();
            }
        };
    });
  } 
  
  private createConnection() {
    if (this.ws) {
        this.ws.close();
    }

    this.ws = new WebSocket(environment.chatServer);
  }

  public adminStatusRequest()
  {
    this.ws.send(`{"action": "adminStatus", "message": ""}`);
  }

  public connectToChat( name ) {
    
    if( this.ws.readyState == WebSocket.OPEN )
    {
      const message = {
        action: "handshake",
        message: name
      }
      this.ws.send(JSON.stringify(message));
    }
  }

  public sendChatMessage( id, text )
  {
    let message = {
      action: 'visitorchat',
      from: id,
      message: text
    }
    this.ws.send(JSON.stringify(message));
  }

}