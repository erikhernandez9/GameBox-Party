import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-running-player',
  templateUrl: './room-running-player.component.html',
  styleUrls: ['./room-running-player.component.scss'],
})
export class RoomRunningPlayerComponent {
  socket: any;
  room: any = {
    participants: []
  };

  activity = {
    _id: "",
    name: "",
  };
  vote = true;
  finished = false;

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
  ) {
    this.socket = socketService.getSocket();

    this.socket.on('message', (message: any) => {
      console.log(message);
    });
    this.socket.on('nextActivity', (message: any) => {
      this.vote = false;
      this.activity = message;
    });
    this.socket.on('endRoom', (message: any) => {
      console.log(message);
      this.vote = true;
      this.finished = true;
      this.socket.disconnect();
    });
  }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id')!;
    this.roomService.getRoomById(roomId).subscribe({
      next: (res) => {
        this.room = res;
        this.socket.emit('join-room', this.room.roomId);
        if (this.room.state === 'waiting' || this.room.state === 'finished') {
          this.router.navigate(['/room']);
        }
      },
      error: (error) => console.log(error)
    });
  }

  voteRoom(vote: number) {
    this.roomService.voteRoom(this.route.snapshot.paramMap.get('id')!, this.activity._id, vote).subscribe({
      next: (res) => {
        this.vote = true;
      },
      error: (error) => console.log(error)
    });
  }

  goHome() {
    let redirectUrl = `/home`;
    this.router.navigate([redirectUrl]);
  }
}
