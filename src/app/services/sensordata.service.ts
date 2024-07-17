import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SensorData } from '../models/sensordata.model';
import { firstValueFrom, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensordataService {
  http = inject(HttpClient);

  async getLatestSensorData(sensorId: string): Promise<SensorData> {
    const sensorData$ = this.http.get<SensorData>(
      `http://localhost:3000/sensors/${sensorId}/data/latest`
    );

    return await firstValueFrom(sensorData$);
  }

  async createFakeDataForSensor(sensorId: string): Promise<SensorData> {
    const sensorData$ = this.http.post<SensorData>(
      `http://localhost:3000/sensors/${sensorId}/data`,
      {
        value: 23,
        timestamp: new Date(),
      }
    );

    return await firstValueFrom(sensorData$);
  }
}
