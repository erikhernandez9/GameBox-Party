import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalUpdateUserComponent } from './proposal-update-user.component';

describe('ProposalUpdateUserComponent', () => {
  let component: ProposalUpdateUserComponent;
  let fixture: ComponentFixture<ProposalUpdateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalUpdateUserComponent]
    });
    fixture = TestBed.createComponent(ProposalUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
