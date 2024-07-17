import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StationsComponent } from './stations/stations.component';
import { NewStationComponent } from './stations/new-station/new-station.component';
import { StationDetailsComponent } from './stations/station-details/station-details.component';
import { SensorsComponent } from './sensors/sensors.component';
import { NewSensorComponent } from './sensors/new-sensor/new-sensor.component';
import { SensorDetailsComponent } from './sensors/sensor-details/sensor-details.component';

export const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  {
    path: 'user',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stations',
    component: StationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stations/new',
    component: NewStationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stations/:stationId',
    component: StationDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sensors',
    component: SensorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sensors/new',
    component: NewSensorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sensors/:sensorId',
    component: SensorDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
