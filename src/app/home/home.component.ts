import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from '../global-state.service';

@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  authorized: boolean;

  constructor(
    private globalStateService: GlobalStateService,
  ) {}

    ngOnInit() {
      this.globalStateService.getUserData()
        .subscribe(user => {
          this.authorized = user.email ? true : false;
        });

      let token = localStorage.getItem('auth-token');
      if (token) {
        this.globalStateService.setUserData(token);
        this.authorized = true;
      }
    }

    logOut = () => {
      this.globalStateService.setUserData('');
      this.authorized = false;
      localStorage.removeItem('auth-token');
    }
}
