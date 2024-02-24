import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomWaitingComponent } from './room-waiting.component';

describe('RoomWaitingComponent', () => {
  let component: RoomWaitingComponent;
  let fixture: ComponentFixture<RoomWaitingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomWaitingComponent]
    });
    fixture = TestBed.createComponent(RoomWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
