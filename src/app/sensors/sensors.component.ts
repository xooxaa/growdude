import { Component } from '@angular/core';

import { DashboardSensorsComponent } from '../dashboard/dashboard-sensors/dashboard-sensors.component';

@Component({
  selector: 'app-sensors',
  imports: [DashboardSensorsComponent],
  templateUrl: './sensors.component.html',
  styleUrl: './sensors.component.css',
})
export class SensorsComponent {}
