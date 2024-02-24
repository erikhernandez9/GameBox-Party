import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {

  updateUserForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    role: new FormControl(<unknown>[], Validators.required),
  });

  footerMessage = 'Account Manager';
  passwordVisible: boolean = false;

  errorMessage: string = '';
  errorStatus: boolean = false;
  successMessage: string = '';
  success: boolean = false;
  deleted: boolean = false;
  admin: boolean = false;

  constructor(
    private userService: UserService,
    private errorResponseService: ErrorResponseService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.updateUserForm.setValue({
          username: res.username,
          email: res.email,
          role: res.permissions
        });
        if (res.permissions.includes('admin')) {
          this.admin = true;
        }
      },
      error: (error) => this.location.back()
    });
  }

  onAdminChange(event: any) {
    if (event.target.checked) {
      this.updateUserForm.controls.role.setValue(['user', 'admin']);
    } else {
      this.updateUserForm.controls.role.setValue(['user']);
    }
  }

  updateUser(formData: any): void {
    console.log(this.updateUserForm.value);
    const { username, email, role } = formData;
    const id = this.route.snapshot.paramMap.get('id')!;

    this.userService.updateUserById(id, { username, email, role }).subscribe({
      next: (res) => {
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

  deleteUser(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.userService.deleteUserById(id).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        this.deleted = true;
        this.successMessage = 'Account deleted successfully!';
        setTimeout(() => {
          this.location.back();
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
}
