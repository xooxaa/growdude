import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  #user = signal<User | null>(null);
  user = this.#user.asReadonly();
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
      this.#user.set(JSON.parse(userToken));
    }
  }

  async registerNewUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const register$ = this.http.put<User>(`http://localhost:3000/auth/signup`, {
      name,
      email,
      password,
    });

    const user = await firstValueFrom(register$);
    this.#user.set(user);

    return user;
  }

  async loginExistingUser(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`http://localhost:3000/auth/signin`, {
      email,
      password,
    });

    const user = await firstValueFrom(login$);
    this.#user.set(user);

    return user;
  }

  async logoutCurrentUser() {
    const logout$ = this.http.post<User>(
      `http://localhost:3000/auth/signout`,
      {}
    );

    const response = await firstValueFrom(logout$);
    this.#user.set(null);
  }

  async changePassword(newPassword: string) {
    const userId = this.#user()?.id;
    const updateUserDto = {
      password: newPassword,
    };

    const updateUser$ = this.http.patch<User>(
      `http://localhost:3000/auth/${userId}`,
      updateUserDto
    );

    const respone = await firstValueFrom(updateUser$);

    await this.logoutCurrentUser();
  }

  async deleteUser() {
    const userId = this.#user()?.id;
    const remove$ = this.http.delete<User>(
      `http://localhost:3000/auth/${userId}`
    );

    const response = await firstValueFrom(remove$);

    this.#user.set(null);
  }
}
