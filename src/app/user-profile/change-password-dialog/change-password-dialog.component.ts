import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-password-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  dialogRef = inject(MatDialogRef);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    password: [''],
  });

  onConfirm() {
    this.dialogRef.close(this.form.value.password);
  }

  onClose() {
    this.dialogRef.close(false);
  }
}

export async function openChangePasswordDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();
  config.disableClose = false;
  config.autoFocus = true;
  config.width = '300px';

  const close$ = dialog
    .open(ChangePasswordDialogComponent, config)
    .afterClosed();
  return firstValueFrom(close$);
}
