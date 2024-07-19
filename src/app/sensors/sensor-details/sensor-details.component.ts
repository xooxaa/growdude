import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SensorsService } from '../../services/sensors.service';
import { SensordataService } from '../../services/sensordata.service';
import { Sensor } from '../../models/sensor.model';
import { Station } from '../../models/station.model';

import { DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { StationsService } from '../../services/stations.service';
import { SensortypeService } from '../../services/sensortype.service';
import { SnackbarService } from '../../services/snackbar.service';
import { SensorUpdate } from '../../models/sensor-update.model';
import { openConfirmDialog } from '../../utils/confirm-dialog/confirm-dialog.component';
import { SensorData } from '../../models/sensordata.model';
import { ColorBackgroundComponent } from '../../utils/color-background/color-background.component';

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
    ColorBackgroundComponent,
    DatePipe,
  ],
  templateUrl: './sensor-details.component.html',
  styleUrl: './sensor-details.component.css',
})
export class SensorDetailsComponent {
  stationsService = inject(StationsService);
  sensorsService = inject(SensorsService);
  sensortypeService = inject(SensortypeService);
  sensordataService = inject(SensordataService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  snackbar = inject(SnackbarService);
  dialog = inject(MatDialog);

  sensor = signal<Sensor | null>(null);
  sensorTypes = this.sensortypeService.sensorTypes;
  stations = signal<Station[]>([]);
  sensorData = signal<SensorData[]>([]);
  minReading = signal<number>(0);
  maxReading = signal<number>(0);
  editingDetails = signal(false);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: [''],
    description: [''],
    type: [''],
    stationId: [''],
  });

  constructor() {
    this.getSensorAndStationsAndData();
  }

  async getSensorAndStationsAndData() {
    this.route.params.subscribe({
      next: async (value) => {
        const { sensorId } = value;

        try {
          this.sensor.set(await this.sensorsService.getSensorById(sensorId));
          this.stations.set(await this.stationsService.getStations());

          this.getSensordata(sensorId);

          this.form.patchValue({
            name: this.sensor()?.name,
            description: this.sensor()?.description,
            type: this.sensor()?.type,
            stationId: this.sensor()?.stationId,
          });
        } catch {
          this.snackbar.openSnackBar('Sensor nicht gefunden');
          this.router.navigate(['/dashboard']);
        }
      },
    });
  }

  async getSensordata(sensorId: string) {
    let sensorData = await this.sensordataService.getAllSensorData(sensorId);

    if (sensorData.length > 0) {
      sensorData = sensorData.sort((a, b) =>
        a.timestamp < b.timestamp ? 1 : 0
      );

      this.minReading.set(sensorData[0].value);
      this.maxReading.set(sensorData[0].value);
      for (let data of sensorData) {
        if (data.value < this.minReading()) {
          this.minReading.set(data.value);
        }
        if (data.value > this.maxReading()) {
          this.maxReading.set(data.value);
        }
      }
    }
    this.sensorData.set(sensorData);
  }

  async onSaveDetails() {
    let updateSensorDto: Partial<SensorUpdate> = {};
    const sensorId = this.sensor()!.id;

    if (this.form.controls.name.value !== this.sensor()?.name) {
      updateSensorDto = {
        ...updateSensorDto,
        name: this.form.controls.name.value!,
      };
    }

    if (this.form.controls.description.value !== this.sensor()?.description) {
      updateSensorDto = {
        ...updateSensorDto,
        description: this.form.controls.description.value!,
      };
    }

    if (this.form.controls.type.value !== this.sensor()?.type) {
      updateSensorDto = {
        ...updateSensorDto,
        type: this.form.controls.type.value!,
      };
    }

    if (this.form.controls.stationId.value !== this.sensor()?.stationId) {
      updateSensorDto = {
        ...updateSensorDto,
        stationId: this.form.controls.stationId.value!,
      };
    }

    if (Object.keys(updateSensorDto).length > 0) {
      try {
        this.sensor.set(
          await this.sensorsService.updateSensor(sensorId, updateSensorDto)
        );
      } catch {
        this.snackbar.openSnackBar(
          'Änderungen konnten nicht übernommen werden.'
        );
      }
    }
    this.editingDetails.set(false);
  }

  getStationName(stationId: string) {
    const station = this.stations().find((station) => station.id === stationId);
    return station?.name;
  }

  async onDeleteSensor() {
    const deleteSensor = await openConfirmDialog(
      this.dialog,
      'Sensor löschen',
      'Soll dieser Sensor wirklich gelöscht werden?'
    );

    if (deleteSensor) {
      try {
        await this.sensorsService.deleteSensor(this.sensor()!.id);
        this.snackbar.openSnackBar('Sensor wurde gelöscht');
        this.router.navigate(['/dashboard']);
      } catch {
        this.snackbar.openSnackBar('Sensor konnte nicht gelöscht werden');
      }
    }
  }

  async onAddSensorData() {}

  onEditSensorData(data: SensorData) {
    console.log(data);
  }

  async onDeleteSensorData(data: SensorData) {
    const deleteSensorData = await openConfirmDialog(
      this.dialog,
      'Sensor löschen',
      'Soll dieser Sensor wirklich gelöscht werden?'
    );

    if (deleteSensorData) {
      try {
        await this.sensordataService.delteSensorData(
          this.sensor()!.id,
          data.id
        );
        this.snackbar.openSnackBar('Datensatz wurde gelöscht');
        this.getSensordata(this.sensor()!.id);
      } catch {
        this.snackbar.openSnackBar('Sensor konnte nicht gelöscht werden');
      }
    }
  }
}
