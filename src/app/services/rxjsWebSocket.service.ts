import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { Message } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { filter, map, switchMap, retryWhen, delay } from 'rxjs/operators';

@Injectable()
export class WebSocketService {

	connection$: WebSocketSubject<any>;
	RETRY_SECONDS = 10; 
	
	connect(): Observable<any> {
	  return of('http://localhost:3000').pipe(
		filter(apiUrl => !!apiUrl),
		// https becomes wws, http becomes ws
		map(apiUrl => apiUrl.replace(/^http/, 'ws') + '/stream'),
		switchMap(wsUrl => {
		  if (this.connection$) {
			return this.connection$;
		  } else {
			this.connection$ = webSocket(wsUrl);
			return this.connection$;
		  }
		}),
		retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
	  );
	}
}