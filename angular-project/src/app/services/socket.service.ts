import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

    socket : any;

  private apiUrl: string = environment.apiUrl;

  constructor(
  ) { }

  connectSocket() {
    if(this.socket) {
      this.socket.disconnect();
    }
    this.socket = io('http://localhost:8080');
    return this.socket;
  }

  getSocket() {
    return this.socket;
  }
}