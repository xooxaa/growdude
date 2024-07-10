import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    RouterLink,
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
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['gardener@420.com'],
    password: ['fh4387h78f34/HRd32/(D32'],
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
    } catch {
      console.error('Bad Credentials');
    }
  }

  async onRegister() {
    await this.router.navigate(['/register']);
  }
}
