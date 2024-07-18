import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SensorsService } from '../../services/sensors.service';
import { SensordataService } from '../../services/sensordata.service';
import { Sensor } from '../../models/sensor.model';
import { Station } from '../../models/station.model';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { StationsService } from '../../services/stations.service';
import { SensortypeService } from '../../services/sensortype.service';

@Component({
  selector: 'app-sensor-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './sensor-details.component.html',
  styleUrl: './sensor-details.component.css',
})
export class SensorDetailsComponent {
  stationsService = inject(StationsService);
  sensorsService = inject(SensorsService);
  sensortypeService = inject(SensortypeService);
  sensordataService = inject(SensordataService);
  route = inject(ActivatedRoute);

  sensor = signal<Sensor | null>(null);
  sensorTypes = this.sensortypeService.sensorTypes;
  stations = signal<Station[]>([]);
  editingDetails = signal(false);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: [''],
    description: [''],
    type: [''],
    stationId: [''],
  });

  constructor() {
    this.getSensorAndStations();
  }

  async getSensorAndStations() {
    this.route.params.subscribe({
      next: async (value) => {
        const { sensorId } = value;

        this.sensor.set(await this.sensorsService.getSensorById(sensorId));
        this.stations.set(await this.stationsService.getStations());

        this.form.patchValue({
          name: this.sensor()?.name,
          description: this.sensor()?.description,
          type: this.sensor()?.type,
          stationId: this.sensor()?.stationId,
        });
      },
    });
  }

  async onSaveDetails() {}

  getStationName(stationId: string) {
    const station = this.stations().find((station) => station.id === stationId);
    return station?.name;
  }

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
