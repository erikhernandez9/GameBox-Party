import { Component } from '@angular/core';
import { ThemeService } from './services/utils/theme.service';
import { LocalStorageService } from './services/utils/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-project';

  constructor(
    private themeService: ThemeService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.themeService.setCurrentTheme(
      this.localStorageService.getTheme() || 'dark'
    );
  }
}
