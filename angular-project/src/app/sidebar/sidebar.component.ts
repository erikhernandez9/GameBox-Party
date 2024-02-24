import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/utils/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  user = this.localStorageService.getUser();

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  isUser(): boolean {
    return this.authService.isUser();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
