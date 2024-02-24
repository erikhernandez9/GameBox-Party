import { Component } from '@angular/core';
import { ThemeService } from '../services/utils/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public themeService: ThemeService
  ) { }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }
}
