import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { ErrorResponseService } from '../services/utils/error-response.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  passwordInputValue: string = '';
  repeatPasswordInputValue: string = '';
  matchPasswords: boolean = false;

  errorMessage: string = '';
  errorStatus: boolean = false;
  success: boolean = false;
  

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private errorResponseService: ErrorResponseService
  ) { }

  onSubmit(formData: any): void {
    this.authService.signUp(formData).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/sign-in']);
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
    this.onMatchPassword();
  }

  onRepeatPasswordInput(value: string): void {
    this.repeatPasswordInputValue = value;
    this.onMatchPassword();
  }

  onMatchPassword(): void {
    if(this.passwordInputValue != this.repeatPasswordInputValue) {
      this.errorMessage = 'Passwords do not match';
      this.errorStatus = true;
      this.signUpForm.controls['password'].setValue('');
      this.matchPasswords = false;
    } else {
      this.errorMessage = '';
      this.errorStatus = false;
      this.signUpForm.controls['password'].setValue(this.passwordInputValue);
      this.matchPasswords = true;
    }
  }


  goBack(): void {
    this.location.back();
  }
}
