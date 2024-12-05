import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-user-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  authService = inject(AuthService);
  snackbar = inject(SnackbarService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  isLoggedIn = this.authService.isLoggedIn;

  constructor() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async onLogin() {
    try {
      const { email, password } = this.loginForm.value;

      if (!email || !password) {
        return;
      }

      await this.authService.loginExistingUser(email, password);
      await this.router.navigate(['/dashboard']);

      this.snackbar.openSnackBar('Willkommen zurück :)');
    } catch {
      console.error('Bad Credentials');
    }
  }

  async onRegister() {
    await this.router.navigate(['/register']);
  }
}
