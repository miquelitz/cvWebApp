import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Message } from '../../interfaces/Interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models/app-state.model';
import { WSChatConnectAction, WSChatDisconnectAction, SendChatMessageAction, WSRequestAdminStatusAction } from '../../store/actions/socketMessage.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  public connected = false;
  public name: string;
  private chat_id: string;
  public connectionError: string;
  public serverStatus = 'offline';
  public adminStatus = 'offline';

  public messages: Message[] = [];

  public messagesTest: any[] = [
    {
      from: "$system",
      message: "Welcome",
      newDate: "15:49"
    },
    {
      from: "Miguel",
      message: "Hola, buenos días, soy Miguel",
      newDate: "15:49"
    },
    {
      from: "$self",
      message: "Hola Miguel, encantado",
      newDate: "15:50"
    },
    {
      from: "$self",
      message: "Dime, en que puedo ayudarte?",
      newDate: "15:50"
    },
    {
      from: "Miguel",
      message: "Encantado igualmente. Me gustaría ponerme en contacto contigo para poder hablar mejor",
      newDate: "15:53"
    },
    {
      from: "Miguel",
      message: "Cual sería tu disponibilidad? Gracias",
      newDate: "15:53"
    }
  ];

  constructor( private store: Store<AppState> ) 
  {
    this.store.select(store => store.socket.status).subscribe( status => {
      this.serverStatus = status;
      console.log("Server is " + this.serverStatus);
       if(status != "offline")
       {
        this.store.dispatch(new WSRequestAdminStatusAction());
        this.store.select(store => store.socket.admin_status).subscribe( r => {
          this.adminStatus = r;
          console.log("Admin is " + this.adminStatus);
        });
       }else{

       }
    });
    /*
    this.serverStatus = wss.getStatus();
    wss.getadminStatusMessagesObserver().subscribe( msg => {
      this.adminStatus = msg.message;
      if(this.adminStatus == 'offline')
      {
        this.connectionError = "Sorry, Miguel is not available right now ):";
        
      }else{
        this.connectionError = null;
      }
      
    });
    */
  }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked()
  {
    //let chatContainer = document.getElementById('chat-container');
    //chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  public connect (text: string)
  {
    if(text && text!='') 
    {
      this.store.dispatch(new WSChatConnectAction( text ));
      this.store.select(store => store.socket.handshake_messages).subscribe( hs => {
        if(hs)
        {
          if(hs.message != 'error')
          {
            this.connectionError = null;
            this.connected = true;
            this.chat_id = hs.message;
            this.store.select(store => store.socket.chat_messages).subscribe( m => {
              this.messages = m;
            });
            let input = document.getElementById('inputMessage') as HTMLInputElement;
            input.value = ""; 
          }
          else
          {
            //Error handshaking
            this.connectionError = hs.message;
            this.connected = false;
            this.chat_id = "";
          }
        }
      });
    }    
  }

  public disconnect()
  {
    this.store.dispatch(new WSChatDisconnectAction());
  }

  public sendMessage(text)
  {
    if(text && text!='') 
    {
      const payload = {
        id: this.chat_id,
        text: text
      }
      this.store.dispatch(new SendChatMessageAction( payload ));
      let input = document.getElementById('inputMessage') as HTMLInputElement;
      input.value = "";      
    }    
  }
}
