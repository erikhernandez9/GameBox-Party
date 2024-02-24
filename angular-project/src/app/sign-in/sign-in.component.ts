import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/utils/local-storage.service';
import { ErrorResponseService } from '../services/utils/error-response.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    keepSigned: new FormControl(false)
  });

  passwordInputValue: string = '';

  errorMessage: string = '';
  errorStatus: boolean = false;
  success: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private errorResponseService: ErrorResponseService
  ) { }


  onSubmit(formData: any): void {
    const { username, password, keepSigned } = formData;

    this.authService.signIn({ username, password, keepSigned }).subscribe({
      next: (res) => {
        this.localStorageService.setToken(res.token);
        this.localStorageService.setUser(res.user);
        this.errorStatus = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1200);
      },
      error: (error) => {
        this.errorMessage = this.errorResponseService.getErrorResponse();
        if (this.errorMessage) {
          this.errorStatus = true;
          this.success = false;
        }
      }
    });
  }

  onPasswordInput(value: string): void {
    this.passwordInputValue = value;
    this.signInForm.patchValue({ password: value });
  }

  goBack(): void {
    this.location.back();
  }
}
