import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  #userSignal = signal<User | null>(null);
  user = this.#userSignal.asReadonly();
  isLoggedIn = computed(() => {
    return this.user() ? true : false;
  });

  constructor() {
    this.loadUserFromStorage();

    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    });
  }

  loadUserFromStorage() {
    const userToken = localStorage.getItem(USER_STORAGE_KEY);
    if (userToken) {
      this.#userSignal.set(JSON.parse(userToken));
    }
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const register$ = this.http.put<User>(`http://localhost:3000/auth/signup`, {
      name,
      email,
      password,
    });

    const user = await firstValueFrom(register$);
    this.#userSignal.set(user);

    return user;
  }

  async login(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`http://localhost:3000/auth/signin`, {
      email,
      password,
    });

    const user = await firstValueFrom(login$);
    this.#userSignal.set(user);

    return user;
  }

  async logout() {
    const logout$ = this.http.post<User>(
      `http://localhost:3000/auth/signout`,
      {}
    );

    const response = await firstValueFrom(logout$);

    this.#userSignal.set(null);
    await this.router.navigate(['']);
  }
}
