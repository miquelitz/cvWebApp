import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface FormContacto {
  name: string;
  email: string;
  telf: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  data: FormContacto;
  formContacto: FormGroup;
  formReady = false;

  constructor( private fb: FormBuilder, ) {  
    this.crearFormularioContacto();    
  }

  crearFormularioContacto() {
    this.formContacto = this.fb.group({
      email:        [ "", Validators.pattern ("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ],
      name:         [ "", Validators.required ],
      telf:         [ "", Validators.required ],
      message:      [ "", Validators.required ],
    });
    this.formReady = true;
  }

  onNoClick(): void {
    
  }

  ngOnInit(): void {
  }

  submitForm() 
  {
    
  }

}
