import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/utils/local-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  user = this.localStorageService.getUser();
  @Input() footerMessage: string = '';

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

}
