import { Component } from '@angular/core';

import { DashboardStationsComponent } from './dashboard-stations/dashboard-stations.component';
import { DashboardSensorsComponent } from './dashboard-sensors/dashboard-sensors.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardStationsComponent, DashboardSensorsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
