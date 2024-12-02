import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SensortypeService } from '../../services/sensortype.service';
import { Sensor } from '../../models/sensor.model';
import { TruncatePipe } from '../../utils/truncate.pipe';

@Component({
    selector: 'app-sensor-card',
    imports: [RouterLink, TruncatePipe],
    templateUrl: './sensor-card.component.html',
    styleUrl: './sensor-card.component.css'
})
export class SensorCardComponent {
  sensortypeService = inject(SensortypeService);

  sensor = input.required<Sensor>();
}
