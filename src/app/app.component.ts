import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn = this.authService.isLoggedIn;
  user = this.authService.user;

  async onLogout() {
    try {
      await this.authService.logoutCurrentUser();
      await this.router.navigate(['/']);
    } catch {
      console.error('Unable to Logout');
    }
  }
}
