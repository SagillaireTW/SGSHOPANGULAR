import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { computed, inject, Injectable, signal } from '@angular/core';

import { AuthResponse } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) return 'authenticated';

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap((res) => {
        this._user.set(res.user);
        this._token.set(res.token);
        this._authStatus.set('authenticated');

        localStorage.setItem('token', res.token);
      })
    )
  }
}
