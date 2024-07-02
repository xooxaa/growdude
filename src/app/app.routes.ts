import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
];
