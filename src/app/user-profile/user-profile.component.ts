import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { openDeleteUserDialog } from './delete-dialog/delete-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { openChangePasswordDialog } from './change-password-dialog/change-password-dialog.component';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
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
