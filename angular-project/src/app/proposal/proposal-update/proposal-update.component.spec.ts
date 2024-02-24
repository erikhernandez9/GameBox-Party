import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalUpdateComponent } from './proposal-update.component';

describe('ProposalUpdateComponent', () => {
  let component: ProposalUpdateComponent;
  let fixture: ComponentFixture<ProposalUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalUpdateComponent]
    });
    fixture = TestBed.createComponent(ProposalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
