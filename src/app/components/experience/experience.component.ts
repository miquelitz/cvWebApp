import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() experienceData: any;

  public experience_item_pos = 0;

  constructor() { }

  ngOnInit(): void {
    
  }
  
  public navExp(pos) {
    if( pos>=0 && pos< this.experienceData.length ){
      this.experience_item_pos = pos;
      let itemContainer = document.getElementsByClassName("experiences-container-item") as HTMLCollectionOf<HTMLElement>;
      let iw = itemContainer[0].clientWidth; 
      console.log(iw);   
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const items = document.querySelectorAll('.experiences-container-item');
      let transformLeft = (vw/2 - iw/2) - ( iw + vw/2 )*pos - vw/2;
      items.forEach( (item: HTMLElement) => {
        item.style.transform = `translateX(${transformLeft}px)`;
      })
    }
  }

}
