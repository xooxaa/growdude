import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { SensorType } from '../models/sensor-type.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SensortypeService {
  apiURL = environment.apiURL;

  http = inject(HttpClient);

  #sensorTypes = signal<SensorType[]>([]);
  sensorTypes = this.#sensorTypes.asReadonly();

  constructor() {
    this.getSensorTypes();
  }

  async getSensorTypes(): Promise<void> {
    const sensorTypes$ = this.http.get<SensorType[]>(
      `${this.apiURL}/sensors/types`
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

  getGermanName(type: string): string | null {
    const sensorType = this.sensorTypes().find(
      (sensorType) => sensorType.type === type
    );

    return sensorType ? this.germanNameList[sensorType.type] : null;
  }

  private germanNameList: { [key: string]: string } = {
    temperature: 'Temperatur',
    humidity: 'Luftfeuchte',
    moisture: 'Bodenfeuchte',
    pressure: 'Luftdruck',
    weight: 'Masse',
  };
}
