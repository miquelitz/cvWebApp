import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';

import { WebSocketService } from './services/websocket.service';
import { ChatComponent } from './components/chat/chat.component';
import { ChatLineComponent } from './components/chat/chat-line/chat-line.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { ChartModule } from 'primeng/chart';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';

import { ApiReducer } from './store/reducers/api.reducer';
import { ApiEffects } from './store/effects/api.effects';

import { SocketMessageReducer } from './store/reducers/socketMessage.reducer';
import { SocketMessageEffects } from './store/effects/socketMessage.effects';

import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChatComponent,
    ChatLineComponent,
    ContactFormComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      api: ApiReducer,
      socket: SocketMessageReducer
    }),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, logOnly: environment.production 
    }),
    EffectsModule.forRoot(
      [
        ApiEffects,
        SocketMessageEffects
      ]
    )
  ],
  providers: [
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
