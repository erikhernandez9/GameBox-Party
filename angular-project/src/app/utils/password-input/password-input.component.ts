import { Component, Input, Output, EventEmitter} from '@angular/core';
import { PasswordVisibilityService } from '../../services/utils/password-visibility.service';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {

  @Input() placeholder = '';
  passwordVisible: boolean = false;

  @Output() passwordValueChange = new EventEmitter<string>();
  private inputValue: string = '';

  constructor (
    private passwordVisibilityService: PasswordVisibilityService
  ) { }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  getPasswordVisibility(): boolean {
    return this.passwordVisible || this.passwordVisibilityService.getPasswordVisibility();
  }

  onInput(event: Event): void {
    this.inputValue = (event.target as HTMLInputElement).value;
    this.passwordValueChange.emit(this.inputValue);
  }
}