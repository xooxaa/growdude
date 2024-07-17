import { inject, Injectable } from '@angular/core';
import { Sensor } from '../models/sensor.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SensorCreate } from '../models/sensor-create.model';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  authService = inject(AuthService);
  http = inject(HttpClient);

  user = this.authService.user;

  async getSensors(): Promise<Sensor[]> {
    const sensor$ = this.http.get<Sensor[]>(`http://localhost:3000/sensors`);

    const allSensors = await firstValueFrom(sensor$);
    const userSensors = allSensors.filter(
      (sensor) => sensor.userId === this.user()?.id
    );

    return userSensors;
  }

  async createNewSensor(sensorCreate: SensorCreate): Promise<Sensor> {
    const sensor$ = this.http.post<Sensor>(
      `http://localhost:3000/sensors`,
      sensorCreate
    );

    return await firstValueFrom(sensor$);
  }

  async deleteSensor(sensorId: string) {
    const sensor$ = this.http.delete<Sensor>(
      `http://localhost:3000/sensors/${sensorId}`
    );

    return await firstValueFrom(sensor$);
  }

  getShortUnit(unitName: string) {
    return this.unitMap[unitName] || unitName;
  }

  private unitMap: { [key: string]: string } = {
    Celsius: '°C',
    Percentage: '%',
    PercentageRH: '%RH',
    Gram: 'g',
    Meter: 'm',
    Kilogram: 'kg',
    Second: 's',
    Minute: 'min',
    Hour: 'h',
    Pascal: 'Pa',
  };
}
