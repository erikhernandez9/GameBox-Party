import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  private authTokenKey: string = 'token';
  private userKey: string = 'user';
  private themeKey: string = 'theme';

  constructor() { }

  setToken(token: JSON): void {
    localStorage.setItem(this.authTokenKey, token.toString());
  }

  setUser(user: JSON): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  setTheme(theme: string): void {
    localStorage.setItem(this.themeKey, theme);
  }

  getToken(): string | null {
    if(!localStorage.getItem(this.authTokenKey)) return null;
    return localStorage.getItem(this.authTokenKey);
  }

  getUser(): any | null {
    if(!localStorage.getItem(this.userKey)) return null;
    return JSON.parse(localStorage.getItem(this.userKey) || '{}');
  }

  getTheme(): string | null {
    if(!localStorage.getItem(this.themeKey)) return null;
    return localStorage.getItem(this.themeKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

}
