import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  passwordConfirmation: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'passwordConfirmation': [null, Validators.required],
    }, {validator: this.checkIfMatchingPasswords('password', 'passwordConfirmation')});
  }

  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  ngOnInit() {
  }

  signup(userData) {
    this.http
      .post('/api/auth/signup', userData)
      .subscribe(data => console.log(data));
  }
}
