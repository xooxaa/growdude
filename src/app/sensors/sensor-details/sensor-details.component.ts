import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { SensorsService } from '../../services/sensors.service';
import { SensordataService } from '../../services/sensordata.service';

@Component({
  selector: 'app-sensor-details',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './sensor-details.component.html',
  styleUrl: './sensor-details.component.css',
})
export class SensorDetailsComponent {
  sensorsService = inject(SensorsService);
  sensordataService = inject(SensordataService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  onDelete() {
    this.route.params.subscribe({
      next: async (value) => {
        const { sensorId } = value;
        try {
          // await this.sensorsService.deleteSensor(sensorId);
          // await this.router.navigate(['/dashboard']);
          this.sensordataService.createFakeDataForSensor(sensorId);
        } catch {
          console.log(sensorId);
        }
      },
    });
  }
}
