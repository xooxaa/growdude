import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SensorsService } from '../../services/sensors.service';
import { SensordataService } from '../../services/sensordata.service';
import { Sensor } from '../../models/sensor.model';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-sensors',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './dashboard-sensors.component.html',
  styleUrl: './dashboard-sensors.component.css',
})
export class DashboardSensorsComponent {
  sensorsService = inject(SensorsService);
  sensordataService = inject(SensordataService);

  sensors = signal<Sensor[]>([]);

  constructor() {
    this.getSensors();
  }

  async getSensors() {
    let userSensors = await this.sensorsService.getSensors();
    for (let sensor of userSensors) {
      const sensorData = await this.sensordataService.getLatestSensorData(
        sensor.id
      );

      if (sensorData) {
        userSensors = userSensors.map((mapSensor) =>
          mapSensor.id === sensor.id
            ? { ...mapSensor, latest: sensorData }
            : mapSensor
        );
      }
    }

    this.sensors.set(userSensors);
  }

  onRefresh() {
    this.getSensors();
  }

  async deleteSensor(sensorId: string) {
    const deletedStation = await this.sensorsService.deleteSensor(sensorId);
    this.getSensors();
  }

  truncate(text: string, limit: number) {
    if (text.length > limit) {
      return text.substr(0, limit) + '...';
    }
    return text;
  }

  getShortUnit(unit: string) {
    const unitShortName = this.sensorsService.getShortUnit(unit);
    return unitShortName;
  }
}
