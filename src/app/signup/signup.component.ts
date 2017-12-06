import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FIELD_IS_REQUIRED,
  TOO_SHORT,
  EMAIL_IS_INVALID,
  PASSWORD_DO_NOT_MATCH,
} from '../error-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  rForm: FormGroup;
  login: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  errorList: {
    login: string[],
    email: string[],
    password: string[],
    passwordConfirmation: string[],
  } = {
    login: [],
    email: [],
    password: [],
    passwordConfirmation: [],
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.rForm = fb.group({
      'login': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'passwordConfirmation': [null, Validators.required],
    }, {validator: this.checkIfMatchingPasswords('password', 'passwordConfirmation')});
  }

  ngOnInit() {
  }
  
  validate() {
    const { errors: loginErrors } = this.rForm.get('login');
    const { errors: emailErrors } = this.rForm.get('email');
    const { errors: passwordErrors } = this.rForm.get('password');
    const { errors: passwordConfirmationErrors } = this.rForm.get('passwordConfirmation');
    const { errorList } = this;

    if (loginErrors) {
      if (loginErrors.required) {
        errorList.login.push(FIELD_IS_REQUIRED);
      }
      if (loginErrors.minlength) {
        errorList.login.push(TOO_SHORT);
      }
    }

    if (emailErrors) {
      if (emailErrors.email) {
        errorList.email.push(EMAIL_IS_INVALID);
      }
    }

    if (passwordErrors) {
      if (passwordErrors.required) {
        errorList.password.push(FIELD_IS_REQUIRED);
      }
      if (passwordErrors.minlength) {
        errorList.password.push(TOO_SHORT);
      }
    }

    if (passwordConfirmationErrors) {
      if (passwordConfirmationErrors.notEquivalent) {
        errorList.passwordConfirmation.push(PASSWORD_DO_NOT_MATCH);
      }
    }
  }

  clearErrorMessagesList = (field) => {
    this.errorList[field] = [];
  }

  signup(userData) {
  if (!this.rForm.valid) {
    this.validate();
  } else {
    this.http
    .post('/api/auth/signup', userData)
    .subscribe((data) => {
      this.router.navigateByUrl('/signin');
    });
  }
  }
  
  checkUserExists(e) {
    const field = e.target.id;
    const val = e.target.value;

    this.http
    .post('api/user/check-user-exists', { field, val })
    .subscribe(data => {
      debugger
    });
  }

  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
