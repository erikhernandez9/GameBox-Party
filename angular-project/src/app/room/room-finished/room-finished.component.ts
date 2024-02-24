import { Component } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-room-finished',
  templateUrl: './room-finished.component.html',
  styleUrls: ['./room-finished.component.scss']
})

export class RoomFinishedComponent {
  apiUrl: string = environment.apiUrl;
  votes : any[] = [];

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id')!;
    this.roomService.getRoomVotes(roomId).subscribe({
      next: (res) => {
        this.votes = res;
        console.log(this.votes);
      },
      error: (error) => console.log(error)
    });
  }

  goHome() {
    let redirectUrl = `/home`;
    this.router.navigate([redirectUrl]);
  }
}
