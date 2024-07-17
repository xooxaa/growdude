import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { SensorsService } from '../../services/sensors.service';
import { SensorCreate } from '../../models/sensor-create.model';
import { StationsService } from '../../services/stations.service';
import { Station } from '../../models/station.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-sensor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './new-sensor.component.html',
  styleUrl: './new-sensor.component.css',
})
export class NewSensorComponent {
  sensorsService = inject(SensorsService);
  stationsService = inject(StationsService);
  snackbar = inject(SnackbarService);
  router = inject(Router);

  stations = signal<Station[]>([]);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: [''],
    description: [''],
    type: ['temperature'],
    stationId: [null],
  });

  constructor() {
    this.loadStations();
  }

  async loadStations() {
    const stations$ = await this.stationsService.getStations();
    this.stations.set(stations$);
  }

  async onCreateNewSensor() {
    const { name, description, type, stationId } = this.form.value;

    if (!name) {
      this.snackbar.openSnackBar('Der Sensor muss einen Namen haben');
      return;
    }

    try {
      await this.sensorsService.createNewSensor({
        name,
        description,
        type,
        stationId,
      } as SensorCreate);
      await this.router.navigate(['/dashboard']);
    } catch {
      this.snackbar.openSnackBar('Der Sensor konnte nicht angelegt werden');
    }
  }
}
