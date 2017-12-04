import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  rForm: FormGroup;
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder
  ) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  ngOnInit() {
  }

  signup() {
    console.log('AAAAA');
  }

}
