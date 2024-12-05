import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  registerForm = this.formBuilder.group({
    name: [''],
    email: [''],
    password: [''],
  });

  async onRegister() {
    try {
      const { name, email, password } = this.registerForm.value;

      if (!name || !email || !password) {
        return;
      }

      await this.authService.registerNewUser(name, email, password);
      await this.router.navigate(['/dashboard']);
    } catch {
      //TODO Snackbar message according to error
      console.error('Unable to register');
    }
  }

  async onLogin() {
    await this.router.navigate(['/']);
  }
}
