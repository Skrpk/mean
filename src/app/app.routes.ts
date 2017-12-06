import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { SigninComponent } from './signin';
import { SignupComponent } from './signup';
import { ProfileComponent } from './profile';
//import { angularProfileCard } from '../../components/main-profile/index';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
];
