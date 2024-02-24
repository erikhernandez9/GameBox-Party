import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { LocalStorageService } from 'src/app/services/utils/local-storage.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent {
  footerMessage = 'User Manager';
  users: any[] = [];
  filteredUsers: any[] = [];
  filter: string = '';

  errorMessage: string = '';
  myUsername: string = this.localStorageService.getUser().username;

  constructor(
    private userService: UserService,
    private errorResponseService: ErrorResponseService,
    private localStorageService: LocalStorageService
  ) { }


  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.filteredUsers = res;
      },
      error: (error) => this.errorMessage = this.errorResponseService.getErrorResponse()
    });
  }

  updateFilteredUsers() {
    this.filteredUsers = this.users.filter(user => {
      return user.username.toLowerCase().includes(this.filter.toLowerCase());
    });
  }
}

