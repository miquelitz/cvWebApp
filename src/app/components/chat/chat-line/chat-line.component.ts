import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-line',
  templateUrl: './chat-line.component.html',
  styleUrls: ['./chat-line.component.css']
})
export class ChatLineComponent implements OnInit {

  @Input() message: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
