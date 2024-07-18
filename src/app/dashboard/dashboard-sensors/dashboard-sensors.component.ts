import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SensorsService } from '../../services/sensors.service';
import { SensordataService } from '../../services/sensordata.service';
import { Sensor } from '../../models/sensor.model';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SensortypeService } from '../../services/sensortype.service';

import { TruncatePipe } from '../../utils/truncate.pipe';

@Component({
  selector: 'app-dashboard-sensors',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, TruncatePipe],
  templateUrl: './dashboard-sensors.component.html',
  styleUrl: './dashboard-sensors.component.css',
})
export class DashboardSensorsComponent {
  sensorsService = inject(SensorsService);
  sensortypeService = inject(SensortypeService);
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

  truncate(text: string, limit: number) {
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  }
}