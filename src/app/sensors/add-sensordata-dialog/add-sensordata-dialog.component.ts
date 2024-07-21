import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-sensordata-dialog',
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
  templateUrl: './add-sensordata-dialog.component.html',
  styleUrl: './add-sensordata-dialog.component.css',
})
export class AddSensordataDialogComponent {
  dialogRef = inject(MatDialogRef);

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

    const now = new Date();
    this.form.patchValue({
      hours: now.getHours(),
      minutes: now.getMinutes(),
    });
  }

  onConfirm() {
    const { value, rawValue, date, hours, minutes } = this.form.value;
    const timestamp: Date = date!;
    timestamp.setHours(hours!);
    timestamp.setMinutes(minutes!);
    timestamp.setSeconds(0);

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

export async function openAddSensordataDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();
  config.disableClose = false;
  config.autoFocus = true;
  config.width = '360px';

  const close$ = dialog
    .open(AddSensordataDialogComponent, config)
    .afterClosed();
  return firstValueFrom(close$);
}
