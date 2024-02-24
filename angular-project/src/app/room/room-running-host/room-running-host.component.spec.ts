import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRunningHostComponent } from './room-running-host.component';

describe('RoomRunningHostComponent', () => {
  let component: RoomRunningHostComponent;
  let fixture: ComponentFixture<RoomRunningHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomRunningHostComponent]
    });
    fixture = TestBed.createComponent(RoomRunningHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
