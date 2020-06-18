import { Component, OnInit } from '@angular/core';

import { Message } from '../../interfaces/Interfaces';
import { ViewportScroller } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/models/app-state.model';
import { Cv } from '../../store/models/api.model';
import { LoadApiAction } from '../../store/actions/api.actions';
import { CreateWSSubscriptionAction } from '../../store/actions/socketMessage.actions';


declare var startScript: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  public messages: Message[] = [];

  public navigating = false;

  public skillsData;
  public skillsDataReady = false;

  public isOnDiv = false;
  cv: Cv;
  cv$: Observable<Cv>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;

  constructor( private viewportScroller: ViewportScroller, private store: Store<AppState> ) {}

  ngOnInit(): void {
     this.loading$ = this.store.select(store => store.api.loading);
     this.error$ = this.store.select(store => store.api.error);
 
     this.store.dispatch(new LoadApiAction());
     this.store.dispatch(new CreateWSSubscriptionAction());

     this.store.select(store => store.socket.changes_messages).subscribe( r => {
      this.store.dispatch(new LoadApiAction());
     });

     this.store.select(store => store.api.cv).subscribe( item => {
        this.cv = item; 
     })

     this.store.select(store => store.api.skills).subscribe( item => {
      this.skillsData = item; 
      startScript();
   })
  }

  public navigateSection(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
  }

  public calculate_age() { 
    if(this.cv) {
      let dob = new Date(this.cv.birthDate);
      var diff_ms = Date.now() - dob.getTime();
      var age_dt = new Date(diff_ms); 
    
      return Math.abs(age_dt.getUTCFullYear() - 1970) + " years,";
    }else{
      return '';
    }
  }

  onScroll(e){ 
    e.preventDefault();
    if(!this.navigating) {
      this.navigating = true;
      const activeAnchor = document.querySelector(`[active=true]`);
      const anchorIndex = activeAnchor.getAttribute('data-index');
      let anchor;
      if(e.deltaY<0) {
        if(parseInt(anchorIndex)>0) {
          anchor = document.querySelector(`[data-index='${ parseInt(anchorIndex) - 1 }']`);
          this.navigateSection(anchor.getAttribute('id'));
        }
      }else{
        const sections = document.querySelectorAll('section').length;
        if(parseInt(anchorIndex)<sections-1) {
          anchor = document.querySelector(`[data-index='${ parseInt(anchorIndex) + 1 }']`);
          this.navigateSection(anchor.getAttribute('id'));
        }
      }  
      
      setTimeout( () => {
        this.navigating = false;
      }, 500);
    }    
  }

}
