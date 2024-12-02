import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-delete-dialog',
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
    ],
    templateUrl: './delete-user-dialog.component.html',
    styleUrl: './delete-user-dialog.component.css'
})
export class DeleteUserDialogComponent {
  authService = inject(AuthService);
  dialogRef = inject(MatDialogRef);

  user = this.authService.user;

  onConfirm() {
    this.dialogRef.close(true);
  }

  onClose() {
    this.dialogRef.close(false);
  }
}

export async function openDeleteUserDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();
  config.disableClose = false;
  config.autoFocus = true;
  config.width = '300px';

  const close$ = dialog.open(DeleteUserDialogComponent, config).afterClosed();
  return firstValueFrom(close$);
}
