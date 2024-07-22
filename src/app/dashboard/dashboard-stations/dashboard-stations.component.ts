import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { StationsService } from '../../services/stations.service';
import { Station } from '../../models/station.model';
import { TruncatePipe } from '../../utils/truncate.pipe';

@Component({
  selector: 'app-dashboard-stations',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, TruncatePipe],
  templateUrl: './dashboard-stations.component.html',
  styleUrl: './dashboard-stations.component.css',
})
export class DashboardStationsComponent {
  stationsService = inject(StationsService);

  stations = signal<Station[]>([]);

  constructor() {
    this.getStations();
  }

  async getStations() {
    const userStations = await this.stationsService.getStations();
    this.stations.set(userStations);
  }

  async deleteStation(stationId: string) {
    const deletedStation = await this.stationsService.deleteStation(stationId);
    this.getStations();
  }

  truncate(text: string, limit: number) {
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  }
}
