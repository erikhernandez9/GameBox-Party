import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityIndexComponent } from './activity-index.component';

describe('ActivityIndexComponent', () => {
  let component: ActivityIndexComponent;
  let fixture: ComponentFixture<ActivityIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityIndexComponent]
    });
    fixture = TestBed.createComponent(ActivityIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
