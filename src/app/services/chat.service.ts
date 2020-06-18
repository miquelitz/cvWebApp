import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { WebSocketService } from './websocket.service';

import { Message } from '../interfaces/Interfaces';


@Injectable()
export class ChatService {
  
  public messages: Message[] = [];

  constructor( private wss: WebSocketService ) {
    // this.messages = <Subject<Message>>this.wsService
    //   .connect()
    //   .pipe(
    //     map((response: MessageEvent): Message => {
    //       const data = JSON.parse(response.data);
    //       return {
    //         from: data.from,
    //         type: data.type,
    //         message: data.message,
    //         newDate: data.newDate
    //       };
    //     }));

  }

  

  public connect ( ) 
  {
    return true;
  }
}
