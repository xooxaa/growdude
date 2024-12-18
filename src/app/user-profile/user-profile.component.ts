import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { openDeleteUserDialog } from './delete-user-dialog/delete-user-dialog.component';
import { openChangePasswordDialog } from './change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-user-profile',
  imports: [MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  authService = inject(AuthService);
  snackbar = inject(SnackbarService);
  router = inject(Router);
  dialog = inject(MatDialog);

  user = this.authService.user;

  async onChangePassword() {
    const newPassword = await openChangePasswordDialog(this.dialog);
    if (newPassword) {
      try {
        await this.authService.changePassword(newPassword);
        await this.router.navigate(['/']);
      } catch {
        this.snackbar.openSnackBar(
          'Das Passwort konnte nicht geändert werden. Bitte versuche es erneut.'
        );
      }
    }
  }

  async onDelete() {
    const deleteUser = await openDeleteUserDialog(this.dialog);
    if (deleteUser) {
      try {
        await this.authService.deleteUser();
        await this.router.navigate(['/']);
      } catch {
        this.snackbar.openSnackBar(
          'Der Benutzer konnte nicht gelöscht werden. Bitte versuche es erneut.'
        );
      }
    }
  }
}
