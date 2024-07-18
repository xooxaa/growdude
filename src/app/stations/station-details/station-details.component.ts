import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { StationsService } from '../../services/stations.service';
import { Station } from '../../models/station.model';
import { StationUpdate } from '../../models/station-update.model';
import { Sensor } from '../../models/sensor.model';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-station-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './station-details.component.html',
  styleUrl: './station-details.component.css',
})
export class StationDetailsComponent {
  stationsService = inject(StationsService);
  snackbar = inject(SnackbarService);
  route = inject(ActivatedRoute);

  station = signal<Station | null>(null);
  sensors = signal<Sensor[]>([]);
  editingDetails = signal(false);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: [''],
    description: [''],
    longitude: [0],
    latitude: [0],
  });

  constructor() {
    this.getStationAndSensors();
  }

  async getStationAndSensors() {
    this.route.params.subscribe({
      next: async (value) => {
        const { stationId } = value;

        this.station.set(await this.stationsService.getStationById(stationId));
        this.sensors.set(
          await this.stationsService.getSensorsByStationId(stationId)
        );

        this.form.patchValue({
          name: this.station()?.name,
          description: this.station()?.description,
          latitude: this.station()?.latitude,
          longitude: this.station()?.longitude,
        });
      },
    });
  }

  async onSaveDetails() {
    let updateStationDto: Partial<StationUpdate> = {};
    const stationId = this.station()!.id;

    if (this.form.controls.name.value !== this.station()?.name) {
      updateStationDto = {
        ...updateStationDto,
        name: this.form.controls.name.value!,
      };
    }

    if (this.form.controls.description.value !== this.station()?.description) {
      updateStationDto = {
        ...updateStationDto,
        description: this.form.controls.description.value!,
      };
    }

    if (
      this.form.controls.latitude.value !== this.station()?.latitude ||
      this.form.controls.longitude.value !== this.station()?.longitude
    ) {
      updateStationDto = {
        ...updateStationDto,
        latitude: this.form.controls.latitude.value!,
        longitude: this.form.controls.longitude.value!,
      };
    }

    if (Object.keys(updateStationDto).length > 0) {
      try {
        this.station.set(
          await this.stationsService.updateStation(stationId, updateStationDto)
        );
      } catch {
        this.snackbar.openSnackBar(
          'Änderungen konnten nicht übernommen werden.'
        );
      }
    }
    this.editingDetails.set(false);
  }
}
