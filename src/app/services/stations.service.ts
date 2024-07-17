import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Station } from '../models/station.model';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { StationCreate } from '../models/station-create.model';
import { Sensor } from '../models/sensor.model';
import { StationUpdate } from '../models/station-update.model';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  authService = inject(AuthService);
  http = inject(HttpClient);

  user = this.authService.user;

  async getStations(): Promise<Station[]> {
    const stations$ = this.http.get<Station[]>(
      `http://localhost:3000/stations`
    );

    const allStations = await firstValueFrom(stations$);
    const userStations = allStations.filter(
      (station) => station.userId === this.user()?.id
    );

    return userStations;
  }

  async getStationById(stationId: string): Promise<Station> {
    const station$ = this.http.get<Station>(
      `http://localhost:3000/stations/${stationId}`
    );

    return await firstValueFrom(station$);
  }

  async getSensorsByStationId(stationId: string) {
    const sensors$ = this.http.get<Sensor[]>(
      `http://localhost:3000/stations/${stationId}/sensors`
    );

    return await firstValueFrom(sensors$);
  }

  async createNewStation(stationCreate: StationCreate): Promise<Station> {
    const station$ = this.http.post<Station>(
      `http://localhost:3000/stations`,
      stationCreate
    );

    return await firstValueFrom(station$);
  }

  async updateStation(
    stationId: string,
    stationUpdate: Partial<StationUpdate>
  ): Promise<Station> {
    const station$ = this.http.patch<Station>(
      `http://localhost:3000/stations/${stationId}`,
      stationUpdate
    );

    return await firstValueFrom(station$);
  }

  async deleteStation(stationId: string) {
    const station$ = this.http.delete<Station>(
      `http://localhost:3000/stations/${stationId}`
    );

    return await firstValueFrom(station$);
  }
}
