import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(): void {
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout(): void {
    localStorage.setItem('isAuthenticated', 'false');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
