import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/utils/local-storage.service';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  code: string = '';
  name: string = '';
  user: any;
  footerMessage: string = ``;
  errorMessage: string = '';
  errorStatus: boolean = false;
  successMessage: string = '';
  success: boolean = false;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private roomService: RoomService,
    private router: Router,
    private errorResponseService: ErrorResponseService,
  ) { }

  ngOnInit() {
    this.user = this.localStorageService.getUser();
    if (this.user) {
      this.footerMessage = `Welcome ${this.user.username}!`;
    }
  }
  joinRoom() {
    let roomValue;
    if (this.isUser()) {
      roomValue = {
        id: this.code,
        name: this.user.username,
      };
    } else {
      roomValue = {
        id: this.code,
        name: this.name,
      };
    }
    this.roomService.connectRoom(roomValue.id, roomValue.name).subscribe({
      next: (res: any) => {
        setTimeout(() => {
          const roomId = res._id;
          const redirectUrl = `/room/waiting/${roomId}`;
          this.router.navigate([redirectUrl]);
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

  isUser(): boolean {
    return this.authService.isUser();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
