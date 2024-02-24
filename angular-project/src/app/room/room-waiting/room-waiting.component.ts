import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { ChangeDetectorRef } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/utils/local-storage.service';

@Component({
  selector: 'app-room-waiting',
  templateUrl: './room-waiting.component.html',
  styleUrls: ['./room-waiting.component.scss']
})

export class RoomWaitingComponent {
  
  room: any = {};
  footerMessage = 'Waiting for players to join...';
  socket: any;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.socket = socketService.connectSocket();

    this.socket.on('connect', () => {
      this.socket.on('message', (message : any) => {
        console.log(message);
      });
      this.socket.on('newParticipant', (message: any) => {
        this.room.participants = message.participants;
        this.cdr.detectChanges();
      });
      this.socket.on('startGame', (message: any) => {
        const roomId = this.route.snapshot.paramMap.get('id')!;
        let redirectUrl = `/room/running-player/${roomId}`;
        if (this.isHost()) {
          redirectUrl = `/room/running-host/${roomId}`;
        }
        this.router.navigate([redirectUrl]);
      });
    });
   }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id')!;
    this.roomService.getRoomById(roomId).subscribe({
      next: (res) => {
        this.room = res;
        this.socket.emit('join-room', this.room.roomId);
        if(this.room.state === 'running' || this.room.state === 'finished') {
          this.router.navigate(['/room']);
        }
      },
      error: (error) => console.log(error)
    });
  }

  startRoom() {
    const roomId = this.route.snapshot.paramMap.get('id')!;
    this.roomService.startRoom(roomId).subscribe((res: any) => {
        console.log(res);
    });
  }

  isHost() {
    const user = this.localStorageService.getUser();
    return user && this.room.hostedByName === user.username;
  }
}
