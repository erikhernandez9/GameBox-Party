import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = this.localStorageService.getTheme() || 'dark';

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.localStorageService.setTheme(this.currentTheme);
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  setCurrentTheme(theme: string) {
    this.currentTheme = theme;
    this.localStorageService.setTheme(this.currentTheme);
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
  }
}
