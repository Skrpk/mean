import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalStateService } from '../global-state.service';
import {
  FIELD_IS_REQUIRED,
  TOO_SHORT,
} from '../error-messages';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  
  rForm: FormGroup;
  login: string = '';
  password: string = '';
  errorList: {
    login: string;
    password: string;
  } = {
    login: '',
    password: '',
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private globalStateService: GlobalStateService,
  ) {
    this.rForm = fb.group({
      'login': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  validate() {
    const { errors: loginErrors } = this.rForm.get('login');
    const { errors: passwordErrors } = this.rForm.get('password');
    const { errorList } = this;

    if (loginErrors) {
      if (loginErrors.required) {
        errorList.login = FIELD_IS_REQUIRED;
      }
    }

    if (passwordErrors) {
      if (passwordErrors.required) {
        errorList.password = FIELD_IS_REQUIRED;
      }
      if (passwordErrors.minlength) {
        errorList.password = TOO_SHORT;
      }
    }
  }

  clearErrorMessagesList = (field) => {
    this.errorList[field] = [];
  }

  login = (userData) => {
    const self = this;

    if (!this.rForm.valid) {
      this.validate();
    } else {
      this.http
      .post('/api/auth/signin', userData)
      .subscribe(
        (data: { token: string }) => {
          self.router.navigateByUrl('/main-page');
          this.globalStateService.setUserData(data.token);
        },
        error =>
          self.errorList.login = error.error.signin,
      );
    }
  }
}
