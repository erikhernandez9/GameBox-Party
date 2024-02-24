import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-room-running-host',
  templateUrl: './room-running-host.component.html',
  styleUrls: ['./room-running-host.component.scss'],
})
export class RoomRunningHostComponent {
  apiUrl: string = environment.apiUrl;
  socket: any;
  activity = {
    _id: "",
    name: "",
    description: "",
    image: "",
  };
  participants = 0
  countVotes = 0;
  isFinished = false;

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.socket = socketService.getSocket();
    
    this.socket.on('message', (message: any) => {
      console.log(message);
    });
    this.socket.on('startGameHost', (message: any) => {
      this.participants = message.participants.length;
    });
    this.socket.on('nextActivityData', (message: any) => {
      this.countVotes = 0;
      this.activity = message;
    });
    this.socket.on('newVote', (message: any) => {
      if (this.activity._id === message.activityId) {
        this.countVotes++;
      }
    });
    this.socket.on('endRoom', (message: any) => {
      console.log(message);
      this.isFinished = true;
      this.socket.disconnect();
    });
  }

  showStats() {
    const roomId = this.route.snapshot.paramMap.get('id')!;
    let redirectUrl = `/room/finished/${roomId}`;
    this.router.navigate([redirectUrl]);
    this.isFinished = true;
  }
}
