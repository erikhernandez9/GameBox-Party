import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordVisibilityService {
  private passwordVisible: boolean = false;

  toggleVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  getPasswordVisibility() {
    return this.passwordVisible;
  }
}