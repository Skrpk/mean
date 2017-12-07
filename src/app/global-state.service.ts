import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalStateService {
  private userData = new Subject<any>();

  constructor() { }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }

  setUserData = (data) => {
    localStorage.setItem('auth-token', data);
    this.userData.next(data && jwtDecode(data));
  }
}
