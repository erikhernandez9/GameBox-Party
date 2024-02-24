import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomHomeComponent } from './room-home.component';

describe('RoomHomeComponent', () => {
  let component: RoomHomeComponent;
  let fixture: ComponentFixture<RoomHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomHomeComponent]
    });
    fixture = TestBed.createComponent(RoomHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
