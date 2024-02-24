import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { LocalStorageService } from '../services/utils/local-storage.service';
import { PasswordVisibilityService } from '../services/utils/password-visibility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent {

  accountManagerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  footerMessage = 'Account Manager';
  passwordVisible: boolean = false;
  inputValue: string = '';

  errorMessage: string = '';
  errorStatus: boolean = false;
  successMessage: string = '';
  success: boolean = false;
  deleted: boolean = false;

  constructor(
    private accountService: AccountService,
    private errorResponseService: ErrorResponseService,
    private localStorageService: LocalStorageService,
    private passwordVisibilityService: PasswordVisibilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountManagerForm.setValue({
      username: this.localStorageService.getUser().username,
      email: this.localStorageService.getUser().email,
      password: ''
    });
  }

  updateAccount(formData: any): void {
    const { username, email, password } = formData;
    const id = this.localStorageService.getUser().id;

    this.accountService.updateUserById(id, { username, email, password }).subscribe({
      next: (res) => {
        this.localStorageService.setUser(res);
        this.errorStatus = false;
        this.success = true;
        this.successMessage = 'Account updated successfully!';
        setTimeout(() => {
          this.success = false;
        }, 2500);
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

  deleteAccount(formData: any): void {
    const { password } = formData;
    const id = this.localStorageService.getUser().id;

    this.accountService.deleteUserById(id, password).subscribe({
      next: (res) => {
        this.localStorageService.removeUser();
        this.localStorageService.removeToken();
        this.errorStatus = false;
        this.success = true;
        this.deleted = true;
        this.successMessage = 'Account deleted successfully!';
        setTimeout(() => {
          this.router.navigate(['/']);
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

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  getPasswordVisibility(): boolean {
    return this.passwordVisible || this.passwordVisibilityService.getPasswordVisibility();
  }

  onInput(event: Event): void {
    this.inputValue = (event.target as HTMLInputElement).value;
  }
}
