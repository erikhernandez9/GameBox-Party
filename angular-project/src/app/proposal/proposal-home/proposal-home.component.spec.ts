import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalHomeComponent } from './proposal-home.component';

describe('ProposalHomeComponent', () => {
  let component: ProposalHomeComponent;
  let fixture: ComponentFixture<ProposalHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalHomeComponent]
    });
    fixture = TestBed.createComponent(ProposalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
