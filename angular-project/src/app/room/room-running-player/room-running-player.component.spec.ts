import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRunningPlayerComponent } from './room-running-player.component';

describe('RoomRunningPlayerComponent', () => {
  let component: RoomRunningPlayerComponent;
  let fixture: ComponentFixture<RoomRunningPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomRunningPlayerComponent]
    });
    fixture = TestBed.createComponent(RoomRunningPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
