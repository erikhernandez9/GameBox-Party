import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFinishedComponent } from './room-finished.component';

describe('RoomFinishedComponent', () => {
  let component: RoomFinishedComponent;
  let fixture: ComponentFixture<RoomFinishedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomFinishedComponent]
    });
    fixture = TestBed.createComponent(RoomFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
