import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth.service';
import { Station } from '../models/station.model';
import { StationCreate } from '../models/station-create.model';
import { Sensor } from '../models/sensor.model';
import { StationUpdate } from '../models/station-update.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  apiURL = environment.apiURL;

  authService = inject(AuthService);
  http = inject(HttpClient);

  user = this.authService.user;

  async getStations(): Promise<Station[]> {
    const stations$ = this.http.get<Station[]>(`${this.apiURL}/stations`);

    const allStations = await firstValueFrom(stations$);
    const userStations = allStations.filter(
      (station) => station.userId === this.user()?.id
    );

    return userStations;
  }

  async getStationById(stationId: string): Promise<Station> {
    const station$ = this.http.get<Station>(
      `${this.apiURL}/stations/${stationId}`
    );

    return await firstValueFrom(station$);
  }

  async getSensorsByStationId(stationId: string) {
    const sensors$ = this.http.get<Sensor[]>(
      `${this.apiURL}/stations/${stationId}/sensors`
    );

    return await firstValueFrom(sensors$);
  }

  async createNewStation(stationCreate: StationCreate): Promise<Station> {
    const station$ = this.http.post<Station>(
      `${this.apiURL}/stations`,
      stationCreate
    );

    return await firstValueFrom(station$);
  }

  async updateStation(
    stationId: string,
    stationUpdate: Partial<StationUpdate>
  ): Promise<Station> {
    const station$ = this.http.patch<Station>(
      `${this.apiURL}/stations/${stationId}`,
      stationUpdate
    );

    return await firstValueFrom(station$);
  }

  async deleteStation(stationId: string) {
    const station$ = this.http.delete<Station>(
      `${this.apiURL}/stations/${stationId}`
    );

    return await firstValueFrom(station$);
  }
}
