import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  rForm: FormGroup;
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  ngOnInit() {
  }

  login(userData) {
    this.http
    .post('/api/auth/signin', userData)
    .subscribe(data => console.log(data));
  }

}
