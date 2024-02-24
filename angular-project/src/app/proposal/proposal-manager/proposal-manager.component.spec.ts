import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalManagerComponent } from './proposal-manager.component';

describe('ProposalManagerComponent', () => {
  let component: ProposalManagerComponent;
  let fixture: ComponentFixture<ProposalManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalManagerComponent]
    });
    fixture = TestBed.createComponent(ProposalManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
