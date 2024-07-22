import { inject, Injectable, signal } from '@angular/core';
import { Sensor } from '../models/sensor.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SensorCreate } from '../models/sensor-create.model';
import { SensorUpdate } from '../models/sensor-update.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  apiURL = environment.apiURL;

  authService = inject(AuthService);
  http = inject(HttpClient);

  user = this.authService.user;

  async getSensors(): Promise<Sensor[]> {
    const sensor$ = this.http.get<Sensor[]>(`${this.apiURL}/sensors`);
    const allSensors = await firstValueFrom(sensor$);
    const userSensors = allSensors.filter(
      (sensor) => sensor.userId === this.user()?.id
    );

    return userSensors;
  }

  async getSensorById(sensorId: string): Promise<Sensor> {
    const sensor$ = this.http.get<Sensor>(`${this.apiURL}/sensors/${sensorId}`);

    return await firstValueFrom(sensor$);
  }

  async createNewSensor(sensorCreate: SensorCreate): Promise<Sensor> {
    const sensor$ = this.http.post<Sensor>(
      `${this.apiURL}/sensors`,
      sensorCreate
    );

    return await firstValueFrom(sensor$);
  }

  async updateSensor(
    sensorId: string,
    sensorUpdate: Partial<SensorUpdate>
  ): Promise<Sensor> {
    const sensor$ = this.http.patch<Sensor>(
      `${this.apiURL}/sensors/${sensorId}`,
      sensorUpdate
    );

    return await firstValueFrom(sensor$);
  }

  async deleteSensor(sensorId: string) {
    const sensor$ = this.http.delete<Sensor>(
      `${this.apiURL}/sensors/${sensorId}`
    );

    return await firstValueFrom(sensor$);
  }
}
