import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from 'src/app/components/contact/contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public chat_container_state = "closed";
  public animateForm = false;
  public showContactForm = false;

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  openContactForm() {
    const dialogRef = this.dialog.open( ContactFormComponent );
    dialogRef.afterClosed().subscribe( result => {
      if( result ) {
         console.log(result);        
      } 
    });
  }

  public openChat() {
    const containerChat = document.getElementById("contact-expandable-container");
    containerChat.style.bottom = "0px";
    this.chat_container_state = "open";
  }

  public minimizeChat() {
    const containerChat = document.getElementById("contact-expandable-container");
    if(this.chat_container_state == "open") { 
      containerChat.style.bottom = "-270px";
      this.chat_container_state = "minimized";
    }else{
      containerChat.style.bottom = "0px";
      this.chat_container_state = "open";
    }
  }

  public animateFormContact()
  {
    let form = document.getElementById('contactForm');
    const clases = form.className;
    form.className = form.className + ' rotate1';
    setTimeout(()=> {
      this.showContactForm = true;
      form.className = clases + ' rotate2';
    },500);
  }

}
