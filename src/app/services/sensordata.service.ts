import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SensorData } from '../models/sensordata.model';
import { firstValueFrom, timestamp } from 'rxjs';
import { SensorDataCreate } from '../models/sensordata-create.model';
import { SensorDataUpdate } from '../models/sensordata-update.model';

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

  async getAllSensorData(sensorId: string): Promise<SensorData[]> {
    const sensorData$ = this.http.get<SensorData[]>(
      `http://localhost:3000/sensors/${sensorId}/data`
    );

    return await firstValueFrom(sensorData$);
  }

  async createSensorData(
    sensorId: string,
    sensordataCreate: SensorDataCreate
  ): Promise<SensorData> {
    const sensorData$ = this.http.post<SensorData>(
      `http://localhost:3000/sensors/${sensorId}/data`,
      sensordataCreate
    );

    return await firstValueFrom(sensorData$);
  }

  async updateSensorData(
    sensorId: string,
    sensordataUpdate: SensorDataUpdate
  ): Promise<SensorData> {
    const sensorData$ = this.http.patch<SensorData>(
      `http://localhost:3000/sensors/${sensorId}/data`,
      sensordataUpdate
    );

    return await firstValueFrom(sensorData$);
  }

  async delteSensorData(
    sensorId: string,
    sensordataId: string
  ): Promise<SensorData> {
    const sensorData$ = this.http.delete<SensorData>(
      `http://localhost:3000/sensors/${sensorId}/data/${sensordataId}`
    );

    return await firstValueFrom(sensorData$);
  }
}
