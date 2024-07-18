import { Component } from '@angular/core';
import { DashboardStationsComponent } from '../dashboard/dashboard-stations/dashboard-stations.component';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [DashboardStationsComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.css',
})
export class StationsComponent {}
