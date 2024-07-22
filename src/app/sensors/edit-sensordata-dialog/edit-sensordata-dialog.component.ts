import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

import { SensorData } from '../../models/sensordata.model';

@Component({
  selector: 'app-edit-sensordata-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-sensordata-dialog.component.html',
  styleUrl: './edit-sensordata-dialog.component.css',
})
export class EditSensordataDialogComponent {
  dialogRef = inject(MatDialogRef);
  sensorData = inject(MAT_DIALOG_DATA);
  timestamp = new Date();

  hours: number[] = [];
  minutes: number[] = [];

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    value: [0],
    rawValue: [0],
    date: new Date(),
    hours: [0],
    minutes: [0],
  });

  constructor() {
    for (let hour = 0; hour < 24; hour++) {
      this.hours.push(hour);
    }
    for (let minute = 0; minute < 60; minute++) {
      this.minutes.push(minute);
    }

    this.timestamp = new Date(this.sensorData.timestamp);
    this.form.patchValue({
      value: this.sensorData.value,
      rawValue: this.sensorData.rawValue,
      date: this.timestamp,
      hours: this.timestamp.getHours(),
      minutes: this.timestamp.getMinutes(),
    });
  }

  onConfirm() {
    if (!this.form.dirty) {
      this.dialogRef.close(false);
      return;
    }
    const { value, rawValue, date, hours, minutes } = this.form.value;
    const timestamp: Date = date!;
    timestamp.setHours(hours!);
    timestamp.setMinutes(minutes!);
    timestamp.setSeconds(this.timestamp.getSeconds());
    timestamp.setMilliseconds(this.timestamp.getMilliseconds());

    this.dialogRef.close({
      value,
      rawValue,
      timestamp: timestamp.toISOString(),
    });
  }

  onClose() {
    this.dialogRef.close(false);
  }
}

export async function openEditSensordataDialog(
  dialog: MatDialog,
  data: SensorData
) {
  const config = new MatDialogConfig();
  config.disableClose = false;
  config.autoFocus = true;
  config.width = '360px';
  config.data = { ...data };

  const close$ = dialog
    .open(EditSensordataDialogComponent, config)
    .afterClosed();
  return firstValueFrom(close$);
}
