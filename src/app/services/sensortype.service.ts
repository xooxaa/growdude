import { inject, Injectable, signal } from '@angular/core';
import { SensorType } from '../models/sensor-type.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensortypeService {
  http = inject(HttpClient);

  #sensorTypes = signal<SensorType[]>([]);
  sensorTypes = this.#sensorTypes.asReadonly();

  constructor() {
    this.getSensorTypes();
  }

  async getSensorTypes(): Promise<void> {
    const sensorTypes$ = this.http.get<SensorType[]>(
      `http://localhost:3000/sensors/types`
    );
    const sensorTypes = await firstValueFrom(sensorTypes$);

    this.#sensorTypes.set(sensorTypes);
  }

  getShortUnit(type: string): string | null {
    const sensorType = this.sensorTypes().find(
      (sensorType) => sensorType.type === type
    );

    return sensorType?.unitShort || null;
  }

  getLongUnit(type: string): string | null {
    const sensorType = this.sensorTypes().find(
      (sensorType) => sensorType.type === type
    );

    return sensorType?.unitLong || null;
  }
}
